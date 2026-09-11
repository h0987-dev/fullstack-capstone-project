import React, { useState } from 'react';
export default function LoginPage({ onBack }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const submit = async e => { e.preventDefault(); const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token') || ''}` }, body: JSON.stringify(form) }); if (response.ok) { const data = await response.json(); localStorage.setItem('token', data.token); onBack(); } };
  return <section className="auth"><button onClick={onBack}>← Back</button><p className="eyebrow">GOOD TO SEE YOU</p><h1>Welcome back.</h1><form onSubmit={submit}><input required type="email" placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /><input required type="password" placeholder="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><button className="dark large">Log in</button></form></section>;
}
