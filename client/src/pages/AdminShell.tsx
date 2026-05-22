import { BarChart3, FolderKanban, ImageUp, LayoutDashboard, MessageSquare, Search, Settings } from 'lucide-react';

const adminItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Upload Media', icon: ImageUp },
  { label: 'Albums', icon: FolderKanban },
  { label: 'Leads', icon: MessageSquare },
  { label: 'SEO', icon: Search },
  { label: 'Settings', icon: Settings }
];

export function AdminShell() {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <h1>Capture Crew Admin</h1>
        <nav aria-label="Admin navigation">
          {adminItems.map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" key={item.label}>
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <section className="admin-panel">
        <div className="admin-topline">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2>Studio operations</h2>
          </div>
          <button className="primary-button" type="button">
            <ImageUp size={16} />
            Upload
          </button>
        </div>
        <div className="admin-stats">
          {[
            ['Featured projects', '12'],
            ['Open leads', '8'],
            ['Media assets', '486'],
            ['SEO score', '100']
          ].map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
        <section className="upload-zone">
          <BarChart3 size={22} />
          <h3>Drag media here to upload to Amazon S3</h3>
          <p>Backend endpoints are scaffolded for multi-upload, image derivatives, and project assignment.</p>
        </section>
      </section>
    </main>
  );
}
