import { useMemo, useState } from 'react';
import { AdminShell } from './pages/AdminShell';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectPage } from './pages/ProjectPage';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { BlogPage, LegalPage, TestimonialsPage } from './pages/SupportPages';

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

export function App() {
  const [route, setRoute] = useState<RouteName>('home');
  const [selectedProject, setSelectedProject] = useState('maison-aster');
  const [selectedCategory, setSelectedCategory] = useState('architecture');

  const content = useMemo(() => {
    if (route === 'admin') return <AdminShell />;
    if (route === 'portfolio' || route === 'category') {
      return (
        <PortfolioPage
          selectedCategory={route === 'category' ? selectedCategory : undefined}
          onSelectCategory={(slug) => {
            setSelectedCategory(slug);
            setRoute('category');
          }}
          onSelectProject={(slug) => {
            setSelectedProject(slug);
            setRoute('project');
          }}
        />
      );
    }
    if (route === 'project') return <ProjectPage slug={selectedProject} onNavigate={setRoute} />;
    if (route === 'testimonials') return <TestimonialsPage />;
    if (route === 'blog') return <BlogPage />;
    if (route === 'privacy' || route === 'terms') return <LegalPage kind={route} />;
    return (
      <HomePage
        activeRoute={route}
        onNavigate={setRoute}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          setRoute('category');
        }}
        onSelectProject={(slug) => {
          setSelectedProject(slug);
          setRoute('project');
        }}
      />
    );
  }, [route, selectedCategory, selectedProject]);

  return (
    <>
      <SiteHeader activeRoute={route} onNavigate={setRoute} />
      {content}
      {route !== 'admin' && <SiteFooter onNavigate={setRoute} />}
    </>
  );
}
