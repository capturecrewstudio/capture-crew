import { useEffect, useRef } from 'react';

type FluidProps = {
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  color?: string; // hex color e.g. "#58A4FF"
};

export function FluidCursor({
  densityDissipation = 3.5,
  velocityDissipation = 2.0,
  pressure = 0.8,
  curl = 20,
  splatRadius = 0.0018,
  splatForce = 1800,
  color = '#20BDFF'
}: FluidProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is enabled
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return; // Skip WebGL completely
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL is not supported in this browser.');
      return;
    }

    // Convert hex color to RGB array [0,1]
    const hexToRgb = (hex: string) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
      return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255
          ]
        : [0.1, 0.4, 0.9];
    };

    const targetColor = hexToRgb(color);

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Shader sources
    const baseVertexShader = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const splatShaderSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform sampler2D u_texture;
      uniform vec2 u_point;
      uniform vec3 u_color;
      uniform float u_radius;
      uniform float u_aspectRatio;

      void main() {
        vec2 p = v_texCoord - u_point;
        p.x *= u_aspectRatio;
        float d = exp(-dot(p, p) / u_radius);
        vec3 base = texture2D(u_texture, v_texCoord).rgb;
        gl_FragColor = vec4(base + u_color * d, 1.0);
      }
    `;

    const displayShaderSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform sampler2D u_texture;
      void main() {
        vec4 color = texture2D(u_texture, v_texCoord);
        // Aggressive fade so trails dissolve fast; very low alpha for smoky feel
        gl_FragColor = vec4(color.rgb * 0.82, color.a * 0.18);
      }
    `;

    const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('Shader compile error:', glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (glContext: WebGLRenderingContext, vsSource: string, fsSource: string) => {
      const vs = createShader(glContext, glContext.VERTEX_SHADER, vsSource);
      const fs = createShader(glContext, glContext.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return null;

      const program = glContext.createProgram();
      if (!program) return null;
      glContext.attachShader(program, vs);
      glContext.attachShader(program, fs);
      glContext.linkProgram(program);

      if (!glContext.getProgramParameter(program, glContext.LINK_STATUS)) {
        console.error('Program link error:', glContext.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const splatProgram = createProgram(gl, baseVertexShader, splatShaderSource);
    const displayProgram = createProgram(gl, baseVertexShader, displayShaderSource);

    if (!splatProgram || !displayProgram) return;

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Framebuffer textures for double-buffering
    const createTexture = (width: number, height: number) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    };

    const createFBO = (width: number, height: number) => {
      const texture = createTexture(width, height);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return { fbo, texture };
    };

    const texWidth = 256;
    const texHeight = 256;
    let readState = createFBO(texWidth, texHeight);
    let writeState = createFBO(texWidth, texHeight);

    const swapFBOs = () => {
      const temp = readState;
      readState = writeState;
      writeState = temp;
    };

    // Tracking pointer inputs
    const pointer = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      moved: false,
      active: false
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const nx = clientX / window.innerWidth;
      const ny = 1.0 - clientY / window.innerHeight;
      pointer.dx = nx - pointer.x;
      pointer.dy = ny - pointer.y;
      pointer.x = nx;
      pointer.y = ny;
      pointer.moved = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      pointer.active = true;
      updatePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.active = true;
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    let animationFrameId: number;

    const render = () => {
      if (!canvas) return;

      // Aspect ratio
      const aspectRatio = canvas.width / canvas.height;

      // 1. Process pointer inputs if moved
      if (pointer.active && pointer.moved) {
        pointer.moved = false;

        gl.useProgram(splatProgram);
        gl.bindFramebuffer(gl.FRAMEBUFFER, writeState.fbo);
        gl.viewport(0, 0, texWidth, texHeight);

        // Bind active texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, readState.texture);
        gl.uniform1i(gl.getUniformLocation(splatProgram, 'u_texture'), 0);

        // Upload uniforms
        gl.uniform2f(gl.getUniformLocation(splatProgram, 'u_point'), pointer.x, pointer.y);
        
        // Dynamic intensity based on movement speed — clamped low for a subtle haze
        const speed = Math.sqrt(pointer.dx * pointer.dx + pointer.dy * pointer.dy);
        const strength = Math.min(speed * splatForce, 1.2);
        
        gl.uniform3f(
          gl.getUniformLocation(splatProgram, 'u_color'),
          targetColor[0] * strength,
          targetColor[1] * strength,
          targetColor[2] * strength
        );
        gl.uniform1f(gl.getUniformLocation(splatProgram, 'u_radius'), splatRadius);
        gl.uniform1f(gl.getUniformLocation(splatProgram, 'u_aspectRatio'), aspectRatio);

        // Draw quad
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const aPosition = gl.getAttribLocation(splatProgram, 'a_position');
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        swapFBOs();
      }

      // 2. Render to Screen with subtle fade
      gl.useProgram(displayProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, readState.texture);
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'u_texture'), 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const aPositionDisplay = gl.getAttribLocation(displayProgram, 'a_position');
      gl.enableVertexAttribArray(aPositionDisplay);
      gl.vertexAttribPointer(aPositionDisplay, 2, gl.FLOAT, false, 0, 0);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Enable alpha blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.disable(gl.BLEND);

      // Decaying state texture slightly to prevent infinite bleed
      gl.bindFramebuffer(gl.FRAMEBUFFER, writeState.fbo);
      gl.viewport(0, 0, texWidth, texHeight);
      gl.useProgram(displayProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, readState.texture);
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'u_texture'), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      swapFBOs();

      animationFrameId = requestAnimationFrame(render);
    };

    // Kickoff loop
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      
      // Clean up buffers/textures
      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(splatProgram);
        gl.deleteProgram(displayProgram);
        gl.deleteTexture(readState.texture);
        gl.deleteTexture(writeState.texture);
        gl.deleteFramebuffer(readState.fbo);
        gl.deleteFramebuffer(writeState.fbo);
      }
    };
  }, [densityDissipation, velocityDissipation, pressure, curl, splatRadius, splatForce, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-screen"
      style={{ opacity: 0.35 }}
    />
  );
}
