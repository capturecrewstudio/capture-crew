import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle, Check, Edit2, Eye, EyeOff, FolderOpen, Grid, ImageUp, Inbox,
  LayoutDashboard, Lock, LogOut, MessageSquare, PackageOpen,
  Plus, Save, Star, Trash2, Type, X
} from 'lucide-react';
import {
  isLoggedIn, getAdminUser, saveSession, clearSession,
} from '../lib/adminAuth';
import {
  apiLogin,
  apiGetLeads, apiPatchLeadStatus,
  apiGetCategories, apiCreateCategory, apiDeleteCategory,
  apiGetTestimonials, apiCreateTestimonial, apiUpdateTestimonial, apiDeleteTestimonial,
  apiGetMedia, apiUploadMedia,
  apiGetContent, apiUpdateContent,
  type ApiLead, type ApiCategory, type ApiTestimonial, type ApiMedia, type ApiContent,
  type TestimonialPayload,
} from '../lib/adminApi';

// ─── Types ────────────────────────────────────────────────────────────────────

type Panel = 'dashboard' | 'media' | 'categories' | 'testimonials' | 'leads' | 'content' | 'settings';

// ─── Shared UI components ────────────────────────────────────────────────────

function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, className = '', type = 'button' }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md'; disabled?: boolean; className?: string; type?: 'button' | 'submit';
}) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-0 outline-none';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' };
  const variants = {
    primary: 'bg-accent text-ink hover:opacity-90',
    ghost: 'bg-surface text-ivory hover:bg-surface-2',
    outline: 'border border-line text-stone hover:text-ivory hover:border-linemid',
    danger: 'bg-red-900/40 text-red-400 hover:bg-red-900/60',
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-[0.15em] text-stone font-medium">{label}</label>
      {children}
      {hint && <p className="text-xs text-stone/60">{hint}</p>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text', className = '' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) {
  return (
    <input
      type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-surface border border-line rounded-lg px-3 py-2 text-ivory text-sm placeholder:text-stone/40 focus:outline-none focus:border-accent/50 transition-colors ${className}`}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-ivory text-sm placeholder:text-stone/40 focus:outline-none focus:border-accent/50 transition-colors resize-y"
    />
  );
}

function Badge({ children, color = 'stone' }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    stone: 'bg-stone/10 text-stone',
    green: 'bg-green-900/30 text-green-400',
    yellow: 'bg-yellow-900/30 text-yellow-400',
    red: 'bg-red-900/30 text-red-400',
    blue: 'bg-blue-900/30 text-blue-400',
    accent: 'bg-accent/10 text-accent',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] uppercase tracking-widest font-medium ${colors[color] ?? colors.stone}`}>
      {children}
    </span>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface border border-line rounded-xl ${className}`}>{children}</div>
  );
}

function EmptyState({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <Icon size={32} className="text-stone/30" />
      <p className="text-ivory font-medium">{title}</p>
      <p className="text-stone text-sm max-w-xs">{body}</p>
    </div>
  );
}

// ─── Login Gate ───────────────────────────────────────────────────────────────

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { token, user } = await apiLogin(email, password);
      saveSession(token, user);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Lock size={22} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-2xl font-light text-ivory" style={{ fontFamily: "'Cormorant Garant', serif" }}>
            Admin Access
          </h1>
          <p className="text-stone text-sm text-center">Enter your credentials to manage Capture Crew.</p>
        </div>
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Email">
              <Input value={email} onChange={setEmail} type="email" placeholder="admin@capturecrew.in" />
            </Field>
            <Field label="Password">
              <div className="relative">
                <Input value={password} onChange={setPassword} type={show ? 'text' : 'password'} placeholder="Enter admin password" />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ivory transition-colors">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={14} /> {error}
              </div>
            )}
            <Btn type="submit" disabled={loading} className="w-full justify-center">
              <Lock size={14} /> {loading ? 'Signing In…' : 'Sign In'}
            </Btn>
          </form>
        </Card>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [counts, setCounts] = useState({ cats: 0, media: 0, testi: 0, newLeads: 0, totalLeads: 0 });
  const [recentLeads, setRecentLeads] = useState<ApiLead[]>([]);

  useEffect(() => {
    Promise.all([
      apiGetLeads(),
      apiGetCategories(),
      apiGetMedia(),
      apiGetTestimonials(),
    ]).then(([leads, cats, media, testi]) => {
      setCounts({
        cats: cats.length,
        media: media.length,
        testi: testi.length,
        newLeads: leads.filter(l => l.status === 'new').length,
        totalLeads: leads.length,
      });
      setRecentLeads(leads.slice(0, 5));
    }).catch(() => { /* silently fail — show 0s */ });
  }, []);

  const stats = [
    { label: 'Categories', value: counts.cats, icon: FolderOpen, panel: 'categories' as Panel, color: 'text-blue-400' },
    { label: 'Media Items', value: counts.media, icon: ImageUp, panel: 'media' as Panel, color: 'text-green-400' },
    { label: 'Testimonials', value: counts.testi, icon: Star, panel: 'testimonials' as Panel, color: 'text-yellow-400' },
    { label: 'New Leads', value: counts.newLeads, icon: Inbox, panel: 'leads' as Panel, color: 'text-accent' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <button key={s.label} onClick={() => setPanel(s.panel)}
            className="bg-surface border border-line rounded-xl p-5 text-left hover:border-linemid hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <s.icon size={20} className={s.color} />
            <div className="mt-3 text-3xl font-bold text-ivory" style={{ fontFamily: "'Cormorant Garant', serif" }}>{s.value}</div>
            <div className="text-xs text-stone uppercase tracking-wider mt-1">{s.label}</div>
          </button>
        ))}
      </div>

      {recentLeads.length > 0 && (
        <Card>
          <div className="px-5 py-4 border-b border-line flex items-center justify-between">
            <h3 className="text-ivory font-medium text-sm">Recent Enquiries</h3>
            <Btn variant="ghost" size="sm" onClick={() => setPanel('leads')}>View all</Btn>
          </div>
          <div className="divide-y divide-line">
            {recentLeads.map(l => (
              <div key={l.id} className="px-5 py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-ivory text-sm font-medium">{l.name}</p>
                  <p className="text-stone text-xs">{l.service} · {l.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge color={l.status === 'new' ? 'accent' : l.status === 'booked' ? 'green' : 'stone'}>{l.status}</Badge>
                  <span className="text-stone text-xs">{new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {recentLeads.length === 0 && counts.totalLeads === 0 && (
        <Card className="p-8">
          <EmptyState icon={Inbox} title="No leads yet" body="Enquiries from your contact form will appear here." />
        </Card>
      )}
    </div>
  );
}

// ─── Categories Manager ───────────────────────────────────────────────────────

function CategoriesPanel() {
  const [cats, setCats] = useState<ApiCategory[]>([]);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadCats() {
    try {
      const data = await apiGetCategories();
      setCats(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load categories');
    }
  }

  useEffect(() => { loadCats(); }, []);

  async function handleSave() {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const slug = newSlug.trim() || newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await apiCreateCategory({ name: newName.trim(), slug });
      setNewName('');
      setNewSlug('');
      setAdding(false);
      await loadCats();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this category? All associated media will remain but the category card will be removed.')) return;
    try {
      await apiDeleteCategory(id);
      await loadCats();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete category');
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-stone text-sm">{cats.length} categories</p>
        <Btn onClick={() => setAdding(true)} disabled={adding}><Plus size={14} /> Add Category</Btn>
      </div>

      {adding && (
        <Card className="p-5 border-accent/30">
          <h3 className="text-ivory font-medium mb-4">New Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category Name">
              <Input value={newName} onChange={setNewName} placeholder="e.g. Architecture" />
            </Field>
            <Field label="URL Slug" hint="Auto-generated from name if blank">
              <Input value={newSlug} onChange={setNewSlug} placeholder="e.g. architecture" />
            </Field>
          </div>
          <div className="flex gap-2 mt-5">
            <Btn onClick={handleSave} disabled={saving}><Save size={13} /> {saving ? 'Saving…' : 'Save Category'}</Btn>
            <Btn variant="ghost" onClick={() => { setAdding(false); setNewName(''); setNewSlug(''); }}><X size={13} /> Cancel</Btn>
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        {cats.map((cat) => (
          <Card key={cat.id} className="flex items-center gap-4 p-4">
            <div className="w-16 h-12 rounded-lg border border-line bg-surface-2 flex items-center justify-center shrink-0">
              <ImageUp size={16} className="text-stone/40" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-ivory font-medium text-sm">{cat.name}</p>
              <p className="text-stone/40 text-xs font-mono">/{cat.slug}</p>
              <p className="text-stone/30 text-xs">{new Date(cat.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Btn variant="danger" size="sm" onClick={() => handleDelete(cat.id)}><Trash2 size={13} /></Btn>
            </div>
          </Card>
        ))}
      </div>

      {cats.length === 0 && !adding && (
        <EmptyState icon={FolderOpen} title="No categories yet" body="Add your first category to start organising your portfolio." />
      )}
    </div>
  );
}

// ─── Media Manager ────────────────────────────────────────────────────────────

function MediaPanel() {
  const [media, setMedia] = useState<ApiMedia[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function loadMedia() {
    try {
      const data = await apiGetMedia();
      setMedia(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load media');
    }
  }

  useEffect(() => { loadMedia(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      await apiUploadMedia(files);
      await loadMedia();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function getImageUrl(m: ApiMedia): string {
    const v = m.variants as Record<string, { url?: string }> | null;
    return v?.webp?.url ?? v?.jpeg?.url ?? '';
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-stone text-sm">{media.length} items</p>
        <div className="ml-auto flex gap-2">
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          <Btn onClick={() => fileRef.current?.click()} disabled={uploading}>
            <ImageUp size={14} /> {uploading ? 'Uploading…' : 'Upload Images'}
          </Btn>
        </div>
      </div>

      {media.length === 0 && (
        <EmptyState icon={ImageUp} title="No images here" body="Upload images using the button above." />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {media.map(m => {
          const imgUrl = getImageUrl(m);
          return (
            <div key={m.id} className="relative group rounded-xl overflow-hidden border border-line">
              {imgUrl ? (
                <img src={imgUrl} alt={m.originalName} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-surface-2 flex items-center justify-center">
                  <ImageUp size={24} className="text-stone/30" />
                </div>
              )}
              <div className="px-2 py-1.5 border-t border-line">
                <p className="text-stone text-xs truncate">{m.originalName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Testimonials Manager ─────────────────────────────────────────────────────

type EditingTestimonial = {
  id: string;
  name: string;
  designation: string;
  message: string;
  image: string;
  featured: boolean;
};

function TestimonialsPanel() {
  const [items, setItems] = useState<ApiTestimonial[]>([]);
  const [editing, setEditing] = useState<EditingTestimonial | null>(null);
  const [saving, setSaving] = useState(false);

  const blank: EditingTestimonial = { id: '', name: '', designation: '', message: '', image: '', featured: false };

  async function loadItems() {
    try {
      const data = await apiGetTestimonials();
      setItems(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load testimonials');
    }
  }

  useEffect(() => { loadItems(); }, []);

  async function handleSave() {
    if (!editing || !editing.name.trim() || !editing.message.trim()) return;
    setSaving(true);
    const payload: TestimonialPayload = {
      name: editing.name,
      designation: editing.designation || undefined,
      message: editing.message,
      image: editing.image || undefined,
      featured: editing.featured,
    };
    try {
      if (editing.id) {
        await apiUpdateTestimonial(editing.id, payload);
      } else {
        await apiCreateTestimonial(payload);
      }
      await loadItems();
      setEditing(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await apiDeleteTestimonial(id);
      await loadItems();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete testimonial');
    }
  }

  async function toggleFeatured(t: ApiTestimonial) {
    const payload: TestimonialPayload = {
      name: t.name,
      designation: t.designation ?? undefined,
      message: t.message,
      image: t.image ?? undefined,
      featured: !t.featured,
    };
    try {
      await apiUpdateTestimonial(t.id, payload);
      await loadItems();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update testimonial');
    }
  }

  function startEdit(t: ApiTestimonial) {
    setEditing({
      id: t.id,
      name: t.name,
      designation: t.designation ?? '',
      message: t.message,
      image: t.image ?? '',
      featured: t.featured,
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-stone text-sm">{items.length} testimonials · {items.filter(t => t.featured).length} featured</p>
        <Btn onClick={() => setEditing({ ...blank })}><Plus size={14} /> Add Testimonial</Btn>
      </div>

      {editing && (
        <Card className="p-5 border-accent/30">
          <h3 className="text-ivory font-medium mb-4">{editing.id ? 'Edit Testimonial' : 'New Testimonial'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <Input value={editing.name} onChange={v => setEditing(p => p ? { ...p, name: v } : p)} placeholder="Client name" />
            </Field>
            <Field label="Title / Designation">
              <Input value={editing.designation} onChange={v => setEditing(p => p ? { ...p, designation: v } : p)} placeholder="e.g. Founder, Atlas Table" />
            </Field>
            <Field label="Quote">
              <Textarea value={editing.message} onChange={v => setEditing(p => p ? { ...p, message: v } : p)} placeholder="What did they say?" rows={3} />
            </Field>
            <Field label="Photo URL" hint="Paste a direct image URL">
              <Input value={editing.image} onChange={v => setEditing(p => p ? { ...p, image: v } : p)} placeholder="https://example.com/photo.jpg" />
              {editing.image && (
                <img src={editing.image} alt="" className="mt-2 w-16 h-16 object-cover rounded-full border border-line" />
              )}
            </Field>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="feat" checked={editing.featured}
              onChange={e => setEditing(p => p ? { ...p, featured: e.target.checked } : p)}
              className="accent-accent" />
            <label htmlFor="feat" className="text-sm text-stone cursor-pointer">Show on homepage</label>
          </div>
          <div className="flex gap-2 mt-5">
            <Btn onClick={handleSave} disabled={saving}><Save size={13} /> {saving ? 'Saving…' : 'Save'}</Btn>
            <Btn variant="ghost" onClick={() => setEditing(null)}><X size={13} /> Cancel</Btn>
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        {items.map(t => (
          <Card key={t.id} className="flex items-center gap-4 p-4">
            {t.image ? (
              <img src={t.image} alt={t.name} className="w-12 h-12 object-cover rounded-full border border-line shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full border border-line bg-surface-2 flex items-center justify-center shrink-0">
                <MessageSquare size={14} className="text-stone/40" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-ivory font-medium text-sm">{t.name}</p>
                {t.featured && <Badge color="accent">Featured</Badge>}
              </div>
              <p className="text-stone text-xs">{t.designation ?? ''}</p>
              <p className="text-stone/60 text-xs truncate mt-1">"{t.message}"</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleFeatured(t)} title={t.featured ? 'Remove from homepage' : 'Show on homepage'}
                className={`p-1.5 transition-colors ${t.featured ? 'text-yellow-400' : 'text-stone hover:text-ivory'}`}>
                <Star size={15} fill={t.featured ? 'currentColor' : 'none'} />
              </button>
              <Btn variant="ghost" size="sm" onClick={() => startEdit(t)}><Edit2 size={13} /></Btn>
              <Btn variant="danger" size="sm" onClick={() => handleDelete(t.id)}><Trash2 size={13} /></Btn>
            </div>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <EmptyState icon={Star} title="No testimonials yet" body="Add client quotes to build trust with visitors." />
      )}
    </div>
  );
}

// ─── Leads Inbox ──────────────────────────────────────────────────────────────

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'booked', 'archived'] as const;
type LeadStatus = typeof STATUS_OPTIONS[number];

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'accent', contacted: 'blue', qualified: 'yellow', booked: 'green', archived: 'stone',
};

function LeadsPanel() {
  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [selected, setSelected] = useState<ApiLead | null>(null);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');

  async function loadLeads() {
    try {
      const data = await apiGetLeads();
      setLeads(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load leads');
    }
  }

  useEffect(() => { loadLeads(); }, []);

  const filtered = filterStatus === 'all' ? leads : leads.filter(l => l.status === filterStatus);

  async function handleStatus(id: string, status: LeadStatus) {
    try {
      await apiPatchLeadStatus(id, status);
      await loadLeads();
      setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  }

  function getStatusColor(status: string): string {
    return STATUS_COLORS[status as LeadStatus] ?? 'stone';
  }

  return (
    <div className="flex gap-5 h-full">
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex flex-wrap gap-1.5">
          {(['all', ...STATUS_OPTIONS] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-colors ${filterStatus === s ? 'border-accent text-accent bg-accent/10' : 'border-line text-stone hover:text-ivory'}`}>
              {s === 'all' ? `All (${leads.length})` : `${s} (${leads.filter(l => l.status === s).length})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <EmptyState icon={Inbox} title="No leads" body="Enquiries submitted through your contact form appear here." />
        )}

        <div className="flex flex-col gap-2">
          {filtered.map(l => (
            <button key={l.id} onClick={() => setSelected(l === selected ? null : l)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${selected?.id === l.id ? 'border-accent/40 bg-accent/5' : 'border-line bg-surface hover:border-linemid'}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-ivory font-medium text-sm">{l.name}</p>
                  <Badge color={getStatusColor(l.status)}>{l.status}</Badge>
                </div>
                <span className="text-stone text-xs shrink-0">
                  {new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <p className="text-stone text-xs mt-1">{l.service} · {l.email}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="w-80 shrink-0">
          <Card className="p-5 sticky top-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-ivory font-medium">{selected.name}</p>
                <p className="text-stone text-xs">{selected.email}</p>
                {selected.phone && <p className="text-stone text-xs">{selected.phone}</p>}
              </div>
              <button onClick={() => setSelected(null)} className="text-stone hover:text-ivory transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <p className="text-stone text-xs uppercase tracking-wider mb-1">Service</p>
                <p className="text-ivory">{selected.service}</p>
              </div>
              <div>
                <p className="text-stone text-xs uppercase tracking-wider mb-1">Message</p>
                <p className="text-ivory/80 leading-relaxed">{selected.message}</p>
              </div>
              <div>
                <p className="text-stone text-xs uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {STATUS_OPTIONS.map(s => (
                    <button key={s} onClick={() => handleStatus(selected.id, s)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${selected.status === s ? 'border-accent text-accent bg-accent/10' : 'border-line text-stone hover:text-ivory'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Site Content Editor ──────────────────────────────────────────────────────

type ContentSection = 'hero' | 'stats' | 'partners' | 'faq' | 'packages' | 'contact' | 'footer' | 'social';

type StatShape = { value: number; suffix: string; label: string };
type StatsRecord = { shoots: StatShape; architects: StatShape; brands: StatShape; years: StatShape };

function defaultStats(): StatsRecord {
  return {
    shoots:     { value: 0, suffix: '+', label: 'Shoots Delivered' },
    architects: { value: 0, suffix: '+', label: 'Architects Served' },
    brands:     { value: 0, suffix: '+', label: 'Brands Covered' },
    years:      { value: 0, suffix: '+', label: 'Years of Experience' },
  };
}

function toStatsRecord(raw: Record<string, unknown>): StatsRecord {
  const def = defaultStats();
  function extractStat(k: keyof StatsRecord): StatShape {
    const entry = raw[k] as Partial<StatShape> | undefined;
    return {
      value: typeof entry?.value === 'number' ? entry.value : def[k].value,
      suffix: typeof entry?.suffix === 'string' ? entry.suffix : def[k].suffix,
      label: typeof entry?.label === 'string' ? entry.label : def[k].label,
    };
  }
  return { shoots: extractStat('shoots'), architects: extractStat('architects'), brands: extractStat('brands'), years: extractStat('years') };
}

type PackageItem = { title: string; price: string; priceNote: string; tag: string; summary: string; features: string[]; cta: string; highlight: boolean };

function toPackage(raw: Record<string, unknown>): PackageItem {
  return {
    title:     typeof raw.title     === 'string'  ? raw.title     : 'Package',
    price:     typeof raw.price     === 'string'  ? raw.price     : '₹0',
    priceNote: typeof raw.priceNote === 'string'  ? raw.priceNote : '',
    tag:       typeof raw.tag       === 'string'  ? raw.tag       : '',
    summary:   typeof raw.summary   === 'string'  ? raw.summary   : '',
    features:  Array.isArray(raw.features)        ? (raw.features as string[]) : [],
    cta:       typeof raw.cta       === 'string'  ? raw.cta       : 'Book Now',
    highlight: typeof raw.highlight === 'boolean' ? raw.highlight : false,
  };
}

type LocalContent = Omit<ApiContent, 'stats' | 'packages'> & {
  stats: StatsRecord;
  packages: PackageItem[];
};

function ContentPanel() {
  const [content, setContent] = useState<LocalContent | null>(null);
  const [section, setSection] = useState<ContentSection>('hero');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGetContent().then(raw => {
      setContent({
        ...raw,
        stats: toStatsRecord(raw.stats),
        packages: raw.packages.map(p => toPackage(p as Record<string, unknown>)),
      });
    }).catch(err => alert(err instanceof Error ? err.message : 'Failed to load content'));
  }, []);

  function update(patch: Partial<LocalContent>) {
    setContent(prev => prev ? { ...prev, ...patch } : prev);
  }

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    try {
      await apiUpdateContent({
        ...content,
        stats: content.stats as unknown as Record<string, unknown>,
        packages: content.packages as unknown as Array<Record<string, unknown>>,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setSaving(false);
    }
  }

  const sections: Array<{ id: ContentSection; label: string; icon: React.ElementType }> = [
    { id: 'hero',     label: 'Hero Section',    icon: Grid },
    { id: 'stats',    label: 'Stats & Numbers', icon: LayoutDashboard },
    { id: 'partners', label: 'Partner Brands',  icon: Star },
    { id: 'faq',      label: 'FAQ',             icon: MessageSquare },
    { id: 'packages', label: 'Packages',        icon: PackageOpen },
    { id: 'contact',  label: 'Contact Section', icon: Inbox },
    { id: 'footer',   label: 'Footer',          icon: Type },
    { id: 'social',   label: 'Social Dock',     icon: MessageSquare },
  ];

  if (!content) {
    return <div className="text-stone text-sm py-8 text-center">Loading content…</div>;
  }

  const SOCIAL_FIELDS: Array<{ key: string; label: string; placeholder: string; hint: string }> = [
    { key: 'whatsapp',  label: 'WhatsApp',  placeholder: 'https://wa.me/91XXXXXXXXXX',          hint: 'Full wa.me link including country code' },
    { key: 'phone',     label: 'Call Us',   placeholder: 'tel:+91XXXXXXXXXX',                   hint: 'Use tel: prefix, e.g. tel:+919876543210' },
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle',    hint: 'Your Instagram profile URL' },
    { key: 'youtube',   label: 'YouTube',   placeholder: 'https://youtube.com/@yourchannel',    hint: 'Your YouTube channel URL' },
    { key: 'linkedin',  label: 'LinkedIn',  placeholder: 'https://linkedin.com/company/yourco', hint: 'Your LinkedIn company or profile URL' },
    { key: 'threads',   label: 'Threads',   placeholder: 'https://threads.net/@yourhandle',     hint: 'Your Threads profile URL' },
    { key: 'email',     label: 'Email',     placeholder: 'mailto:hello@yourdomain.com',         hint: 'Use mailto: prefix' },
  ];

  return (
    <div className="flex gap-5">
      {/* Section nav */}
      <div className="w-44 shrink-0 flex flex-col gap-1">
        {sections.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${section === s.id ? 'bg-accent/10 text-accent' : 'text-stone hover:text-ivory hover:bg-surface'}`}>
            <s.icon size={14} />
            {s.label}
          </button>
        ))}
        <div className="mt-4">
          <Btn onClick={handleSave} disabled={saving} className="w-full justify-center">
            {saved ? <><Check size={13} /> Saved!</> : <><Save size={13} /> {saving ? 'Saving…' : 'Save Changes'}</>}
          </Btn>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 min-w-0">
        <Card className="p-5">
          {section === 'hero' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-ivory font-medium">Hero Section</h3>
              <Field label="Main Headline" hint="Use \n for line breaks">
                <Textarea value={content.heroHeadline} onChange={v => update({ heroHeadline: v })} rows={2} placeholder="Where Craft\nMeets Legacy." />
              </Field>
              <Field label="Subheadline / Tagline">
                <Input value={content.heroSubheadline} onChange={v => update({ heroSubheadline: v })} placeholder="Architecture. Luxury. Visual Storytelling." />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Primary CTA Button">
                  <Input value={content.heroCta1} onChange={v => update({ heroCta1: v })} placeholder="View Portfolio" />
                </Field>
                <Field label="Secondary CTA Button">
                  <Input value={content.heroCta2} onChange={v => update({ heroCta2: v })} placeholder="Book a Shoot" />
                </Field>
              </div>
            </div>
          )}

          {section === 'stats' && (
            <div className="flex flex-col gap-6">
              <h3 className="text-ivory font-medium">Stats & Numbers</h3>
              {(['shoots', 'architects', 'brands', 'years'] as const).map(key => (
                <div key={key} className="grid grid-cols-3 gap-3">
                  <Field label={`${key.charAt(0).toUpperCase() + key.slice(1)} — Number`}>
                    <Input
                      value={String(content.stats[key].value)}
                      onChange={v => update({ stats: { ...content.stats, [key]: { ...content.stats[key], value: parseInt(v) || 0 } } })}
                      type="number"
                    />
                  </Field>
                  <Field label="Suffix">
                    <Input
                      value={content.stats[key].suffix}
                      onChange={v => update({ stats: { ...content.stats, [key]: { ...content.stats[key], suffix: v } } })}
                      placeholder="+"
                    />
                  </Field>
                  <Field label="Label">
                    <Input
                      value={content.stats[key].label}
                      onChange={v => update({ stats: { ...content.stats, [key]: { ...content.stats[key], label: v } } })}
                      placeholder="Shoots Delivered"
                    />
                  </Field>
                </div>
              ))}
            </div>
          )}

          {section === 'partners' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-ivory font-medium">Partner Brands Marquee</h3>
                <Btn size="sm" variant="ghost" onClick={() => update({ partners: [...content.partners, 'New Brand'] })}>
                  <Plus size={13} /> Add Brand
                </Btn>
              </div>
              <div className="flex flex-col gap-2">
                {content.partners.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={p} onChange={v => {
                      const updated = [...content.partners];
                      updated[i] = v;
                      update({ partners: updated });
                    }} placeholder="Brand name" />
                    <button onClick={() => update({ partners: content.partners.filter((_, j) => j !== i) })}
                      className="p-2 text-stone hover:text-red-400 transition-colors shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <Field label="Section Eyebrow">
                <Input value={content.socialProofEyebrow} onChange={v => update({ socialProofEyebrow: v })} />
              </Field>
              <Field label="Section Headline">
                <Input value={content.socialProofHeadline} onChange={v => update({ socialProofHeadline: v })} />
              </Field>
            </div>
          )}

          {section === 'faq' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-ivory font-medium">Frequently Asked Questions</h3>
                <Btn size="sm" variant="ghost" onClick={() => update({ faq: [...content.faq, { q: '', a: '' }] })}>
                  <Plus size={13} /> Add Question
                </Btn>
              </div>
              <div className="flex flex-col gap-4">
                {content.faq.map((item, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <p className="text-stone text-xs uppercase tracking-wider">Q {i + 1}</p>
                      <button onClick={() => update({ faq: content.faq.filter((_, j) => j !== i) })}
                        className="text-stone hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Input value={item.q} onChange={v => {
                        const updated = [...content.faq];
                        updated[i] = { ...item, q: v };
                        update({ faq: updated });
                      }} placeholder="Question?" />
                      <Textarea value={item.a} onChange={v => {
                        const updated = [...content.faq];
                        updated[i] = { ...item, a: v };
                        update({ faq: updated });
                      }} placeholder="Answer…" rows={2} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {section === 'packages' && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-ivory font-medium">Pricing Packages</h3>
                <Btn size="sm" variant="ghost" onClick={() => update({
                  packages: [...content.packages, { title: 'New Package', price: '₹0', priceNote: '', tag: '', summary: '', features: ['Feature 1'], cta: 'Book Now', highlight: false }]
                })}>
                  <Plus size={13} /> Add Package
                </Btn>
              </div>
              {content.packages.map((pkg, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-stone text-xs uppercase tracking-wider">Package {i + 1}</p>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-stone cursor-pointer">
                        <input type="checkbox" checked={pkg.highlight} onChange={e => {
                          const updated = [...content.packages];
                          updated[i] = { ...pkg, highlight: e.target.checked };
                          update({ packages: updated });
                        }} className="accent-accent" />
                        Highlight
                      </label>
                      <button onClick={() => update({ packages: content.packages.filter((_, j) => j !== i) })}
                        className="text-stone hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Title">
                      <Input value={pkg.title} onChange={v => {
                        const updated = [...content.packages]; updated[i] = { ...pkg, title: v }; update({ packages: updated });
                      }} />
                    </Field>
                    <Field label="Tag (e.g. Most Popular)">
                      <Input value={pkg.tag} onChange={v => {
                        const updated = [...content.packages]; updated[i] = { ...pkg, tag: v }; update({ packages: updated });
                      }} placeholder="Optional tag" />
                    </Field>
                    <Field label="Price">
                      <Input value={pkg.price} onChange={v => {
                        const updated = [...content.packages]; updated[i] = { ...pkg, price: v }; update({ packages: updated });
                      }} placeholder="₹95,000" />
                    </Field>
                    <Field label="Price Note">
                      <Input value={pkg.priceNote} onChange={v => {
                        const updated = [...content.packages]; updated[i] = { ...pkg, priceNote: v }; update({ packages: updated });
                      }} placeholder="full-day shoot" />
                    </Field>
                    <Field label="Summary">
                      <Textarea value={pkg.summary} onChange={v => {
                        const updated = [...content.packages]; updated[i] = { ...pkg, summary: v }; update({ packages: updated });
                      }} rows={2} />
                    </Field>
                    <Field label="CTA Button Text">
                      <Input value={pkg.cta} onChange={v => {
                        const updated = [...content.packages]; updated[i] = { ...pkg, cta: v }; update({ packages: updated });
                      }} />
                    </Field>
                  </div>
                  <Field label="Features (one per line)">
                    <Textarea
                      value={pkg.features.join('\n')}
                      onChange={v => {
                        const updated = [...content.packages];
                        updated[i] = { ...pkg, features: v.split('\n').filter(Boolean) };
                        update({ packages: updated });
                      }}
                      rows={4}
                      placeholder={"Feature 1\nFeature 2\nFeature 3"}
                    />
                  </Field>
                </Card>
              ))}
            </div>
          )}

          {section === 'contact' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-ivory font-medium">Contact Section</h3>
              <Field label="Headline">
                <Input value={content.contactHeadline} onChange={v => update({ contactHeadline: v })} />
              </Field>
              <Field label="Subheadline">
                <Textarea value={content.contactSubheadline} onChange={v => update({ contactSubheadline: v })} rows={2} />
              </Field>
            </div>
          )}

          {section === 'footer' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-ivory font-medium">Footer</h3>
              <Field label="Tagline">
                <Textarea value={content.footerTagline} onChange={v => update({ footerTagline: v })} rows={2} />
              </Field>
              <Field label="Phone Number">
                <Input value={content.footerPhone} onChange={v => update({ footerPhone: v })} placeholder="+91 98765 43210" />
              </Field>
              <Field label="Email Address">
                <Input value={content.footerEmail} onChange={v => update({ footerEmail: v })} placeholder="hello@capturecrew.in" />
              </Field>
              <Field label="Cities / Locations" hint="Use · as separator">
                <Input value={content.footerCities} onChange={v => update({ footerCities: v })} placeholder="Mumbai · Delhi · London" />
              </Field>
            </div>
          )}

          {section === 'social' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-ivory font-medium">Social Dock Links</h3>
              <p className="text-stone text-sm">
                These links power the floating social dock visible on all public pages. Leave a field blank to hide that button.
              </p>
              {SOCIAL_FIELDS.map(({ key, label, placeholder, hint }) => (
                <Field key={key} label={label} hint={hint}>
                  <Input
                    value={content.socialDock[key] ?? ''}
                    onChange={v => update({ socialDock: { ...content.socialDock, [key]: v } })}
                    placeholder={placeholder}
                  />
                </Field>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsPanel({ onLogout }: { onLogout: () => void }) {
  const user = getAdminUser();

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <Card className="p-5">
        <h3 className="text-ivory font-medium mb-2">Session</h3>
        {user && (
          <p className="text-stone text-sm mb-1">
            Signed in as <span className="text-ivory">{user.email}</span>
          </p>
        )}
        <p className="text-stone text-sm mb-4">Your session lasts until you close the browser tab or sign out.</p>
        <Btn variant="ghost" onClick={onLogout}><LogOut size={14} /> Sign Out</Btn>
      </Card>
    </div>
  );
}

// ─── Admin Shell ──────────────────────────────────────────────────────────────

const NAV_ITEMS: Array<{ id: Panel; label: string; icon: React.ElementType }> = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'media',        label: 'Media',        icon: ImageUp },
  { id: 'categories',   label: 'Categories',   icon: FolderOpen },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'leads',        label: 'Leads',        icon: Inbox },
  { id: 'content',      label: 'Site Content', icon: Type },
];

const VALID_PANELS = new Set<Panel>(['dashboard', 'media', 'categories', 'testimonials', 'leads', 'content', 'settings']);

function getPanelFromHash(): Panel {
  const hash = window.location.hash.slice(1) as Panel;
  return VALID_PANELS.has(hash) ? hash : 'dashboard';
}

export function AdminShell() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [panel, setPanel] = useState<Panel>(getPanelFromHash);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!loggedIn) {
    return <LoginGate onLogin={() => setLoggedIn(true)} />;
  }

  function handleLogout() {
    clearSession();
    setLoggedIn(false);
  }

  function navigatePanel(p: Panel) {
    window.history.replaceState(null, '', `/admin#${p}`);
    setPanel(p);
    setMobileOpen(false);
  }

  const PANEL_TITLES: Record<Panel, string> = {
    dashboard:    'Dashboard',
    media:        'Media Library',
    categories:   'Categories',
    testimonials: 'Testimonials',
    leads:        'Leads Inbox',
    content:      'Site Content',
    settings:     'Settings',
  };

  return (
    <div className="min-h-screen bg-bg flex" style={{ paddingTop: 0 }}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-56 bg-surface border-r border-line flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="px-5 py-5 border-b border-line">
          <p className="font-medium text-sm" style={{ fontFamily: "'Cormorant Garant', serif", fontSize: '1.1rem', color: 'var(--accent)' }}>
            Capture Crew
          </p>
          <p className="text-stone text-xs uppercase tracking-widest mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => navigatePanel(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors w-full text-left ${panel === item.id ? 'bg-accent/10 text-accent' : 'text-stone hover:text-ivory hover:bg-surface-2'}`}>
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-line flex flex-col gap-0.5">
          <button onClick={() => navigatePanel('settings')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors w-full text-left ${panel === 'settings' ? 'bg-accent/10 text-accent' : 'text-stone hover:text-ivory hover:bg-surface-2'}`}>
            <Lock size={16} /> Settings
          </button>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone hover:text-ivory hover:bg-surface-2 transition-colors w-full text-left">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-line px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-1.5 text-stone hover:text-ivory transition-colors">
              <Grid size={18} />
            </button>
            <div>
              <h1 className="text-ivory font-medium text-base">{PANEL_TITLES[panel]}</h1>
            </div>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-stone hover:text-ivory transition-colors border border-line rounded-lg px-3 py-1.5">
            <Eye size={13} /> Preview Site
          </a>
        </header>

        {/* Panel content */}
        <main className="flex-1 p-5 lg:p-6">
          {panel === 'dashboard' && <Dashboard setPanel={navigatePanel} />}
          {panel === 'media' && <MediaPanel />}
          {panel === 'categories' && <CategoriesPanel />}
          {panel === 'testimonials' && <TestimonialsPanel />}
          {panel === 'leads' && <LeadsPanel />}
          {panel === 'content' && <ContentPanel />}
          {panel === 'settings' && <SettingsPanel onLogout={handleLogout} />}
        </main>
      </div>
    </div>
  );
}
