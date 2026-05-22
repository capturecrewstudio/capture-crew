import { ArrowUpRight } from 'lucide-react';
import type { RouteName } from '../App';

type Props = {
  onNavigate: (route: RouteName) => void;
};

export function SiteFooter({ onNavigate }: Props) {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Capture Crew</p>
        <h2>Luxury visual stories for brands, spaces, and people with presence.</h2>
        <div className="footer-links">
          <button type="button" onClick={() => onNavigate('privacy')}>Privacy Policy</button>
          <button type="button" onClick={() => onNavigate('terms')}>Terms</button>
          <button type="button" onClick={() => onNavigate('blog')}>Journal</button>
        </div>
      </div>
      <button className="text-link" type="button" onClick={() => onNavigate('contact')}>
        Book Consultation
        <ArrowUpRight size={16} />
      </button>
    </footer>
  );
}
