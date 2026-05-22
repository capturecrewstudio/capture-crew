import React from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import { App } from './App';
import './styles/global.css';

const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
