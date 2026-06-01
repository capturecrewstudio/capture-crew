import { useEffect, useState } from 'react';
import { REVEAL_ALL_EVENT } from './components/LazySection';
import { AdminShell } from './pages/AdminShell';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectPage } from './pages/ProjectPage';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { BlogPage, LegalPage, TestimonialsPage } from './pages/SupportPages';
import { FluidCursor } from './components/FluidCursor';
import { SocialDock } from './components/SocialDock';
import { SiteDataProvider } from './lib/siteData';

export type RouteName =
  | 'home' | 'portfolio' | 'category' | 'project'
  | 'about' | 'services' | 'contact' | 'testimonials'
  | 'blog' | 'privacy' | 'terms' | 'admin';

export type AccentName = 'red' | 'gold' | 'blue' | 'custom';

const SECTION_ROUTES = ['about', 'services', 'contact', 'testimonials'];

function sectionId(route: string): string {
  if (route === 'contact')  return 'contact-us';
  if (route === 'about')    return 'about-section';
  if (route === 'services') return 'portfolio-section';
  return `${route}-section`;
}

export function scrollToSection(id: string) {
  // Reveal all lazy sections so the target element exists in the DOM
  window.dispatchEvent(new Event(REVEAL_ALL_EVENT));
  let attempts = 0;
  function attempt() {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    } else if (attempts < 40) {
      attempts++;
      setTimeout(attempt, 80);
    }
  }
  // Wait one tick for React to flush lazy-section state
  setTimeout(attempt, 60);
}

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('cc-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-accent', isDark ? 'gold' : 'red');
    localStorage.setItem('cc-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const fluidColor = isDark ? '#C8A96B' : '#E8192C';

  const [route, setRoute] = useState<RouteName>(() => {
    const p = window.location.pathname;
    if (p === '/admin')        return 'admin';
    if (p === '/portfolio')    return 'portfolio';
    if (p === '/blog')         return 'blog';
    if (p === '/privacy')      return 'privacy';
    if (p === '/terms')        return 'terms';
    // section routes all render home + scroll
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState('maison-aster');
  const [selectedCategory, setSelectedCategory] = useState('architecture');

  // On initial load: handle legacy /about /services /contact URLs
  useEffect(() => {
    const p = window.location.pathname.slice(1);
    if (SECTION_ROUTES.includes(p)) {
      window.history.replaceState(null, '', '/');
      scrollToSection(sectionId(p));
    }
  }, []);

  // Browser back/forward
  useEffect(() => {
    function onPop() {
      const p = window.location.pathname;
      const hash = window.location.hash;
      if (hash && p === '/admin') return; // admin panel hash nav — ignore
      if (p === '/admin')     { setRoute('admin'); return; }
      if (p === '/portfolio') { setRoute('portfolio'); return; }
      if (p === '/blog')      { setRoute('blog'); return; }
      if (p === '/privacy')   { setRoute('privacy'); return; }
      if (p === '/terms')     { setRoute('terms'); return; }
      setRoute('home');
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function handleNavigate(newRoute: RouteName) {
    // Section routes — just scroll, no URL change needed
    if (SECTION_ROUTES.includes(newRoute)) {
      if (route !== 'home') {
        setRoute('home');
        setTimeout(() => scrollToSection(sectionId(newRoute)), 100);
      } else {
        scrollToSection(sectionId(newRoute));
      }
      return;
    }

    const path = (newRoute === 'home' || newRoute === 'category' || newRoute === 'project')
      ? '/'
      : `/${newRoute}`;

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setRoute(newRoute);
  }

  function renderContent() {
    if (route === 'admin') return <AdminShell />;
    if (route === 'portfolio' || route === 'category') {
      return (
        <PortfolioPage
          selectedCategory={route === 'category' ? selectedCategory : undefined}
          onSelectCategory={(slug) => { setSelectedCategory(slug); handleNavigate('category'); }}
          onSelectProject={(slug) => { setSelectedProject(slug); handleNavigate('project'); }}
        />
      );
    }
    if (route === 'project') return <ProjectPage slug={selectedProject} onNavigate={handleNavigate} />;
    if (route === 'testimonials') return <TestimonialsPage />;
    if (route === 'blog') return <BlogPage />;
    if (route === 'privacy' || route === 'terms') return <LegalPage kind={route} />;
    return (
      <HomePage
        activeRoute={route}
        onNavigate={handleNavigate}
        onSelectCategory={(slug) => { setSelectedCategory(slug); handleNavigate('category'); }}
        onSelectProject={(slug) => { setSelectedProject(slug); handleNavigate('project'); }}
      />
    );
  }

  return (
    <SiteDataProvider>
      {route !== 'admin' && <FluidCursor color={fluidColor} splatRadius={0.0018} splatForce={1800} />}
      {route !== 'admin' && (
        <SiteHeader
          activeRoute={route}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={() => setIsDark(d => !d)}
        />
      )}
      {renderContent()}
      {route !== 'admin' && <SiteFooter onNavigate={handleNavigate} isDark={isDark} />}
      {route !== 'admin' && <SocialDock />}
    </SiteDataProvider>
  );
}
