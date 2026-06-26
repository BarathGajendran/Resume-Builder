import React, { useState, useRef } from 'react';
import {
  Plus, Trash2, Download, ChevronDown, ChevronUp,
  X, Github, Linkedin, Globe, Mail, Phone, MapPin,
  Award, Languages, Briefcase, BookOpen, Code2, Heart
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────── */
interface Experience  { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
interface Internship  { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
interface Education   { id: string; school: string; degree: string; field: string; year: string; }
interface Project     { id: string; name: string; description: string; tech: string[]; url: string; startDate: string; endDate: string; }
interface Certification { id: string; name: string; issuer: string; year: string; credentialId: string; }
interface Language    { id: string; language: string; proficiency: string; }
interface Volunteer   { id: string; organization: string; role: string; startDate: string; endDate: string; description: string; }

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
const initialData: ResumeData = {
  personalInfo: { name: 'Alex Morgan', title: 'Senior Software Engineer', email: 'alex.morgan@example.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA', website: 'alexmorgan.dev', linkedin: 'linkedin.com/in/alexmorgan', github: 'github.com/alexmorgan' },
  summary: 'Craft-driven software engineer with 8+ years of experience building elegant, scalable systems. Specialized in frontend architecture and polished user interfaces. Passionate about bridging the gap between rigorous engineering and thoughtful design.',
  experience: [
    { id: '1', company: 'Stripe', role: 'Senior Frontend Engineer', startDate: '2020', endDate: 'Present', bullets: ['Led the frontend architecture for the new Billing dashboard, improving load times by 35%.', 'Implemented a suite of highly accessible, fluidly animated components.', 'Mentored 4 mid-level engineers, fostering a culture of craftsmanship and rigorous code reviews.'] },
    { id: '2', company: 'Vercel', role: 'Software Engineer', startDate: '2017', endDate: '2020', bullets: ['Developed core features for the deployment dashboard, focusing on real-time log streaming.', 'Optimized core web vitals of the marketing site, achieving perfect Lighthouse scores.', 'Reduced new-hire onboarding time by 20% through comprehensive technical documentation.'] },
  ],
  internships: [
    { id: '1', company: 'Figma', role: 'Frontend Engineering Intern', startDate: 'Summer 2016', endDate: '', bullets: ['Built prototype tooling for the collaboration feature used in beta testing.', 'Contributed to the real-time cursor sharing feature shipped in Q4 2016.'] },
  ],
  education: [{ id: '1', school: 'Stanford University', degree: 'B.S.', field: 'Computer Science', year: '2017' }],
  projects: [
    { id: '1', name: 'Cartographer UI', description: 'An open-source canvas library for React with real-time collaboration, shape primitives, and a plugin API. Powers 3 production applications.', tech: ['React', 'TypeScript', 'WebSockets', 'Canvas API'], url: 'github.com/alexmorgan/cartographer', startDate: '2022', endDate: 'Present' },
    { id: '2', name: 'Palette AI', description: 'A generative design tool that extracts color palettes from natural language descriptions using GPT-4 and outputs production-ready CSS tokens.', tech: ['Next.js', 'OpenAI API', 'Tailwind CSS'], url: 'paletteai.dev', startDate: '2023', endDate: '2023' },
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

/* ─── Shared Classes ─────────────────────────────────────── */
const inputCls = 'w-full bg-transparent border-b border-[#e5e1d8] focus:border-[#c5a059] py-2 px-1 text-[13px] outline-none transition-colors text-[#333] placeholder:text-[#c2c0bb]';
const labelCls = 'text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold block mb-1.5';
const sectionHeadCls = 'text-xl font-serif-display text-[#111] mb-6';
const addBtnCls = 'text-[11px] flex items-center gap-1 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold';

/* ─── Helpers ────────────────────────────────────────────── */
function Divider() { return <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e5e1d8] to-transparent" />; }
function EmptySlot({ label }: { label: string }) {
  return <p className="text-[12px] text-[#c2c0bb] italic text-center py-5 border border-dashed border-[#e5e1d8]">No {label} added yet</p>;
}

/* ─── Collapsible Card Shell ─────────────────────────────── */
function CardShell({ title, subtitle, onRemove, children }: { title: string; subtitle?: string; onRemove: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-[#fdfdfc] border border-[#e5e1d8] p-5 transition-all hover:border-[#d5d1c8]">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(o => !o)}>
        <div>
          <h4 className="font-medium text-[14px] text-[#1a1a1a]">{title || 'Untitled'}</h4>
          {subtitle && <div className="text-[12px] text-[#888] mt-0.5">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={e => { e.stopPropagation(); onRemove(); }} className="text-[#c2c0bb] hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
          {open ? <ChevronUp size={16} className="text-[#a09e98]" /> : <ChevronDown size={16} className="text-[#a09e98]" />}
        </div>
      </div>
      {open && <div className="pt-5 mt-4 border-t border-[#f0eee9] animate-in slide-in-from-top-2 duration-200">{children}</div>}
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
        <label className={labelCls}>Highlights</label>
        <button onClick={add} className={addBtnCls}><Plus size={11} /> Add</button>
      </div>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex items-start gap-2 group">
            <span className="text-[#c5a059] mt-[9px] text-base leading-none shrink-0">·</span>
            <input className={`${inputCls} flex-1`} value={b} onChange={e => upd(i, e.target.value)} placeholder="Describe an achievement…" />
            <button onClick={() => del(i)} className="text-[#d9d6d0] hover:text-red-400 transition-colors mt-2 shrink-0 opacity-0 group-hover:opacity-100"><X size={13} /></button>
          </div>
        ))}
        {bullets.length === 0 && <p className="text-[11px] text-[#c2c0bb] italic py-1">Click Add to begin.</p>}
      </div>
    </div>
  );
}

/* ─── Tag Input (Skills / Tech Stack) ───────────────────── */
function TagInput({ tags, onChange, placeholder = 'Type and press Enter…' }: { tags: string[]; onChange: (t: string[]) => void; placeholder?: string }) {
  const [val, setVal] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const add = () => { const t = val.trim(); if (t && !tags.includes(t)) onChange([...tags, t]); setVal(''); };
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }
    else if (e.key === 'Backspace' && val === '' && tags.length > 0) onChange(tags.slice(0, -1));
  };
  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-[#f5f3ef] border border-[#e5e1d8] text-[#444] text-[11px] tracking-wide px-3 py-1.5 font-medium">
              {t} <button onClick={() => onChange(tags.filter((_, j) => j !== i))} className="text-[#c2c0bb] hover:text-red-400 transition-colors"><X size={11} /></button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center border-b border-[#e5e1d8] focus-within:border-[#c5a059] transition-colors cursor-text" onClick={() => ref.current?.focus()}>
        <input ref={ref} className="flex-1 bg-transparent py-2 px-1 text-[13px] outline-none text-[#333] placeholder:text-[#c2c0bb]" value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey} onBlur={add} placeholder={placeholder} />
        {val.trim() && <button onClick={add} className="text-[#c5a059] text-[10px] font-semibold uppercase tracking-wider px-2 hover:text-[#a38040] transition-colors">Add</button>}
      </div>
      <p className="text-[10px] text-[#c2c0bb] mt-1.5">Enter or comma to add · Backspace to remove last</p>
    </div>
  );
}

/* ─── Section Cards ──────────────────────────────────────── */
function ExpCard({ item, update, remove }: { item: Experience | Internship; update: (f: string, v: string | string[]) => void; remove: () => void }) {
  return (
    <CardShell title={item.role} subtitle={item.company} onRemove={remove}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 mb-5">
        <div><label className={labelCls}>Company</label><input className={inputCls} value={item.company} onChange={e => update('company', e.target.value)} /></div>
        <div><label className={labelCls}>Role / Position</label><input className={inputCls} value={item.role} onChange={e => update('role', e.target.value)} /></div>
        <div><label className={labelCls}>Start Date</label><input className={inputCls} value={item.startDate} onChange={e => update('startDate', e.target.value)} placeholder="e.g. 2020" /></div>
        <div><label className={labelCls}>End Date</label><input className={inputCls} value={item.endDate} onChange={e => update('endDate', e.target.value)} placeholder="e.g. Present" /></div>
      </div>
      <BulletManager bullets={item.bullets} onChange={v => update('bullets', v)} />
    </CardShell>
  );
}

function EduCard({ item, update, remove }: { item: Education; update: (f: string, v: string) => void; remove: () => void }) {
  return (
    <CardShell title={item.school} subtitle={`${item.degree} ${item.field}`} onRemove={remove}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div className="col-span-2"><label className={labelCls}>School / Institution</label><input className={inputCls} value={item.school} onChange={e => update('school', e.target.value)} /></div>
        <div><label className={labelCls}>Degree (e.g. B.S.)</label><input className={inputCls} value={item.degree} onChange={e => update('degree', e.target.value)} /></div>
        <div><label className={labelCls}>Field of Study</label><input className={inputCls} value={item.field} onChange={e => update('field', e.target.value)} /></div>
        <div className="col-span-2"><label className={labelCls}>Graduation Year</label><input className={inputCls} value={item.year} onChange={e => update('year', e.target.value)} placeholder="e.g. 2017" /></div>
      </div>
    </CardShell>
  );
}

function ProjectCard({ item, update, remove }: { item: Project; update: (f: string, v: string | string[]) => void; remove: () => void }) {
  return (
    <CardShell title={item.name} subtitle={item.tech.slice(0, 3).join(', ')} onRemove={remove}>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
          <div className="col-span-2"><label className={labelCls}>Project Name</label><input className={inputCls} value={item.name} onChange={e => update('name', e.target.value)} /></div>
          <div><label className={labelCls}>Start Date</label><input className={inputCls} value={item.startDate} onChange={e => update('startDate', e.target.value)} placeholder="e.g. 2022" /></div>
          <div><label className={labelCls}>End Date</label><input className={inputCls} value={item.endDate} onChange={e => update('endDate', e.target.value)} placeholder="e.g. Present" /></div>
          <div className="col-span-2"><label className={labelCls}>URL / Link</label><input className={inputCls} value={item.url} onChange={e => update('url', e.target.value)} placeholder="github.com/user/project" /></div>
          <div className="col-span-2">
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} min-h-[80px] resize-y leading-[1.65]`} value={item.description} onChange={e => update('description', e.target.value)} placeholder="What does this project do and why does it matter?" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Tech Stack</label>
          <TagInput tags={item.tech} onChange={v => update('tech', v)} placeholder="e.g. React, Node.js…" />
        </div>
      </div>
    </CardShell>
  );
}

function CertCard({ item, update, remove }: { item: Certification; update: (f: string, v: string) => void; remove: () => void }) {
  return (
    <CardShell title={item.name} subtitle={item.issuer} onRemove={remove}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div className="col-span-2"><label className={labelCls}>Certification Name</label><input className={inputCls} value={item.name} onChange={e => update('name', e.target.value)} /></div>
        <div><label className={labelCls}>Issuing Organization</label><input className={inputCls} value={item.issuer} onChange={e => update('issuer', e.target.value)} /></div>
        <div><label className={labelCls}>Year Issued</label><input className={inputCls} value={item.year} onChange={e => update('year', e.target.value)} placeholder="e.g. 2023" /></div>
        <div className="col-span-2"><label className={labelCls}>Credential ID (optional)</label><input className={inputCls} value={item.credentialId} onChange={e => update('credentialId', e.target.value)} placeholder="e.g. AWS-SAA-C03" /></div>
      </div>
    </CardShell>
  );
}

function LangCard({ item, update, remove }: { item: Language; update: (f: string, v: string) => void; remove: () => void }) {
  const levels = ['Native', 'Fluent', 'Conversational', 'Basic'];
  return (
    <CardShell title={item.language} subtitle={item.proficiency} onRemove={remove}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div><label className={labelCls}>Language</label><input className={inputCls} value={item.language} onChange={e => update('language', e.target.value)} placeholder="e.g. Spanish" /></div>
        <div>
          <label className={labelCls}>Proficiency</label>
          <select className={`${inputCls} cursor-pointer`} value={item.proficiency} onChange={e => update('proficiency', e.target.value)}>
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
    </CardShell>
  );
}

function VolCard({ item, update, remove }: { item: Volunteer; update: (f: string, v: string) => void; remove: () => void }) {
  return (
    <CardShell title={item.role} subtitle={item.organization} onRemove={remove}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div className="col-span-2"><label className={labelCls}>Organization</label><input className={inputCls} value={item.organization} onChange={e => update('organization', e.target.value)} /></div>
        <div className="col-span-2"><label className={labelCls}>Role</label><input className={inputCls} value={item.role} onChange={e => update('role', e.target.value)} /></div>
        <div><label className={labelCls}>Start Date</label><input className={inputCls} value={item.startDate} onChange={e => update('startDate', e.target.value)} placeholder="e.g. 2021" /></div>
        <div><label className={labelCls}>End Date</label><input className={inputCls} value={item.endDate} onChange={e => update('endDate', e.target.value)} placeholder="e.g. Present" /></div>
        <div className="col-span-2">
          <label className={labelCls}>Description</label>
          <textarea className={`${inputCls} min-h-[80px] resize-y leading-[1.65]`} value={item.description} onChange={e => update('description', e.target.value)} placeholder="Describe your contribution…" />
        </div>
      </div>
    </CardShell>
  );
}

/* ─── Preview Components ─────────────────────────────────── */
function PHead({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h2 className="font-serif-display italic text-[18px] text-[#111] shrink-0">{title}</h2>
      <div className="flex-1 h-px bg-[#f0eee9]" />
    </div>
  );
}
function SHead({ title }: { title: string }) {
  return (
    <div className="mb-3">
      <h3 className="font-sans text-[9.5px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-2">{title}</h3>
      <div className="h-px bg-[#e8e4dd]" />
    </div>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  const { personalInfo: p } = data;
  const hasMain = data.summary || data.experience.length > 0 || data.internships.length > 0 || data.projects.length > 0 || data.volunteer.length > 0;
  const hasSidebar = data.skills.filter(s => s.trim()).length > 0 || data.languages.length > 0 || data.education.length > 0 || data.certifications.length > 0;

  return (
    <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-full max-w-[880px] min-h-[1100px] shrink-0 font-serif-body overflow-hidden">

      {/* Header */}
      <header className="px-12 pt-12 pb-9 text-center border-b border-[#f0eee9] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
        <h1 className="font-serif-display text-[40px] text-[#111] tracking-wide mt-4 leading-tight">{p.name || 'Your Name'}</h1>
        <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#888] mt-2 mb-6">{p.title || 'Professional Title'}</p>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[10px] font-sans text-[#666] tracking-wide">
          {p.location  && <span className="flex items-center gap-1.5"><MapPin   size={9} className="text-[#c5a059]" />{p.location}</span>}
          {p.phone     && <span className="flex items-center gap-1.5"><Phone    size={9} className="text-[#c5a059]" />{p.phone}</span>}
          {p.email     && <span className="flex items-center gap-1.5"><Mail     size={9} className="text-[#c5a059]" />{p.email}</span>}
          {p.website   && <span className="flex items-center gap-1.5"><Globe    size={9} className="text-[#c5a059]" />{p.website}</span>}
          {p.linkedin  && <span className="flex items-center gap-1.5"><Linkedin size={9} className="text-[#c5a059]" />{p.linkedin}</span>}
          {p.github    && <span className="flex items-center gap-1.5"><Github   size={9} className="text-[#c5a059]" />{p.github}</span>}
        </div>
      </header>

      {/* Body */}
      <div className="flex text-[#222]">

        {/* ── Main column ── */}
        {hasMain && (
          <div className="flex-1 px-10 py-9 space-y-9 text-[13px] leading-[1.82] border-r border-[#f0eee9]">

            {data.summary && (
              <section>
                <PHead title="Profile" />
                <p className="text-[#444] text-justify">{data.summary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section>
                <PHead title="Experience" />
                <div className="space-y-8">
                  {data.experience.map(e => (
                    <div key={e.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-serif-display text-[16px] text-[#111]">{e.role}</h3>
                        <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] shrink-0 ml-4">{e.startDate}{e.startDate && e.endDate ? ' — ' : ''}{e.endDate}</span>
                      </div>
                      <div className="text-[#c5a059] text-[10px] tracking-[0.15em] uppercase font-sans mb-3">{e.company}</div>
                      {e.bullets.filter(b => b.trim()).length > 0 && (
                        <ul className="space-y-2">
                          {e.bullets.filter(b => b.trim()).map((b, i) => (
                            <li key={i} className="flex items-start text-[#444]">
                              <span className="text-[#c5a059] mr-2.5 mt-0.5 text-lg leading-none shrink-0">·</span>
                              <span className="text-justify">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.internships.length > 0 && (
              <section>
                <PHead title="Internships" />
                <div className="space-y-8">
                  {data.internships.map(e => (
                    <div key={e.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-serif-display text-[16px] text-[#111]">{e.role}</h3>
                        <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] shrink-0 ml-4">{e.startDate}{e.startDate && e.endDate ? ' — ' : ''}{e.endDate}</span>
                      </div>
                      <div className="text-[#c5a059] text-[10px] tracking-[0.15em] uppercase font-sans mb-3">{e.company}</div>
                      {e.bullets.filter(b => b.trim()).length > 0 && (
                        <ul className="space-y-2">
                          {e.bullets.filter(b => b.trim()).map((b, i) => (
                            <li key={i} className="flex items-start text-[#444]">
                              <span className="text-[#c5a059] mr-2.5 mt-0.5 text-lg leading-none shrink-0">·</span>
                              <span className="text-justify">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.projects.length > 0 && (
              <section>
                <PHead title="Projects" />
                <div className="space-y-8">
                  {data.projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-serif-display text-[16px] text-[#111]">{proj.name}</h3>
                        <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] shrink-0 ml-4">{proj.startDate}{proj.startDate && proj.endDate ? ' — ' : ''}{proj.endDate}</span>
                      </div>
                      {proj.url && <div className="text-[#c5a059] text-[10px] tracking-wide font-sans mb-2">{proj.url}</div>}
                      {proj.description && <p className="text-[#444] text-justify mb-3">{proj.description}</p>}
                      {proj.tech.filter(t => t.trim()).length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tech.filter(t => t.trim()).map((t, i) => (
                            <span key={i} className="inline-block border border-[#e8e4dd] text-[#666] text-[9.5px] tracking-wide px-2 py-0.5 font-sans">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.volunteer.length > 0 && (
              <section>
                <PHead title="Volunteer" />
                <div className="space-y-6">
                  {data.volunteer.map(v => (
                    <div key={v.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-serif-display text-[16px] text-[#111]">{v.role}</h3>
                        <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] shrink-0 ml-4">{v.startDate}{v.startDate && v.endDate ? ' — ' : ''}{v.endDate}</span>
                      </div>
                      <div className="text-[#c5a059] text-[10px] tracking-[0.15em] uppercase font-sans mb-2">{v.organization}</div>
                      {v.description && <p className="text-[#444] text-justify">{v.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── Sidebar ── */}
        {hasSidebar && (
          <div className="w-[210px] shrink-0 px-6 py-9 space-y-8 bg-[#faf9f7] text-[12px] leading-[1.75]">

            {data.skills.filter(s => s.trim()).length > 0 && (
              <section>
                <SHead title="Expertise" />
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.filter(s => s.trim()).map((s, i) => (
                    <span key={i} className="inline-block border border-[#e0dbd2] text-[#555] text-[10px] tracking-wide px-2.5 py-1 font-sans leading-none">{s.trim()}</span>
                  ))}
                </div>
              </section>
            )}

            {data.languages.length > 0 && (
              <section>
                <SHead title="Languages" />
                <div className="space-y-2">
                  {data.languages.map(l => (
                    <div key={l.id} className="flex justify-between items-baseline">
                      <span className="text-[#333] font-medium">{l.language}</span>
                      <span className="text-[#888] text-[10px] font-sans">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <SHead title="Education" />
                <div className="space-y-5">
                  {data.education.map(e => (
                    <div key={e.id}>
                      <div className="font-serif-display text-[13px] text-[#111] leading-snug">{e.school}</div>
                      <div className="text-[#555] text-[11px] mt-0.5">{e.degree} {e.field}</div>
                      <div className="text-[#c5a059] text-[9.5px] tracking-widest uppercase font-sans mt-1">{e.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.certifications.length > 0 && (
              <section>
                <SHead title="Certifications" />
                <div className="space-y-4">
                  {data.certifications.map(c => (
                    <div key={c.id}>
                      <div className="text-[#333] font-medium text-[11.5px] leading-snug">{c.name}</div>
                      <div className="text-[#888] text-[10.5px] mt-0.5">{c.issuer}</div>
                      <div className="text-[#c5a059] text-[9.5px] tracking-widest uppercase font-sans mt-1">{c.year}{c.credentialId ? ` · ${c.credentialId}` : ''}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Editor Section Wrapper ─────────────────────────────── */
function EdSection({ icon, title, onAdd, addLabel, children, isEmpty }: {
  icon: React.ReactNode; title: string; onAdd: () => void; addLabel: string; children: React.ReactNode; isEmpty: boolean;
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-[#c5a059]">{icon}</span>
          <h2 className="text-xl font-serif-display text-[#222]">{title}</h2>
        </div>
        <button onClick={onAdd} className={addBtnCls}><Plus size={13} /> {addLabel}</button>
      </div>
      <div className="space-y-4">
        {children}
        {isEmpty && <EmptySlot label={title.toLowerCase()} />}
      </div>
    </section>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export function Elegance() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [view, setView] = useState<'editor' | 'preview'>('editor');

  /* helpers */
  const upd = <K extends keyof ResumeData>(key: K, val: ResumeData[K]) => setData(p => ({ ...p, [key]: val }));
  const updPersonal = (f: string, v: string) => setData(p => ({ ...p, personalInfo: { ...p.personalInfo, [f]: v } }));

  /* list helpers factory */
  function makeList<T extends { id: string }>(key: keyof ResumeData, blank: Omit<T, 'id'>) {
    return {
      add:    () => setData(p => ({ ...p, [key]: [...(p[key] as unknown as T[]), { id: Date.now().toString(), ...blank } as T] })),
      update: (id: string, f: string, v: unknown) => setData(p => ({ ...p, [key]: (p[key] as unknown as T[]).map(item => item.id === id ? { ...item, [f]: v } : item) })),
      remove: (id: string) => setData(p => ({ ...p, [key]: (p[key] as unknown as T[]).filter(item => item.id !== id) })),
    };
  }

  const exp  = makeList<Experience>('experience',     { company: '', role: '', startDate: '', endDate: '', bullets: [] });
  const int_ = makeList<Internship>('internships',    { company: '', role: '', startDate: '', endDate: '', bullets: [] });
  const edu  = makeList<Education>('education',       { school: '', degree: '', field: '', year: '' });
  const proj = makeList<Project>('projects',          { name: '', description: '', tech: [], url: '', startDate: '', endDate: '' });
  const cert = makeList<Certification>('certifications', { name: '', issuer: '', year: '', credentialId: '' });
  const lang = makeList<Language>('languages',        { language: '', proficiency: 'Conversational' });
  const vol  = makeList<Volunteer>('volunteer',       { organization: '', role: '', startDate: '', endDate: '', description: '' });

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#e8e6e1] font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-serif-body    { font-family: 'Lora', serif; }
        .cscroll::-webkit-scrollbar { width: 5px; }
        .cscroll::-webkit-scrollbar-track { background: transparent; }
        .cscroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.09); border-radius: 10px; }
        .cscroll:hover::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.18); }
      `}} />

      {/* Mobile toggle */}
      <div className="lg:hidden flex border-b border-[#e5e1d8] bg-[#faf9f6] shrink-0">
        {(['editor', 'preview'] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`flex-1 py-4 text-xs tracking-widest uppercase font-medium transition-colors ${view === v ? 'text-[#1a1a1a] border-b-[3px] border-[#1a1a1a] bg-white' : 'text-[#888] border-b-[3px] border-transparent'}`}>
            {v}
          </button>
        ))}
      </div>

      {/* ── Editor ── */}
      <div className={`w-full lg:w-[44%] h-full flex-col border-r border-[#e5e1d8] bg-white z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0 ${view === 'editor' ? 'flex' : 'hidden lg:flex'}`}>

        {/* Top bar */}
        <div className="px-8 py-5 border-b border-[#e5e1d8] flex justify-between items-center bg-[#faf9f6]">
          <div>
            <h1 className="font-serif-display text-2xl text-[#1a1a1a]">Elegance</h1>
            <p className="text-[10px] tracking-widest uppercase text-[#888] mt-0.5 font-semibold">Document Builder</p>
          </div>
          <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 text-[11px] font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors">
            <Download size={13} /><span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto cscroll p-8 bg-[#faf9f6]">
          <div className="space-y-10 max-w-xl mx-auto pb-28">

            {/* Personal */}
            <section>
              <h2 className={sectionHeadCls}>Personal Details</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {[['name','Full Name','Jane Doe'],['title','Professional Title','Senior Designer'],['email','Email Address','jane@example.com'],['phone','Phone Number','+1 234 567 890'],['location','Location','New York, NY'],['website','Website / Portfolio','janedoe.com'],['linkedin','LinkedIn','linkedin.com/in/jane'],['github','GitHub','github.com/jane']].map(([f, lbl, ph]) => (
                  <div key={f} className={f === 'name' || f === 'title' ? 'col-span-1' : 'col-span-1'}>
                    <label className={labelCls}>{lbl}</label>
                    <input className={inputCls} placeholder={ph} value={(data.personalInfo as Record<string,string>)[f]} onChange={e => updPersonal(f, e.target.value)} />
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* Summary */}
            <section>
              <h2 className={sectionHeadCls}>Professional Summary</h2>
              <label className={labelCls}>Profile</label>
              <textarea className={`${inputCls} min-h-[110px] resize-y leading-[1.65]`} value={data.summary} onChange={e => upd('summary', e.target.value)} placeholder="A brief overview of your professional background…" />
            </section>

            <Divider />

            {/* Experience */}
            <EdSection icon={<Briefcase size={16} />} title="Experience" onAdd={exp.add} addLabel="Add Role" isEmpty={data.experience.length === 0}>
              {data.experience.map(item => <ExpCard key={item.id} item={item} update={(f, v) => exp.update(item.id, f, v)} remove={() => exp.remove(item.id)} />)}
            </EdSection>

            <Divider />

            {/* Internships */}
            <EdSection icon={<BookOpen size={16} />} title="Internships" onAdd={int_.add} addLabel="Add Internship" isEmpty={data.internships.length === 0}>
              {data.internships.map(item => <ExpCard key={item.id} item={item} update={(f, v) => int_.update(item.id, f, v)} remove={() => int_.remove(item.id)} />)}
            </EdSection>

            <Divider />

            {/* Projects */}
            <EdSection icon={<Code2 size={16} />} title="Projects" onAdd={proj.add} addLabel="Add Project" isEmpty={data.projects.length === 0}>
              {data.projects.map(item => <ProjectCard key={item.id} item={item} update={(f, v) => proj.update(item.id, f, v)} remove={() => proj.remove(item.id)} />)}
            </EdSection>

            <Divider />

            {/* Education */}
            <EdSection icon={<BookOpen size={16} />} title="Education" onAdd={edu.add} addLabel="Add School" isEmpty={data.education.length === 0}>
              {data.education.map(item => <EduCard key={item.id} item={item} update={(f, v) => edu.update(item.id, f, v)} remove={() => edu.remove(item.id)} />)}
            </EdSection>

            <Divider />

            {/* Certifications */}
            <EdSection icon={<Award size={16} />} title="Certifications" onAdd={cert.add} addLabel="Add Certification" isEmpty={data.certifications.length === 0}>
              {data.certifications.map(item => <CertCard key={item.id} item={item} update={(f, v) => cert.update(item.id, f, v)} remove={() => cert.remove(item.id)} />)}
            </EdSection>

            <Divider />

            {/* Languages */}
            <EdSection icon={<Languages size={16} />} title="Languages" onAdd={lang.add} addLabel="Add Language" isEmpty={data.languages.length === 0}>
              {data.languages.map(item => <LangCard key={item.id} item={item} update={(f, v) => lang.update(item.id, f, v)} remove={() => lang.remove(item.id)} />)}
            </EdSection>

            <Divider />

            {/* Volunteer */}
            <EdSection icon={<Heart size={16} />} title="Volunteer" onAdd={vol.add} addLabel="Add Entry" isEmpty={data.volunteer.length === 0}>
              {data.volunteer.map(item => <VolCard key={item.id} item={item} update={(f, v) => vol.update(item.id, f, v)} remove={() => vol.remove(item.id)} />)}
            </EdSection>

            <Divider />

            {/* Skills */}
            <section>
              <h2 className={sectionHeadCls}>Expertise & Skills</h2>
              <TagInput tags={data.skills} onChange={v => upd('skills', v)} placeholder="Type a skill and press Enter…" />
            </section>

          </div>
        </div>
      </div>

      {/* ── Preview ── */}
      <div className={`w-full lg:flex-1 h-[calc(100vh-53px)] lg:h-full bg-[#e8e6e1] overflow-y-auto p-6 md:p-10 flex justify-center items-start cscroll ${view === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        <ResumePreview data={data} />
      </div>
    </div>
  );
}
