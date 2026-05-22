import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { submitLead } from '../lib/api';

export function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    setMessage('');

    try {
      await submitLead({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        service: String(data.get('service') ?? ''),
        message: String(data.get('message') ?? '')
      });
      form.reset();
      setStatus('sent');
      setMessage('Enquiry received. The studio will reply with next steps.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to send enquiry right now.');
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input name="name" placeholder="Name" required minLength={2} />
      <input name="email" placeholder="Email" type="email" required />
      <input name="phone" placeholder="Phone" />
      <select name="service" defaultValue="" required>
        <option value="" disabled>
          Service
        </option>
        <option>Architecture</option>
        <option>Luxury Interiors</option>
        <option>Fashion</option>
        <option>Commercial</option>
        <option>Product</option>
        <option>Food</option>
        <option>Weddings</option>
      </select>
      <textarea name="message" placeholder="Message" rows={5} required minLength={10} />
      <button className="primary-button" type="submit" disabled={status === 'sending'}>
        <Send size={16} />
        {status === 'sending' ? 'Sending' : 'Send Enquiry'}
      </button>
      {message && <p className={status === 'error' ? 'form-message is-error' : 'form-message'}>{message}</p>}
    </form>
  );
}
