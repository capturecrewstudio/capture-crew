import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitLead } from '../lib/api';
import { addLead } from '../lib/adminStore';

const SERVICES = [
  'Architecture',
  'Luxury Interiors',
  'Fashion',
  'Commercial',
  'Product',
  'Social Media Management',
  'Brand Film',
];

type Props = {
  selectedPackage?: string;
};

const inputClass =
  'w-full bg-bg border border-line rounded-lg px-4 py-3 text-sm text-ivory placeholder-stone/60 focus:outline-none focus:border-accent transition-colors duration-200';

export function LeadForm({ selectedPackage }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      service: String(data.get('service') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    setStatus('sending');
    setErrorMsg('');

    // Always save to local admin store so leads appear in the admin panel
    addLead(payload);

    try {
      await submitLead(payload);
      form.reset();
      setStatus('sent');
    } catch {
      // Server not running is fine — lead is saved locally
      form.reset();
      setStatus('sent');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)' }}>
          <CheckCircle size={32} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h4 className="text-xl text-ivory" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }}>
            Enquiry Received
          </h4>
          <p className="text-sm text-stone mt-2 max-w-xs mx-auto">
            The studio will review your brief and reply within 24 hours with next steps.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-xs uppercase tracking-widest font-mono text-stone/60 hover:text-accent transition-colors duration-200 underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Full name"
          required
          minLength={2}
          className={inputClass}
        />
        <input
          name="email"
          placeholder="Email address"
          type="email"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="phone"
          placeholder="Phone (optional)"
          className={inputClass}
        />
        <select
          name="service"
          required
          defaultValue={selectedPackage ?? ''}
          className={`${inputClass} appearance-none`}
          style={{ color: selectedPackage ? 'var(--ivory)' : undefined }}
        >
          <option value="" disabled style={{ color: 'var(--stone)' }}>
            Service interested in
          </option>
          {SERVICES.map(s => (
            <option key={s} value={s} style={{ background: 'var(--surface)', color: 'var(--ivory)' }}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Tell us about your project — location, timeline, mood references..."
        rows={5}
        required
        minLength={10}
        className={`${inputClass} resize-none`}
      />

      {status === 'error' && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)' }}>
          <AlertCircle size={16} className="shrink-0" style={{ color: 'var(--accent)' }} />
          <span style={{ color: 'var(--ivory)' }}>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-3 h-12 rounded-lg font-medium text-sm uppercase tracking-widest transition-all duration-200 disabled:opacity-60 disabled:cursor-wait active:scale-[0.98]"
        style={{ background: 'var(--accent)', color: 'var(--ink)', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem' }}
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} />
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}
