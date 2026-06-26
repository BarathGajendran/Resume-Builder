import React, { useState, useRef } from 'react';
import {
  Plus, Trash2, Download, ChevronDown, ChevronUp,
  X, Github, Linkedin, Globe, Mail, Phone, MapPin,
  Award, Briefcase, BookOpen, Code2, Heart, Eye, EyeOff
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────── */
interface Experience   { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
interface Internship   { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
interface Education    { id: string; school: string; degree: string; field: string; year: string; }
interface Project      { id: string; name: string; description: string; tech: string[]; url: string; startDate: string; endDate: string; }
interface Certification{ id: string; name: string; issuer: string; year: string; credentialId: string; }
interface Language     { id: string; language: string; proficiency: string; }
interface Volunteer    { id: string; organization: string; role: string; startDate: string; endDate: string; description: string; }

interface ResumeData {
  personalInfo: { name: string; title: string; email: string; phone: string; location: string; website: string; linkedin: string; github: string; };
  summary: string;
  experience: Experience[];
  internships: Internship[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  volunteer: Volunteer[];
  skills: string[];
}

/* ─── Initial Data ───────────────────────────────────────── */
const initial: ResumeData = {
  personalInfo: { name: 'Alex Morgan', title: 'Senior Software Engineer', email: 'alex.morgan@example.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA', website: 'alexmorgan.dev', linkedin: 'linkedin.com/in/alexmorgan', github: 'github.com/alexmorgan' },
  summary: 'Craft-driven software engineer with 8+ years of experience building elegant, scalable systems. Specialized in frontend architecture and polished user interfaces. Passionate about bridging the gap between rigorous engineering and thoughtful design.',
  experience: [
    { id: '1', company: 'Stripe', role: 'Senior Frontend Engineer', startDate: '2020', endDate: 'Present', bullets: ['Led frontend architecture for the new Billing dashboard, improving load times by 35%.', 'Implemented a suite of highly accessible, fluidly animated components.', 'Mentored 4 mid-level engineers, fostering a culture of craftsmanship and rigorous code reviews.'] },
    { id: '2', company: 'Vercel', role: 'Software Engineer', startDate: '2017', endDate: '2020', bullets: ['Developed core features for the deployment dashboard, focusing on real-time log streaming.', 'Optimized core web vitals of the marketing site, achieving perfect Lighthouse scores.', 'Reduced new-hire onboarding time by 20% through comprehensive technical documentation.'] },
  ],
  internships: [
    { id: '1', company: 'Figma', role: 'Frontend Engineering Intern', startDate: 'Summer 2016', endDate: '', bullets: ['Built prototype tooling for the collaboration feature used in beta testing.', 'Contributed to the real-time cursor sharing feature shipped in Q4 2016.'] },
  ],
  education: [{ id: '1', school: 'Stanford University', degree: 'B.S.', field: 'Computer Science', year: '2017' }],
  projects: [
    { id: '1', name: 'Cartographer UI', description: 'Open-source canvas library for React with real-time collaboration, shape primitives, and a plugin API. Powers 3 production applications.', tech: ['React', 'TypeScript', 'WebSockets', 'Canvas API'], url: 'github.com/alexmorgan/cartographer', startDate: '2022', endDate: 'Present' },
    { id: '2', name: 'Palette AI', description: 'Generative design tool that extracts color palettes from natural language descriptions using GPT-4 and outputs production-ready CSS tokens.', tech: ['Next.js', 'OpenAI API', 'Tailwind CSS'], url: 'paletteai.dev', startDate: '2023', endDate: '2023' },
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2023', credentialId: 'AWS-SAA-C03' },
    { id: '2', name: 'Professional Scrum Master I', issuer: 'Scrum.org', year: '2021', credentialId: 'PSM-I' },
  ],
  languages: [
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Fluent' },
    { id: '3', language: 'French', proficiency: 'Conversational' },
  ],
  volunteer: [
    { id: '1', organization: 'Code for America', role: 'Volunteer Engineer', startDate: '2021', endDate: 'Present', description: 'Build and maintain civic tech tools that help local governments deliver better digital services to residents.' },
  ],
  skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS', 'Framer Motion', 'System Architecture', 'Web Performance'],
};

/* ─── Shared styles ──────────────────────────────────────── */
const inp = 'w-full bg-transparent border border-[#e8e4de] rounded-sm focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/20 py-2.5 px-3 text-[13px] outline-none transition-all text-[#333] placeholder:text-[#ccc]';
const lbl = 'text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold block mb-1.5';
const addBtn = 'text-[11px] flex items-center gap-1.5 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold';

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[#e8e4de] to-transparent" />;
}

/* ─── Tag Input ──────────────────────────────────────────── */
function TagInput({ tags, onChange, placeholder = 'Type and press Enter…' }: { tags: string[]; onChange: (t: string[]) => void; placeholder?: string }) {
  const [val, setVal] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const commit = () => { const t = val.trim(); if (t && !tags.includes(t)) onChange([...tags, t]); setVal(''); };
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit(); }
    else if (e.key === 'Backspace' && val === '' && tags.length > 0) onChange(tags.slice(0, -1));
  };
  return (
    <div className="border border-[#e8e4de] rounded-sm p-3 focus-within:border-[#c5a059] transition-all" onClick={() => ref.current?.focus()}>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 bg-[#f5f2ec] border border-[#e0dbd2] text-[#444] text-[11px] tracking-wide px-2.5 py-1 font-medium rounded-sm">
            {t}<button onClick={() => onChange(tags.filter((_, j) => j !== i))} className="text-[#bbb] hover:text-red-400 transition-colors"><X size={10} /></button>
          </span>
        ))}
        <input ref={ref} className="flex-1 min-w-[140px] bg-transparent text-[13px] outline-none text-[#333] placeholder:text-[#ccc]" value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey} onBlur={commit} placeholder={tags.length ? 'Add more…' : placeholder} />
      </div>
      <p className="text-[10px] text-[#ccc]">Enter or comma to add · Backspace to remove last</p>
    </div>
  );
}

/* ─── Bullet Manager ─────────────────────────────────────── */
function BulletManager({ bullets, onChange }: { bullets: string[]; onChange: (b: string[]) => void }) {
  const add = () => onChange([...bullets, '']);
  const upd = (i: number, v: string) => { const n = [...bullets]; n[i] = v; onChange(n); };
  const del = (i: number) => onChange(bullets.filter((_, j) => j !== i));
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className={lbl}>Highlights</label>
        <button onClick={add} className={addBtn}><Plus size={11} /> Add bullet</button>
      </div>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex items-center gap-2 group">
            <span className="text-[#c5a059] shrink-0">·</span>
            <input className={`${inp} flex-1`} value={b} onChange={e => upd(i, e.target.value)} placeholder="Describe an achievement or responsibility…" />
            <button onClick={() => del(i)} className="shrink-0 text-[#ddd] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"><X size={13} /></button>
          </div>
        ))}
        {bullets.length === 0 && <p className="text-[11px] text-[#ccc] italic">Click "Add bullet" to begin.</p>}
      </div>
    </div>
  );
}

/* ─── Collapsible Section Card ───────────────────────────── */
function SectionCard({ title: heading, subtitle, onRemove, children }: { title: string; subtitle?: string; onRemove: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-[#e8e4de] rounded-sm bg-white overflow-hidden transition-all hover:border-[#d8d3cb]">
      <div className="flex items-center justify-between px-5 py-4 cursor-pointer bg-[#faf9f7]" onClick={() => setOpen(o => !o)}>
        <div>
          <span className="font-medium text-[13.5px] text-[#1a1a1a]">{heading || 'Untitled'}</span>
          {subtitle && <span className="ml-3 text-[12px] text-[#999]">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={e => { e.stopPropagation(); onRemove(); }} className="text-[#ccc] hover:text-red-400 transition-colors p-1 rounded"><Trash2 size={14} /></button>
          {open ? <ChevronUp size={15} className="text-[#aaa]" /> : <ChevronDown size={15} className="text-[#aaa]" />}
        </div>
      </div>
      {open && <div className="px-5 py-5 space-y-5 border-t border-[#f0ede8]">{children}</div>}
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────── */
function SectionHead({ icon, title, onAdd, addLabel }: { icon: React.ReactNode; title: string; onAdd: () => void; addLabel: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="text-[#c5a059]">{icon}</span>
        <h2 className="font-serif-display text-[20px] text-[#1a1a1a]">{title}</h2>
      </div>
      <button onClick={onAdd} className={addBtn}><Plus size={13} /> {addLabel}</button>
    </div>
  );
}

/* ─── Preview ────────────────────────────────────────────── */
function ResumePreview({ data }: { data: ResumeData }) {
  const p = data.personalInfo;
  return (
    <div className="max-w-[820px] mx-auto bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] font-serif-body text-[#222]">
      {/* Header */}
      <header className="px-14 pt-14 pb-10 text-center border-b border-[#f0eee9] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
        <h1 className="font-serif-display text-[42px] text-[#111] tracking-wide mt-4 leading-tight">{p.name || 'Your Name'}</h1>
        <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#888] mt-2 mb-6">{p.title || 'Professional Title'}</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10px] font-sans text-[#666]">
          {p.location  && <span className="flex items-center gap-1.5"><MapPin   size={9} className="text-[#c5a059]" />{p.location}</span>}
          {p.phone     && <span className="flex items-center gap-1.5"><Phone    size={9} className="text-[#c5a059]" />{p.phone}</span>}
          {p.email     && <span className="flex items-center gap-1.5"><Mail     size={9} className="text-[#c5a059]" />{p.email}</span>}
          {p.website   && <span className="flex items-center gap-1.5"><Globe    size={9} className="text-[#c5a059]" />{p.website}</span>}
          {p.linkedin  && <span className="flex items-center gap-1.5"><Linkedin size={9} className="text-[#c5a059]" />{p.linkedin}</span>}
          {p.github    && <span className="flex items-center gap-1.5"><Github   size={9} className="text-[#c5a059]" />{p.github}</span>}
        </div>
      </header>

      <div className="px-14 py-10 space-y-10 text-[13px] leading-[1.8]">
        {/* Summary */}
        {data.summary && (
          <section>
            <PH title="Profile" />
            <p className="text-[#444] text-justify">{data.summary}</p>
          </section>
        )}

        {/* Skills */}
        {data.skills.filter(s => s.trim()).length > 0 && (
          <section>
            <PH title="Expertise" />
            <div className="flex flex-wrap gap-2">
              {data.skills.filter(s => s.trim()).map((s, i) => (
                <span key={i} className="border border-[#e0dbd2] text-[#555] text-[10.5px] tracking-wide px-2.5 py-1 font-sans">{s.trim()}</span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <PH title="Experience" />
            <div className="space-y-8">
              {data.experience.map(e => <ExpPreview key={e.id} item={e} />)}
            </div>
          </section>
        )}

        {/* Internships */}
        {data.internships.length > 0 && (
          <section>
            <PH title="Internships" />
            <div className="space-y-8">
              {data.internships.map(e => <ExpPreview key={e.id} item={e} />)}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <PH title="Projects" />
            <div className="space-y-7">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-serif-display text-[16px] text-[#111]">{proj.name}</h3>
                    <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] ml-4 shrink-0">{proj.startDate}{proj.startDate && proj.endDate ? ' — ' : ''}{proj.endDate}</span>
                  </div>
                  {proj.url && <div className="text-[#c5a059] text-[10px] tracking-wide font-sans mb-2">{proj.url}</div>}
                  {proj.description && <p className="text-[#444] text-justify mb-3">{proj.description}</p>}
                  {proj.tech.filter(t => t.trim()).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.filter(t => t.trim()).map((t, i) => <span key={i} className="border border-[#e8e4dd] text-[#666] text-[9.5px] tracking-wide px-2 py-0.5 font-sans">{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <PH title="Education" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.education.map(e => (
                <div key={e.id}>
                  <h3 className="font-serif-display text-[16px] text-[#111]">{e.school}</h3>
                  <div className="text-[#444] mt-0.5">{e.degree} {e.field}</div>
                  <div className="text-[#c5a059] text-[10px] tracking-widest uppercase font-sans mt-1">{e.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section>
            <PH title="Certifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.certifications.map(c => (
                <div key={c.id} className="border-l-2 border-[#e8e4de] pl-4">
                  <div className="font-medium text-[#1a1a1a]">{c.name}</div>
                  <div className="text-[#888] text-[12px]">{c.issuer}</div>
                  <div className="text-[#c5a059] text-[10px] tracking-widest uppercase font-sans mt-1">{c.year}{c.credentialId ? ` · ${c.credentialId}` : ''}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section>
            <PH title="Languages" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.languages.map(l => (
                <div key={l.id} className="border border-[#f0ede8] p-3 text-center">
                  <div className="font-medium text-[#1a1a1a] text-[13.5px]">{l.language}</div>
                  <div className="text-[#888] text-[10.5px] font-sans mt-0.5">{l.proficiency}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Volunteer */}
        {data.volunteer.length > 0 && (
          <section>
            <PH title="Volunteer" />
            <div className="space-y-6">
              {data.volunteer.map(v => (
                <div key={v.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-serif-display text-[16px] text-[#111]">{v.role}</h3>
                    <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] ml-4 shrink-0">{v.startDate}{v.startDate && v.endDate ? ' — ' : ''}{v.endDate}</span>
                  </div>
                  <div className="text-[#c5a059] text-[10px] tracking-[0.15em] uppercase font-sans mb-2">{v.organization}</div>
                  {v.description && <p className="text-[#444] text-justify">{v.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function PH({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h2 className="font-serif-display italic text-[18px] text-[#111] shrink-0">{title}</h2>
      <div className="flex-1 h-px bg-[#f0eee9]" />
    </div>
  );
}

function ExpPreview({ item }: { item: Experience | Internship }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-0.5">
        <h3 className="font-serif-display text-[16px] text-[#111]">{item.role}</h3>
        <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] ml-4 shrink-0">{item.startDate}{item.startDate && item.endDate ? ' — ' : ''}{item.endDate}</span>
      </div>
      <div className="text-[#c5a059] text-[10px] tracking-[0.15em] uppercase font-sans mb-3">{item.company}</div>
      {item.bullets.filter(b => b.trim()).length > 0 && (
        <ul className="space-y-2">
          {item.bullets.filter(b => b.trim()).map((b, i) => (
            <li key={i} className="flex items-start text-[#444]">
              <span className="text-[#c5a059] mr-2.5 mt-0.5 text-lg leading-none shrink-0">·</span>
              <span className="text-justify">{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export function Elegance() {
  const [data, setData] = useState<ResumeData>(initial);
  const [preview, setPreview] = useState(false);

  const updP = (f: string, v: string) => setData(d => ({ ...d, personalInfo: { ...d.personalInfo, [f]: v } }));

  function makeList<T extends { id: string }>(key: keyof ResumeData, blank: Omit<T, 'id'>) {
    return {
      add:    () => setData(d => ({ ...d, [key]: [...(d[key] as unknown as T[]), { id: Date.now().toString(), ...blank } as T] })),
      upd:    (id: string, f: string, v: unknown) => setData(d => ({ ...d, [key]: (d[key] as unknown as T[]).map(it => it.id === id ? { ...it, [f]: v } : it) })),
      remove: (id: string) => setData(d => ({ ...d, [key]: (d[key] as unknown as T[]).filter(it => it.id !== id) })),
    };
  }

  const exp  = makeList<Experience>('experience',      { company: '', role: '', startDate: '', endDate: '', bullets: [] });
  const int_ = makeList<Internship>('internships',     { company: '', role: '', startDate: '', endDate: '', bullets: [] });
  const edu  = makeList<Education>('education',        { school: '', degree: '', field: '', year: '' });
  const proj = makeList<Project>('projects',           { name: '', description: '', tech: [], url: '', startDate: '', endDate: '' });
  const cert = makeList<Certification>('certifications',{ name: '', issuer: '', year: '', credentialId: '' });
  const lang = makeList<Language>('languages',         { language: '', proficiency: 'Conversational' });
  const vol  = makeList<Volunteer>('volunteer',        { organization: '', role: '', startDate: '', endDate: '', description: '' });

  return (
    <div className="min-h-screen bg-[#f2efea] font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-serif-body    { font-family: 'Lora', serif; }
        .cscroll::-webkit-scrollbar { width: 5px; }
        .cscroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
      `}} />

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#e8e4de] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif-display text-[22px] text-[#1a1a1a] leading-none">Elegance</h1>
            <p className="text-[9.5px] tracking-[0.18em] uppercase text-[#999] font-semibold mt-0.5">Document Builder</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreview(p => !p)}
              className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold tracking-wider uppercase border transition-colors ${preview ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' : 'border-[#ddd] text-[#555] hover:border-[#bbb]'}`}
            >
              {preview ? <><EyeOff size={13} /> Edit</> : <><Eye size={13} /> Preview</>}
            </button>
            <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 text-[11px] font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors">
              <Download size={13} /> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Preview mode ── */}
      {preview ? (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <ResumePreview data={data} />
        </div>
      ) : (

      /* ── Edit mode ── */
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Personal Details */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <h2 className="font-serif-display text-[20px] text-[#1a1a1a] mb-6">Personal Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
            {([
              ['name',     'Full Name',           'Jane Doe'],
              ['title',    'Professional Title',   'Senior Designer'],
              ['email',    'Email Address',        'jane@example.com'],
              ['phone',    'Phone Number',         '+1 234 567 890'],
              ['location', 'Location',             'New York, NY'],
              ['website',  'Website / Portfolio',  'janedoe.com'],
              ['linkedin', 'LinkedIn',             'linkedin.com/in/jane'],
              ['github',   'GitHub',               'github.com/jane'],
            ] as [string, string, string][]).map(([f, label, ph]) => (
              <div key={f}>
                <label className={lbl}>{label}</label>
                <input className={inp} placeholder={ph} value={(data.personalInfo as Record<string,string>)[f]} onChange={e => updP(f, e.target.value)} />
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Professional Summary */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <h2 className="font-serif-display text-[20px] text-[#1a1a1a] mb-5">Professional Summary</h2>
          <label className={lbl}>Profile</label>
          <textarea
            className={`${inp} min-h-[110px] resize-y leading-[1.65]`}
            value={data.summary}
            onChange={e => setData(d => ({ ...d, summary: e.target.value }))}
            placeholder="A brief overview of your professional background and goals…"
          />
        </section>

        <Divider />

        {/* Experience */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <SectionHead icon={<Briefcase size={17} />} title="Experience" onAdd={exp.add} addLabel="Add Role" />
          <div className="mt-6 space-y-4">
            {data.experience.length === 0 && <EmptyNote label="experience" />}
            {data.experience.map(it => (
              <SectionCard key={it.id} title={it.role || 'New Role'} subtitle={it.company} onRemove={() => exp.remove(it.id)}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
                  <div className="md:col-span-2"><label className={lbl}>Company</label><input className={inp} value={it.company} onChange={e => exp.upd(it.id,'company',e.target.value)} /></div>
                  <div className="md:col-span-2"><label className={lbl}>Role / Position</label><input className={inp} value={it.role} onChange={e => exp.upd(it.id,'role',e.target.value)} /></div>
                  <div><label className={lbl}>Start Date</label><input className={inp} placeholder="e.g. 2020" value={it.startDate} onChange={e => exp.upd(it.id,'startDate',e.target.value)} /></div>
                  <div><label className={lbl}>End Date</label><input className={inp} placeholder="e.g. Present" value={it.endDate} onChange={e => exp.upd(it.id,'endDate',e.target.value)} /></div>
                </div>
                <BulletManager bullets={it.bullets} onChange={v => exp.upd(it.id,'bullets',v)} />
              </SectionCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* Internships */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <SectionHead icon={<BookOpen size={17} />} title="Internships" onAdd={int_.add} addLabel="Add Internship" />
          <div className="mt-6 space-y-4">
            {data.internships.length === 0 && <EmptyNote label="internships" />}
            {data.internships.map(it => (
              <SectionCard key={it.id} title={it.role || 'New Internship'} subtitle={it.company} onRemove={() => int_.remove(it.id)}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
                  <div className="md:col-span-2"><label className={lbl}>Company</label><input className={inp} value={it.company} onChange={e => int_.upd(it.id,'company',e.target.value)} /></div>
                  <div className="md:col-span-2"><label className={lbl}>Role / Position</label><input className={inp} value={it.role} onChange={e => int_.upd(it.id,'role',e.target.value)} /></div>
                  <div><label className={lbl}>Start Date</label><input className={inp} placeholder="e.g. Summer 2022" value={it.startDate} onChange={e => int_.upd(it.id,'startDate',e.target.value)} /></div>
                  <div><label className={lbl}>End Date</label><input className={inp} placeholder="e.g. Fall 2022" value={it.endDate} onChange={e => int_.upd(it.id,'endDate',e.target.value)} /></div>
                </div>
                <BulletManager bullets={it.bullets} onChange={v => int_.upd(it.id,'bullets',v)} />
              </SectionCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* Projects */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <SectionHead icon={<Code2 size={17} />} title="Projects" onAdd={proj.add} addLabel="Add Project" />
          <div className="mt-6 space-y-4">
            {data.projects.length === 0 && <EmptyNote label="projects" />}
            {data.projects.map(it => (
              <SectionCard key={it.id} title={it.name || 'New Project'} subtitle={it.tech.slice(0,3).join(', ')} onRemove={() => proj.remove(it.id)}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
                  <div className="md:col-span-2"><label className={lbl}>Project Name</label><input className={inp} value={it.name} onChange={e => proj.upd(it.id,'name',e.target.value)} /></div>
                  <div><label className={lbl}>Start Date</label><input className={inp} placeholder="e.g. 2022" value={it.startDate} onChange={e => proj.upd(it.id,'startDate',e.target.value)} /></div>
                  <div><label className={lbl}>End Date</label><input className={inp} placeholder="e.g. Present" value={it.endDate} onChange={e => proj.upd(it.id,'endDate',e.target.value)} /></div>
                  <div className="col-span-2 md:col-span-4"><label className={lbl}>URL / Link</label><input className={inp} placeholder="github.com/user/project" value={it.url} onChange={e => proj.upd(it.id,'url',e.target.value)} /></div>
                  <div className="col-span-2 md:col-span-4">
                    <label className={lbl}>Description</label>
                    <textarea className={`${inp} min-h-[80px] resize-y leading-[1.65]`} value={it.description} onChange={e => proj.upd(it.id,'description',e.target.value)} placeholder="What does this project do and why does it matter?" />
                  </div>
                  <div className="col-span-2 md:col-span-4">
                    <label className={lbl}>Tech Stack</label>
                    <TagInput tags={it.tech} onChange={v => proj.upd(it.id,'tech',v)} placeholder="e.g. React, Node.js…" />
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* Education */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <SectionHead icon={<BookOpen size={17} />} title="Education" onAdd={edu.add} addLabel="Add School" />
          <div className="mt-6 space-y-4">
            {data.education.length === 0 && <EmptyNote label="education" />}
            {data.education.map(it => (
              <SectionCard key={it.id} title={it.school || 'New School'} subtitle={`${it.degree} ${it.field}`} onRemove={() => edu.remove(it.id)}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
                  <div className="col-span-2 md:col-span-4"><label className={lbl}>School / Institution</label><input className={inp} value={it.school} onChange={e => edu.upd(it.id,'school',e.target.value)} /></div>
                  <div className="md:col-span-2"><label className={lbl}>Degree (e.g. B.S.)</label><input className={inp} value={it.degree} onChange={e => edu.upd(it.id,'degree',e.target.value)} /></div>
                  <div className="md:col-span-2"><label className={lbl}>Field of Study</label><input className={inp} value={it.field} onChange={e => edu.upd(it.id,'field',e.target.value)} /></div>
                  <div><label className={lbl}>Graduation Year</label><input className={inp} placeholder="e.g. 2017" value={it.year} onChange={e => edu.upd(it.id,'year',e.target.value)} /></div>
                </div>
              </SectionCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* Certifications */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <SectionHead icon={<Award size={17} />} title="Certifications" onAdd={cert.add} addLabel="Add Certification" />
          <div className="mt-6 space-y-4">
            {data.certifications.length === 0 && <EmptyNote label="certifications" />}
            {data.certifications.map(it => (
              <SectionCard key={it.id} title={it.name || 'New Certification'} subtitle={it.issuer} onRemove={() => cert.remove(it.id)}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
                  <div className="col-span-2 md:col-span-4"><label className={lbl}>Certification Name</label><input className={inp} value={it.name} onChange={e => cert.upd(it.id,'name',e.target.value)} /></div>
                  <div className="md:col-span-2"><label className={lbl}>Issuing Organization</label><input className={inp} value={it.issuer} onChange={e => cert.upd(it.id,'issuer',e.target.value)} /></div>
                  <div><label className={lbl}>Year Issued</label><input className={inp} placeholder="e.g. 2023" value={it.year} onChange={e => cert.upd(it.id,'year',e.target.value)} /></div>
                  <div><label className={lbl}>Credential ID</label><input className={inp} placeholder="Optional" value={it.credentialId} onChange={e => cert.upd(it.id,'credentialId',e.target.value)} /></div>
                </div>
              </SectionCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* Languages */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <SectionHead icon={<span className="text-[17px] font-serif-display text-[#c5a059]">Aa</span>} title="Languages" onAdd={lang.add} addLabel="Add Language" />
          <div className="mt-6 space-y-4">
            {data.languages.length === 0 && <EmptyNote label="languages" />}
            {data.languages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.languages.map(it => (
                  <div key={it.id} className="border border-[#e8e4de] rounded-sm p-4 relative group bg-[#faf9f7]">
                    <button onClick={() => lang.remove(it.id)} className="absolute top-2 right-2 text-[#ddd] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={13} /></button>
                    <div className="mb-3">
                      <label className={lbl}>Language</label>
                      <input className={inp} placeholder="e.g. Spanish" value={it.language} onChange={e => lang.upd(it.id,'language',e.target.value)} />
                    </div>
                    <div>
                      <label className={lbl}>Proficiency</label>
                      <select className={`${inp} cursor-pointer bg-white`} value={it.proficiency} onChange={e => lang.upd(it.id,'proficiency',e.target.value)}>
                        {['Native','Fluent','Conversational','Basic'].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Divider />

        {/* Volunteer */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <SectionHead icon={<Heart size={17} />} title="Volunteer" onAdd={vol.add} addLabel="Add Entry" />
          <div className="mt-6 space-y-4">
            {data.volunteer.length === 0 && <EmptyNote label="volunteer work" />}
            {data.volunteer.map(it => (
              <SectionCard key={it.id} title={it.role || 'New Entry'} subtitle={it.organization} onRemove={() => vol.remove(it.id)}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
                  <div className="col-span-2 md:col-span-4"><label className={lbl}>Organization</label><input className={inp} value={it.organization} onChange={e => vol.upd(it.id,'organization',e.target.value)} /></div>
                  <div className="col-span-2 md:col-span-4"><label className={lbl}>Role</label><input className={inp} value={it.role} onChange={e => vol.upd(it.id,'role',e.target.value)} /></div>
                  <div><label className={lbl}>Start Date</label><input className={inp} placeholder="e.g. 2021" value={it.startDate} onChange={e => vol.upd(it.id,'startDate',e.target.value)} /></div>
                  <div><label className={lbl}>End Date</label><input className={inp} placeholder="e.g. Present" value={it.endDate} onChange={e => vol.upd(it.id,'endDate',e.target.value)} /></div>
                  <div className="col-span-2 md:col-span-4">
                    <label className={lbl}>Description</label>
                    <textarea className={`${inp} min-h-[80px] resize-y leading-[1.65]`} value={it.description} onChange={e => vol.upd(it.id,'description',e.target.value)} placeholder="Describe your contribution…" />
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* Expertise & Skills */}
        <section className="bg-white border border-[#e8e4de] rounded-sm p-8">
          <h2 className="font-serif-display text-[20px] text-[#1a1a1a] mb-5">Expertise &amp; Skills</h2>
          <TagInput tags={data.skills} onChange={v => setData(d => ({ ...d, skills: v }))} placeholder="Type a skill and press Enter…" />
        </section>

        <div className="h-8" />
      </div>
      )}
    </div>
  );
}

function EmptyNote({ label }: { label: string }) {
  return <p className="text-[12px] text-[#ccc] italic text-center py-5 border border-dashed border-[#e8e4de] rounded-sm">No {label} added yet</p>;
}
