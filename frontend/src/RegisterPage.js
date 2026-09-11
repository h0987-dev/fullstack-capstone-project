import React, { useState } from 'react';
export default function RegisterPage({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const submit = async e => { e.preventDefault(); const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); if (response.ok) onBack(); };
  return <section className="auth"><button onClick={onBack}>← Back</button><p className="eyebrow">WELCOME TO GIFTLINK</p><h1>Create your account.</h1><form onSubmit={submit}>{Object.keys(form).map(field => <input key={field} required type={field === 'password' ? 'password' : 'text'} placeholder={field} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />)}<button className="dark large">Create account</button></form></section>;
}
