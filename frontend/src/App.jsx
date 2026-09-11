import React, { useEffect, useState } from 'react';
import RegisterPage from './RegisterPage.jsx';
import LoginPage from './LoginPage.jsx';

const api = import.meta.env.VITE_API_URL || '';
export default function App() {
  const [gifts, setGifts] = useState([]);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('home');
  useEffect(() => { fetch(`${api}/api/search?q=${encodeURIComponent(query)}`).then(r => r.ok ? r.json() : []).then(setGifts).catch(() => setGifts([])); }, [query]);
  if (view === 'register') return <RegisterPage onBack={() => setView('home')} />;
  if (view === 'login') return <LoginPage onBack={() => setView('home')} />;
  return <main><nav><strong>GiftLink</strong><span>Find thoughtful gifts, made personal.</span><button onClick={() => setView('login')}>Log in</button><button className="dark" onClick={() => setView('register')}>Get started</button></nav><header><p className="eyebrow">THE GIFTING COMMUNITY</p><h1>Give something<br /><em>meaningful.</em></h1><p className="lede">Discover memorable gifts from people who know what makes a moment matter.</p><button className="dark large" onClick={() => document.querySelector('.explore').scrollIntoView({ behavior: 'smooth' })}>Explore gifts ↓</button></header><section className="explore"><div className="section-head"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Find the right feeling.</h2></div><input aria-label="Search gifts" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search gifts..." /></div><div className="grid">{gifts.map(gift => <article key={gift._id}><div className="gift-art">{gift.emoji || '🎁'}</div><p className="eyebrow">{gift.category || 'FOR ANYONE'}</p><h3>{gift.title}</h3><p>{gift.description}</p></article>)}{!gifts.length && <p>No gifts found yet. Start MongoDB and import the sample data.</p>}</div></section></main>;
}
