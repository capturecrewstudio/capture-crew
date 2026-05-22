import { ChangeEvent, useMemo, useState } from 'react';
import {
  BarChart3,
  FileText,
  FolderKanban,
  Home,
  ImageUp,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Star,
  Tags
} from 'lucide-react';
import { categories, posts, projects, testimonials } from '../data/portfolio';
import { uploadMedia } from '../lib/api';

type AdminTab = 'Dashboard' | 'Upload Media' | 'Albums' | 'Categories' | 'Testimonials' | 'Leads' | 'SEO' | 'Blog Manager' | 'Homepage CMS' | 'Settings';

const adminItems: Array<{ label: AdminTab; icon: typeof LayoutDashboard }> = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Upload Media', icon: ImageUp },
  { label: 'Albums', icon: FolderKanban },
  { label: 'Categories', icon: Tags },
  { label: 'Testimonials', icon: Star },
  { label: 'Leads', icon: MessageSquare },
  { label: 'SEO', icon: Search },
  { label: 'Blog Manager', icon: FileText },
  { label: 'Homepage CMS', icon: Home },
  { label: 'Settings', icon: Settings }
];

export function AdminShell() {
  const [activeTab, setActiveTab] = useState<AdminTab>('Dashboard');
  const [uploadMessage, setUploadMessage] = useState('Ready for Amazon S3 credentials and admin token.');
  const stats = useMemo(() => ([
    ['Featured projects', String(projects.filter((project) => project.featured).length)],
    ['Open leads', '8'],
    ['Media assets', '486'],
    ['SEO score', '100']
  ]), []);

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const token = window.prompt('Paste an admin JWT to upload to S3.');

    if (!files?.length || !token) {
      setUploadMessage('Choose files and provide an admin token when S3 is configured.');
      return;
    }

    try {
      setUploadMessage('Uploading optimized AVIF/WebP variants to Amazon S3...');
      await uploadMedia(files, token);
      setUploadMessage('Upload complete. New variants are available from S3.');
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : 'Upload failed.');
    }
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <h1>Capture Crew Admin</h1>
        <nav aria-label="Admin navigation">
          {adminItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activeTab === item.label ? 'is-active' : ''}
                type="button"
                key={item.label}
                onClick={() => setActiveTab(item.label)}
              >
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
            <p className="eyebrow">{activeTab}</p>
            <h2>{activeTab === 'Dashboard' ? 'Studio operations' : activeTab}</h2>
          </div>
          <label className="primary-button file-button">
            <ImageUp size={16} />
            Upload
            <input type="file" accept="image/*" multiple onChange={onFileChange} />
          </label>
        </div>

        {activeTab === 'Dashboard' && (
          <>
            <div className="admin-stats">
              {stats.map(([label, value]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
            <section className="admin-table">
              <h3>Recent production board</h3>
              {projects.slice(0, 4).map((project) => (
                <div className="admin-row" key={project.slug}>
                  <img src={project.image} alt={project.title} />
                  <span>{project.title}</span>
                  <small>{project.category}</small>
                  <strong>{project.featured ? 'Featured' : 'Published'}</strong>
                </div>
              ))}
            </section>
          </>
        )}

        {activeTab === 'Upload Media' && (
          <section className="upload-zone">
            <BarChart3 size={22} />
            <h3>Drag-drop media workflow for Amazon S3</h3>
            <p>{uploadMessage}</p>
            <label className="ghost-button file-button">
              Choose Images
              <input type="file" accept="image/*" multiple onChange={onFileChange} />
            </label>
          </section>
        )}

        {activeTab === 'Albums' && <CollectionList items={projects.map((project) => [project.title, project.category, project.year])} />}
        {activeTab === 'Categories' && <CollectionList items={categories.map((category) => [category.name, category.slug, 'Public category'])} />}
        {activeTab === 'Testimonials' && <CollectionList items={testimonials.map((item) => [item.name, item.designation, 'Featured quote'])} />}
        {activeTab === 'Blog Manager' && <CollectionList items={posts.map((post) => [post.title, post.date, 'Draft ready'])} />}
        {activeTab === 'Leads' && (
          <CollectionList
            items={[
              ['Neha Rao', 'Architecture', 'New'],
              ['Kunal Shah', 'Commercial', 'Qualified'],
              ['Ananya Iyer', 'Wedding', 'Contacted']
            ]}
          />
        )}
        {activeTab === 'SEO' && (
          <CollectionList
            items={[
              ['/', 'Capture Crew | Luxury Visual Storytelling', 'OG ready'],
              ['/portfolio', 'Portfolio | Capture Crew', 'Sitemap ready'],
              ['/services', 'Services | Capture Crew', 'Schema ready']
            ]}
          />
        )}
        {activeTab === 'Homepage CMS' && (
          <CollectionList
            items={[
              ['Hero headline', 'Architecture. Luxury. Visual Storytelling.', 'Published'],
              ['Hero media', 'Autoplay cinematic video with poster fallback', 'Published'],
              ['Featured projects', 'Maison Aster, The Gilded Room, Noir Atelier', 'Published']
            ]}
          />
        )}
        {activeTab === 'Settings' && (
          <CollectionList
            items={[
              ['Storage', 'Amazon S3 bucket and public CDN URL', 'Environment'],
              ['Authentication', 'Email/password JWT admin access', 'Protected'],
              ['Optimization', 'AVIF, WebP, blur placeholder generation', 'Enabled']
            ]}
          />
        )}
      </section>
    </main>
  );
}

function CollectionList({ items }: { items: string[][] }) {
  return (
    <section className="admin-table">
      {items.map(([title, detail, status]) => (
        <div className="admin-row" key={`${title}-${detail}`}>
          <span>{title}</span>
          <small>{detail}</small>
          <strong>{status}</strong>
        </div>
      ))}
    </section>
  );
}
