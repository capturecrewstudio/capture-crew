import { useMemo, useState } from 'react';
import { AdminShell } from './pages/AdminShell';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectPage } from './pages/ProjectPage';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

export type RouteName = 'home' | 'portfolio' | 'project' | 'about' | 'services' | 'contact' | 'admin';

export function App() {
  const [route, setRoute] = useState<RouteName>('home');
  const content = useMemo(() => {
    if (route === 'admin') return <AdminShell />;
    if (route === 'portfolio') return <PortfolioPage onNavigate={setRoute} />;
    if (route === 'project') return <ProjectPage />;
    return <HomePage activeRoute={route} onNavigate={setRoute} />;
  }, [route]);

  return (
    <>
      <SiteHeader activeRoute={route} onNavigate={setRoute} />
      {content}
      {route !== 'admin' && <SiteFooter onNavigate={setRoute} />}
    </>
  );
}
