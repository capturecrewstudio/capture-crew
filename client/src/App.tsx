import { useEffect, useMemo, useState } from 'react';
import { AdminShell } from './pages/AdminShell';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectPage } from './pages/ProjectPage';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { BlogPage, LegalPage, TestimonialsPage } from './pages/SupportPages';
import { FluidCursor } from './components/FluidCursor';
import { SocialDock } from './components/SocialDock';

export type RouteName =
  | 'home'
  | 'portfolio'
  | 'category'
  | 'project'
  | 'about'
  | 'services'
  | 'contact'
  | 'testimonials'
  | 'blog'
  | 'privacy'
  | 'terms'
  | 'admin';

// Smooth-scrolls the window so target sits 70px below top.
// Polls up to 20× × 100ms in case the target hasn't mounted yet.
export function scrollToSection(sectionId: string) {
  let attempts = 0;
  const scroll = () => {
    const target = document.getElementById(sectionId);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    } else if (attempts < 20) {
      attempts++;
      setTimeout(scroll, 100);
    }
  };
  scroll();
}

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('cc-theme');
    return saved ? saved === 'dark' : true;
  });

  const [accent, setAccent] = useState<'red' | 'gold' | 'blue'>(() => {
    const saved = localStorage.getItem('cc-accent');
    return (saved as 'red' | 'gold' | 'blue') ?? 'red';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('cc-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('cc-accent', accent);
  }, [accent]);

  const [route, setRoute] = useState<RouteName>(() => {
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    if (path === '/portfolio') return 'portfolio';
    if (path === '/about') return 'about';
    if (path === '/services') return 'services';
    if (path === '/contact') return 'contact';
    if (path === '/testimonials') return 'testimonials';
    if (path === '/blog') return 'blog';
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState('maison-aster');
  const [selectedCategory, setSelectedCategory] = useState('architecture');

  // Trigger smooth scrolling on initial direct URL loads
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/about') {
      setRoute('home');
      scrollToSection('about-section');
    } else if (path === '/services') {
      setRoute('home');
      scrollToSection('services-section');
    } else if (path === '/contact') {
      setRoute('home');
      scrollToSection('contact-us');
    } else if (path === '/testimonials') {
      setRoute('home');
      scrollToSection('testimonials-section');
    }
  }, []);

  // Handle URL changes via browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') setRoute('admin');
      else if (path === '/portfolio') setRoute('portfolio');
      else if (path === '/about') {
        setRoute('home');
        scrollToSection('about-section');
      } else if (path === '/services') {
        setRoute('home');
        scrollToSection('services-section');
      } else if (path === '/contact') {
        setRoute('home');
        scrollToSection('contact-us');
      } else if (path === '/testimonials') {
        setRoute('home');
        scrollToSection('testimonials-section');
      } else if (path === '/blog') setRoute('blog');
      else if (path === '/privacy') setRoute('privacy');
      else if (path === '/terms') setRoute('terms');
      else setRoute('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (newRoute: RouteName) => {
    // If routing to a homepage section, scroll instead of swapping page
    if (['about', 'services', 'contact', 'testimonials'].includes(newRoute)) {
      if (window.location.pathname !== `/${newRoute}`) {
        window.history.pushState(null, '', `/${newRoute}`);
      }
      setRoute('home');
      // Scroll to appropriate section ID
      const sectionId = 
        newRoute === 'contact' ? 'contact-us' : 
        newRoute === 'about' ? 'about-section' : `${newRoute}-section`;
      scrollToSection(sectionId);
      return;
    }

    let path = '/';
    if (newRoute !== 'home' && newRoute !== 'category' && newRoute !== 'project') {
      path = `/${newRoute}`;
    }
    
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setRoute(newRoute);
  };

  const content = useMemo(() => {
    if (route === 'admin') return <AdminShell />;
    if (route === 'portfolio' || route === 'category') {
      return (
        <PortfolioPage
          selectedCategory={route === 'category' ? selectedCategory : undefined}
          onSelectCategory={(slug) => {
            setSelectedCategory(slug);
            handleNavigate('category');
          }}
          onSelectProject={(slug) => {
            setSelectedProject(slug);
            handleNavigate('project');
          }}
        />
      );
    }
    if (route === 'project') return <ProjectPage slug={selectedProject} onNavigate={handleNavigate} />;
    if (route === 'testimonials') {
      // Just fallback, though they should scroll on home
      return <TestimonialsPage />;
    }
    if (route === 'blog') return <BlogPage />;
    if (route === 'privacy' || route === 'terms') return <LegalPage kind={route} />;
    return (
      <HomePage
        activeRoute={route}
        onNavigate={handleNavigate}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          handleNavigate('category');
        }}
        onSelectProject={(slug) => {
          setSelectedProject(slug);
          handleNavigate('project');
        }}
      />
    );
  }, [route, selectedCategory, selectedProject]);

  return (
    <>
      {route !== 'admin' && (
        <FluidCursor
          color={accent === 'red' ? '#E8192C' : accent === 'gold' ? '#C8A96B' : '#4D9EFF'}
          splatRadius={0.0018}
          splatForce={1800}
        />
      )}
      {route !== 'admin' && <SiteHeader activeRoute={route} onNavigate={handleNavigate} isDark={isDark} onToggleTheme={() => setIsDark(d => !d)} accent={accent} onAccentChange={setAccent} />}
      {content}
      {route !== 'admin' && <SiteFooter onNavigate={handleNavigate} />}
      {route !== 'admin' && <SocialDock />}
    </>
  );
}
