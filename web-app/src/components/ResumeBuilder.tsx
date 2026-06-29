import React, { useState, useRef, useCallback } from 'react';
import {
  Plus, Trash2, Download, ChevronDown, ChevronUp,
  X, Github, Linkedin, Globe, Mail, Phone, MapPin,
  Award, Briefcase, BookOpen, Code2, Sun, Moon, Sparkles, Image, User
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────── */
export interface PersonalInfo {
  name: string; title: string; email: string; phone: string;
  location: string; website: string; linkedin: string; github: string;
  photo?: string;
}
export interface Experience    { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
export interface Internship    { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
export interface Education     { id: string; school: string; degree: string; field: string; year: string; }
export interface Project       { id: string; name: string; description: string; tech: string[]; url: string; startDate: string; endDate: string; section?: string; }
export interface Certification { id: string; name: string; issuer: string; year: string; credentialId: string; }
export interface Language      { id: string; language: string; proficiency: string; }
export interface CustomSection  { id: string; title: string; content: string; }

export interface CategorizedSkills {
  frontend: string[];
  backend: string[];
  database: string[];
  aiml: string[];
}

export interface ToolsPlatforms {
  devTools: string[];
  cloudDeployment: string[];
  aiPlatforms: string[];
  dataMlTools: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[]; // Expertise
  experience: Experience[];
  internships: Internship[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  categorizedSkills: CategorizedSkills;
  toolsPlatforms: ToolsPlatforms;
  customSections?: CustomSection[];
}

/* ─── Defaults ───────────────────────────────────────────── */
const EMPTY_RESUME: ResumeData = {
  personalInfo: { name: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '', photo: '' },
  summary: '',
  skills: [],
  experience: [],
  internships: [],
  education: [],
  projects: [],
  certifications: [],
  languages: [],
  categorizedSkills: { frontend: [], backend: [], database: [], aiml: [] },
  toolsPlatforms: { devTools: [], cloudDeployment: [], aiPlatforms: [], dataMlTools: [] },
  customSections: []
};

const DEMO_RESUME: ResumeData = {
  personalInfo: { 
    name: 'Alex Morgan', 
    title: 'Senior Software Engineer', 
    email: 'alex.morgan@example.com', 
    phone: '+1 (555) 123-4567', 
    location: 'San Francisco, CA', 
    website: 'alexmorgan.dev', 
    linkedin: 'linkedin.com/in/alexmorgan', 
    github: 'github.com/alexmorgan',
    photo: '' 
  },
  summary: 'Craft-driven software engineer with 8+ years of experience building elegant, scalable systems. Specialized in frontend architecture and polished user interfaces. Passionate about bridging the gap between rigorous engineering and thoughtful design.',
  skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS', 'Framer Motion', 'System Architecture', 'Web Performance'],
  experience: [
    { id: '1', company: 'Stripe', role: 'Senior Frontend Engineer', startDate: '2020', endDate: 'Present', bullets: ['Led frontend architecture for the new Billing dashboard, improving load times by 35%.', 'Implemented a suite of highly accessible, fluidly animated components.', 'Mentored 4 mid-level engineers, fostering a culture of craftsmanship and rigorous code reviews.'] },
    { id: '2', company: 'Vercel', role: 'Software Engineer', startDate: '2017', endDate: '2020', bullets: ['Developed core features for the deployment dashboard, focusing on real-time log streaming.', 'Optimized core web vitals of the marketing site, achieving perfect Lighthouse scores.'] },
  ],
  internships: [
    { id: '1', company: 'Figma', role: 'Frontend Engineering Intern', startDate: 'Summer 2016', endDate: '', bullets: ['Built prototype tooling for the collaboration feature used in beta testing.', 'Contributed to the real-time cursor sharing feature shipped in Q4 2016.'] },
  ],
  education: [{ id: '1', school: 'Stanford University', degree: 'B.S.', field: 'Computer Science', year: '2017' }],
  projects: [
    { id: '1', name: 'Cartographer UI', description: 'Open-source canvas library for React with real-time collaboration, shape primitives, and a plugin API.', tech: ['React', 'TypeScript', 'WebSockets'], url: 'github.com/alexmorgan/cartographer', startDate: '2022', endDate: 'Present', section: 'Open Source Projects' },
    { id: '2', name: 'Palette AI', description: 'Generative design tool that extracts color palettes from natural language descriptions using GPT-4.', tech: ['Next.js', 'OpenAI API'], url: 'paletteai.dev', startDate: '2023', endDate: '2023', section: 'Professional Projects' },
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
  categorizedSkills: {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'GraphQL', 'REST APIs'],
    database: ['PostgreSQL', 'Redis', 'MongoDB'],
    aiml: ['PyTorch', 'TensorFlow', 'Scikit-Learn']
  },
  toolsPlatforms: {
    devTools: ['Git', 'VS Code', 'Webpack', 'Vite'],
    cloudDeployment: ['AWS', 'Vercel', 'Docker', 'Netlify'],
    aiPlatforms: ['OpenAI API', 'Hugging Face', 'Claude'],
    dataMlTools: ['Jupyter', 'Pandas', 'NumPy']
  },
  customSections: [
    { id: '1', title: 'Awards & Honors', content: '· Stanford Computer Science Outstanding Undergraduate Award (2017)\n· Winner, Vercel Hackathon (Best Dev Tooling Category, 2019)' }
  ]
};

/* ─── Shared styles ──────────────────────────────────────── */
const inp  = 'w-full bg-transparent border-b border-[#e0dbd2] focus:border-[#c5a059] py-2 px-0 text-[12.5px] outline-none transition-colors text-[#333] dark:text-white dark:border-[#444] placeholder:text-[#ccc]';
const inp2 = 'w-full bg-transparent border border-[#e0dbd2] rounded-sm focus:border-[#c5a059] py-2 px-2.5 text-[12.5px] outline-none transition-colors text-[#333] dark:text-white dark:border-[#444] placeholder:text-[#ccc]';
const lbl  = 'text-[9.5px] uppercase tracking-[0.14em] text-[#999] dark:text-[#aaa] font-semibold block mb-1';
const addB = 'text-[10px] flex items-center gap-1 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold';

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
    <div className="border border-[#e0dbd2] dark:border-[#444] rounded-sm p-2.5 focus-within:border-[#c5a059] transition-all cursor-text bg-transparent" onClick={() => ref.current?.focus()}>
      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {tags.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-[#f5f2ec] dark:bg-[#2c2c2c] border border-[#e0dbd2] dark:border-[#444] text-[#555] dark:text-white text-[10px] px-2 py-0.5 rounded-sm">
            {t}<button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))} className="text-[#bbb] hover:text-red-400 transition-colors"><X size={9}/></button>
          </span>
        ))}
        <input ref={ref} className="flex-1 min-w-[100px] bg-transparent text-[12px] outline-none text-[#333] dark:text-white placeholder:text-[#ccc]" value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey} onBlur={commit} placeholder={tags.length ? '' : placeholder} />
      </div>
      <p className="text-[9px] text-[#d0ccc5] dark:text-[#666]">Enter or comma to add · Backspace to remove last</p>
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
      <div className="flex justify-between items-center mb-1.5">
        <label className={lbl}>Highlights</label>
        <button type="button" onClick={add} className={addB}><Plus size={10}/> bullet</button>
      </div>
      <div className="space-y-1.5">
        {bullets.map((b, i) => (
          <div key={i} className="flex items-center gap-1.5 group">
            <span className="text-[#c5a059] text-base leading-none shrink-0">·</span>
            <input className={`${inp} flex-1`} value={b} onChange={e => upd(i, e.target.value)} placeholder="Achievement or responsibility…" />
            <button type="button" onClick={() => del(i)} className="shrink-0 text-[#ddd] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={11}/></button>
          </div>
        ))}
        {bullets.length === 0 && <p className="text-[10px] text-[#d0ccc5] italic">No highlights yet.</p>}
      </div>
    </div>
  );
}

/* ─── Collapsible Card ───────────────────────────────────── */
function Card({ title, sub, onRemove, children }: { title: string; sub?: string; onRemove: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-[#ebe7e0] dark:border-[#444] rounded-sm overflow-hidden bg-transparent">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className="flex items-center justify-between px-3.5 py-2.5 bg-[#faf9f6] dark:bg-[#252525] cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); } }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-[12.5px] text-[#1a1a1a] dark:text-white truncate">{title || 'Untitled'}</span>
          {sub && <span className="text-[11px] text-[#aaa] truncate shrink-0">{sub}</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button type="button" onClick={e => { e.stopPropagation(); onRemove(); }} className="text-[#ccc] hover:text-red-400 transition-colors"><Trash2 size={12}/></button>
          {open ? <ChevronUp size={13} className="text-[#bbb]"/> : <ChevronDown size={13} className="text-[#bbb]"/>}
        </div>
      </div>
      {open && <div className="px-3.5 py-3.5 border-t border-[#f0ede8] dark:border-[#444] space-y-3.5 bg-white dark:bg-[#1a1a1a]">{children}</div>}
    </div>
  );
}

/* ─── Editor Section Header ──────────────────────────────── */
function EHead({ icon, title, onAdd, label }: { icon: React.ReactNode; title: string; onAdd: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-[#c5a059]">{icon}</span>
        <h3 className="text-[14px] font-semibold text-[#1a1a1a] dark:text-white">{title}</h3>
      </div>
      <button type="button" onClick={onAdd} className={addB}><Plus size={11}/> {label}</button>
    </div>
  );
}

/* ─── Preview Section Header ─────────────────────────────── */
function PH({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <h2 className="font-serif-display italic text-[10px] font-bold text-[#1a1a1a] tracking-wider uppercase shrink-0">{title}</h2>
      <div className="flex-1 h-[0.5px] bg-[#e0dbd2]"/>
    </div>
  );
}

/* ─── Preview Experience Row ─────────────────────────────── */
function PExp({ item }: { item: Experience | Internship }) {
  return (
    <div className="mb-2 last:mb-0">
      <div className="flex justify-between items-baseline mb-0.5">
        <h3 className="font-serif-display text-[11.5px] font-bold text-[#111]">{item.role}</h3>
        <span className="text-[8px] font-sans tracking-wider uppercase text-[#888] ml-3 shrink-0">{item.startDate}{item.startDate && item.endDate ? ' — ' : ''}{item.endDate}</span>
      </div>
      <div className="text-[#c5a059] text-[8.5px] tracking-[0.12em] uppercase font-sans font-semibold mb-1">{item.company}</div>
      {item.bullets.filter(b => b.trim()).length > 0 && (
        <ul className="space-y-0.5 pl-2">
          {item.bullets.filter(b => b.trim()).map((b, i) => (
            <li key={i} className="flex items-start text-[#444] text-[9.5px] leading-[1.45]">
              <span className="text-[#c5a059] mr-1.5 mt-0.5 text-[8px] shrink-0">·</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Empty state ────────────────────────────────────────── */
function Empty({ label }: { label: string }) {
  return <p className="text-[10.5px] text-[#ccc] italic text-center py-4 border border-dashed border-[#ebe7e0] dark:border-[#444] rounded-sm">No {label} added yet</p>;
}

/* ─── Resume Preview (strict A4 size) ────────────────────── */
export function ResumePreview({ 
  data, 
  printRef 
}: { 
  data: ResumeData; 
  printRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const p = data.personalInfo;
  
  // Custom grouping logic for flat expertise tags to group them by category in the preview
  const groupExpertise = (skillsList: string[]) => {
    const categories: Record<string, string[]> = {
      'Core Tech': [],
      'UI & Animation': [],
      'Systems & API': []
    };
    
    skillsList.forEach(s => {
      const sLower = s.toLowerCase();
      if (sLower.includes('react') || sLower.includes('typescript') || sLower.includes('next') || sLower.includes('js')) {
        categories['Core Tech'].push(s);
      } else if (sLower.includes('tailwind') || sLower.includes('motion') || sLower.includes('css') || sLower.includes('design')) {
        categories['UI & Animation'].push(s);
      } else {
        categories['Systems & API'].push(s);
      }
    });

    return Object.entries(categories).filter(([_, list]) => list.length > 0);
  };

  const groupedExpertise = groupExpertise(data.skills);

  return (
    <div 
      ref={printRef} 
      id="resume-print" 
      className="bg-white text-[#222] w-[210mm] min-h-[297mm] h-auto px-8 py-5 flex flex-col justify-between box-border select-none select-text"
    >
      <div>
        {/* Header */}
        {/* Header */}
        <header className="flex flex-col items-center text-center pb-2.5 mb-2.5 border-b border-[#f5f2ec] relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"/>
          
          <h1 className="font-serif-display text-[26px] font-bold text-[#111] tracking-wide leading-tight">{p.name || 'Your Name'}</h1>
          <p className="font-sans text-[8.5px] tracking-[0.2em] uppercase text-[#c5a059] font-bold mt-1 mb-1.5">{p.title || 'Professional Title'}</p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[8.5px] font-sans text-[#666]">
            {p.location  && <span className="flex items-center gap-0.5"><MapPin size={8} className="text-[#c5a059]"/>{p.location}</span>}
            {p.phone     && <span className="flex items-center gap-0.5"><Phone size={8} className="text-[#c5a059]"/>{p.phone}</span>}
            {p.email     && <span className="flex items-center gap-0.5"><Mail size={8} className="text-[#c5a059]"/>{p.email}</span>}
            {p.website   && <span className="flex items-center gap-0.5"><Globe size={8} className="text-[#c5a059]"/>{p.website}</span>}
            {p.linkedin  && <span className="flex items-center gap-0.5"><Linkedin size={8} className="text-[#c5a059]"/>{p.linkedin}</span>}
            {p.github    && <span className="flex items-center gap-0.5"><Github size={8} className="text-[#c5a059]"/>{p.github}</span>}
          </div>
        </header>

        {/* Vertical Layout Order Sections */}
        <div className="space-y-2">
          {/* Profile */}
          {data.summary && (
            <section>
              <PH title="Profile"/>
              <p className="text-[#444] text-[9.5px] leading-[1.45] text-justify">{data.summary}</p>
            </section>
          )}

          {/* Expertise (Grouped flat tags) */}
          {groupedExpertise.length > 0 && (
            <section>
              <PH title="Expertise"/>
              <div className="flex flex-col gap-1.5">
                {groupedExpertise.map(([cat, list]) => (
                  <div key={cat} className="flex items-center gap-2 flex-wrap">
                    <span className="text-[8px] uppercase tracking-wider font-semibold text-[#888] font-sans w-20 shrink-0">{cat}:</span>
                    <div className="flex flex-wrap gap-1">
                      {list.map((s, i) => (
                        <span key={i} className="bg-[#fcf9f2] border border-[#e8d8b8] text-[#7c5e21] text-[8.5px] px-1.5 py-0.5 rounded-sm font-sans font-medium">{s.trim()}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <PH title="Experience"/>
              <div className="space-y-2">
                {data.experience.map(it => <PExp key={it.id} item={it}/>)}
              </div>
            </section>
          )}

          {/* Internships */}
          {data.internships.length > 0 && (
            <section>
              <PH title="Internships"/>
              <div className="space-y-2">
                {data.internships.map(it => <PExp key={it.id} item={it}/>)}
              </div>
            </section>
          )}

          {/* Projects (Grouped by Category/Section) */}
          {data.projects.length > 0 && (
            <section className="space-y-2">
              {(() => {
                const groups: Record<string, Project[]> = {};
                data.projects.forEach(p => {
                  const secName = p.section?.trim() || 'Projects';
                  if (!groups[secName]) groups[secName] = [];
                  groups[secName].push(p);
                });
                return Object.entries(groups).map(([secTitle, projList]) => (
                  <div key={secTitle} className="space-y-1.5">
                    <PH title={secTitle}/>
                    <div className="space-y-2">
                      {projList.map(it => (
                        <div key={it.id} className="group border border-transparent hover:border-[#f5f2ec] hover:bg-[#faf9f6]/40 p-1.5 -m-1.5 rounded-sm transition-all">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h3 className="font-serif-display text-[11px] font-bold text-[#111]">{it.name}</h3>
                            <span className="text-[8px] font-sans tracking-wider uppercase text-[#888] ml-3 shrink-0">{it.startDate}{it.startDate && it.endDate ? ' — ' : ''}{it.endDate}</span>
                          </div>
                          {it.url && <div className="text-[#c5a059] text-[8px] tracking-wide font-sans mb-1">{it.url}</div>}
                          {it.description && <p className="text-[#444] text-[9.5px] leading-[1.4] mb-1.5 text-justify">{it.description}</p>}
                          {it.tech.filter(t => t.trim()).length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {it.tech.filter(t => t.trim()).map((t, i) => (
                                <span key={i} className="bg-gray-100 text-gray-700 text-[7.5px] font-sans px-1.5 py-0.2 rounded-sm">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </section>
          )}

          {/* Skills (Categorized Grid) */}
          {(data.categorizedSkills.frontend.length > 0 || data.categorizedSkills.backend.length > 0) && (
            <section>
              <PH title="Skills"/>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries({
                  Frontend: data.categorizedSkills.frontend,
                  Backend: data.categorizedSkills.backend,
                  Database: data.categorizedSkills.database,
                  'AI / ML': data.categorizedSkills.aiml
                }).map(([category, tags]) => (
                  <div key={category} className="border border-[#f0ede8] p-2 rounded-sm bg-[#faf9f6]/30">
                    <h4 className="text-[8px] uppercase tracking-wider font-semibold text-[#888] mb-1 font-sans">{category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {tags.length > 0 ? (
                        tags.map((t, i) => (
                          <span key={i} className="text-[#555] text-[8px] font-sans">· {t}</span>
                        ))
                      ) : (
                        <span className="text-[#ccc] text-[8px] italic">Empty</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tools & Platforms (Categorized Grid) */}
          {(data.toolsPlatforms.devTools.length > 0 || data.toolsPlatforms.cloudDeployment.length > 0) && (
            <section>
              <PH title="Tools &amp; Platforms"/>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries({
                  'Dev Tools': data.toolsPlatforms.devTools,
                  'Cloud & Deploy': data.toolsPlatforms.cloudDeployment,
                  'AI Platforms': data.toolsPlatforms.aiPlatforms,
                  'Data & ML': data.toolsPlatforms.dataMlTools
                }).map(([category, tags]) => (
                  <div key={category} className="border border-[#f0ede8] p-2 rounded-sm bg-[#faf9f6]/30">
                    <h4 className="text-[8px] uppercase tracking-wider font-semibold text-[#888] mb-1 font-sans">{category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {tags.length > 0 ? (
                        tags.map((t, i) => (
                          <span key={i} className="text-[#555] text-[8px] font-sans">· {t}</span>
                        ))
                      ) : (
                        <span className="text-[#ccc] text-[8px] italic">Empty</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <PH title="Education"/>
              <div className="space-y-2.5">
                {data.education.map(it => (
                  <div key={it.id} className="border border-[#e8d8b8]/60 border-l-4 border-l-[#c5a059] rounded-sm p-3 bg-[#fcf9f2]/30 shadow-[0_2px_6px_rgba(197,160,89,0.03)] hover:shadow-[0_4px_12px_rgba(197,160,89,0.08)] hover:border-r-[#c5a059] transition-all flex items-start gap-3.5">
                    <div className="p-1.5 rounded-sm bg-white border border-[#e8d8b8]/40 shrink-0">
                      <BookOpen size={16} className="text-[#c5a059]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif-display text-[12px] font-bold text-[#1a1a1a] leading-tight">{it.school}</h4>
                          <p className="text-[#c5a059] text-[9.5px] font-sans font-bold mt-1 uppercase tracking-wider">{it.degree} in {it.field}</p>
                        </div>
                        <span className="bg-[#fcf9f2] border border-[#e8d8b8] text-[#7c5e21] text-[8px] font-sans font-bold px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wider">{it.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications (Glow Cards Grid) */}
          {data.certifications.length > 0 && (
            <section>
              <PH title="Certifications"/>
              <div className="grid grid-cols-2 gap-3">
                {data.certifications.map(it => (
                  <div key={it.id} className="border border-[#e8d8b8]/60 border-l-2 border-l-[#c5a059] rounded-sm p-2.5 bg-[#fcf9f2]/30 shadow-[0_2px_6px_rgba(197,160,89,0.03)] hover:shadow-[0_4px_12px_rgba(197,160,89,0.08)] hover:border-r-[#c5a059] transition-all flex items-start gap-2.5">
                    <div className="p-1.5 rounded-sm bg-white border border-[#e8d8b8]/40 shrink-0">
                      <Award size={14} className="text-[#c5a059]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif-display text-[10px] font-bold text-[#1a1a1a] leading-tight truncate">{it.name}</h4>
                        <span className="text-[#c5a059] text-[7.5px] font-sans font-bold uppercase tracking-wider shrink-0">{it.year}</span>
                      </div>
                      <p className="text-[#555] text-[8.5px] font-sans mt-0.5 truncate">{it.issuer}</p>
                      {it.credentialId && <p className="text-[#888] text-[7.5px] font-sans mt-0.5 truncate uppercase tracking-widest text-[6.5px]">ID: {it.credentialId}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <PH title="Languages"/>
              <div className="grid grid-cols-3 gap-3">
                {data.languages.map(it => {
                  const prof = it.proficiency.toLowerCase();
                  let rating = 3;
                  if (prof.includes('native')) rating = 5;
                  else if (prof.includes('fluent')) rating = 4;
                  else if (prof.includes('conversational')) rating = 3;
                  else if (prof.includes('basic')) rating = 2;

                  return (
                    <div key={it.id} className="border border-[#e8d8b8]/60 border-l-2 border-l-[#c5a059] rounded-sm p-2 bg-[#fcf9f2]/30 shadow-[0_2px_6px_rgba(197,160,89,0.03)] hover:shadow-[0_4px_12px_rgba(197,160,89,0.08)] hover:border-r-[#c5a059] transition-all flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif-display text-[10.5px] font-bold text-[#1a1a1a] leading-tight truncate">{it.language}</h4>
                        <p className="text-[#7c5e21] text-[7.5px] font-sans font-bold uppercase tracking-wider mt-0.5">{it.proficiency}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map(idx => (
                          <span 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full ${
                              idx <= rating 
                                ? 'bg-[#c5a059] shadow-[0_0_4px_rgba(197,160,89,0.35)]' 
                                : 'bg-[#e8d8b8]/30 border border-[#e8d8b8]/60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {data.customSections && data.customSections.length > 0 && data.customSections.map(sec => (
            <section key={sec.id}>
              <PH title={sec.title || "Custom Section"}/>
              <div className="text-[#444] text-[9.5px] leading-[1.45] text-justify whitespace-pre-line pl-1.5 border-l border-[#ebe7e0]">
                {sec.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(DEMO_RESUME);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = useCallback(() => { window.print(); }, []);

  const handleClear = useCallback(() => {
    if (window.confirm('Clear all resume data and start fresh?')) setData(EMPTY_RESUME);
  }, []);

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
  const proj = makeList<Project>('projects',           { name: '', description: '', tech: [], url: '', startDate: '', endDate: '', section: 'Projects' });
  const cert = makeList<Certification>('certifications', { name: '', issuer: '', year: '', credentialId: '' });
  const lang = makeList<Language>('languages',         { language: '', proficiency: 'Conversational' });
  const customSec = makeList<CustomSection>('customSections', { title: '', content: '' });

  const updCatSkill = (cat: keyof CategorizedSkills, tags: string[]) => {
    setData(d => ({ ...d, categorizedSkills: { ...d.categorizedSkills, [cat]: tags } }));
  };

  const updTool = (group: keyof ToolsPlatforms, tags: string[]) => {
    setData(d => ({ ...d, toolsPlatforms: { ...d.toolsPlatforms, [group]: tags } }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updP('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const navSections = [
    { id: 'personal', label: 'Personal' }, { id: 'summary', label: 'Summary' },
    { id: 'expertise', label: 'Expertise' }, { id: 'experience', label: 'Experience' },
    { id: 'internships', label: 'Internships' }, { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' }, { id: 'tools', label: 'Tools' },
    { id: 'education', label: 'Education' }, { id: 'certifications', label: 'Certifications' },
    { id: 'languages', label: 'Languages' }, { id: 'custom', label: 'Custom Sections' }
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen overflow-hidden font-sans no-print-layout ${darkMode ? 'dark bg-[#121212]' : 'bg-[#f4f1ec]'}`}>
      {/* ══ LEFT: Editor ══════════════════════════════════════ */}
      <div className="editor-panel w-full md:w-[420px] shrink-0 flex flex-col bg-white dark:bg-[#1e1e1e] border-r border-[#e8e4de] dark:border-[#333] shadow-[2px_0_16px_rgba(0,0,0,0.04)] h-[50dvh] md:h-full">

        {/* Top bar */}
        <div className="px-5 py-4 border-b border-[#f0ede8] dark:border-[#333] shrink-0 flex items-end justify-between">
          <div>
            <h1 className="font-serif-display text-[20px] text-[#1a1a1a] dark:text-white leading-none">Elegance</h1>
            <p className="text-[9px] tracking-[0.18em] uppercase text-[#aaa] mt-0.5">Resume Builder</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800 text-[#888] dark:text-[#ccc]"
            >
              {darkMode ? <Sun size={14}/> : <Moon size={14}/>}
            </button>
            <button type="button" onClick={handleClear} className="text-[9.5px] text-[#bbb] hover:text-red-400 transition-colors uppercase tracking-wider font-semibold">Clear</button>
          </div>
        </div>

        {/* Section nav pills */}
        <div className="px-4 py-2.5 border-b border-[#f0ede8] dark:border-[#333] flex gap-1.5 flex-wrap shrink-0 overflow-y-auto max-h-[75px]">
          {navSections.map(s => (
            <button type="button" key={s.id} onClick={() => scrollTo(s.id)}
              className={`text-[9.5px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold transition-colors ${activeSection === s.id ? 'bg-[#1a1a1a] dark:bg-[#c5a059] text-white dark:text-neutral-900' : 'bg-[#f4f1ec] dark:bg-[#2c2c2c] text-[#888] dark:text-[#aaa] hover:bg-[#eae6df] dark:hover:bg-neutral-700'}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto cscroll px-5 py-5 space-y-8">

          {/* Personal */}
          <div id="section-personal" className="space-y-4">
            <h3 className="text-[13px] font-semibold text-[#1a1a1a] dark:text-white">Personal Details</h3>
            


            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {([
                ['name','Full Name','Jane Doe'], ['title','Professional Title','Senior Designer'],
                ['email','Email','jane@example.com'], ['phone','Phone','+1 234 567 890'],
                ['location','Location','New York, NY'], ['website','Website','janedoe.com'],
                ['linkedin','LinkedIn','linkedin.com/in/jane'], ['github','GitHub','github.com/jane'],
              ] as [string,string,string][]).map(([f, label, ph]) => (
                <div key={f}>
                  <label className={lbl}>{label}</label>
                  <input className={inp} placeholder={ph} value={data.personalInfo[f as keyof PersonalInfo]} onChange={e => updP(f, e.target.value)}/>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Summary */}
          <div id="section-summary">
            <h3 className="text-[13px] font-semibold text-[#1a1a1a] dark:text-white mb-2">Professional Summary</h3>
            <label className={lbl}>Profile</label>
            <textarea className={`${inp2} min-h-[90px] resize-y leading-[1.6]`} value={data.summary} onChange={e => setData(d => ({ ...d, summary: e.target.value }))} placeholder="Brief professional overview…"/>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Expertise */}
          <div id="section-expertise">
            <h3 className="text-[13px] font-semibold text-[#1a1a1a] dark:text-white mb-2">Expertise Tags</h3>
            <TagInput tags={data.skills} onChange={v => setData(d => ({ ...d, skills: v }))} placeholder="Type an expertise tag and press Enter…"/>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Experience */}
          <div id="section-experience">
            <EHead icon={<Briefcase size={14}/>} title="Experience" onAdd={exp.add} label="Add Role"/>
            <div className="space-y-2.5">
              {data.experience.length === 0 && <Empty label="experience"/>}
              {data.experience.map(it => (
                <Card key={it.id} title={it.role || 'New Role'} sub={it.company} onRemove={() => exp.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>Company</label><input className={inp} value={it.company} onChange={e => exp.upd(it.id,'company',e.target.value)}/></div>
                    <div className="col-span-2"><label className={lbl}>Role</label><input className={inp} value={it.role} onChange={e => exp.upd(it.id,'role',e.target.value)}/></div>
                    <div><label className={lbl}>Start</label><input className={inp} placeholder="2020" value={it.startDate} onChange={e => exp.upd(it.id,'startDate',e.target.value)}/></div>
                    <div><label className={lbl}>End</label><input className={inp} placeholder="Present" value={it.endDate} onChange={e => exp.upd(it.id,'endDate',e.target.value)}/></div>
                  </div>
                  <BulletManager bullets={it.bullets} onChange={v => exp.upd(it.id,'bullets',v)}/>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Internships */}
          <div id="section-internships">
            <EHead icon={<BookOpen size={14}/>} title="Internships" onAdd={int_.add} label="Add Internship"/>
            <div className="space-y-2.5">
              {data.internships.length === 0 && <Empty label="internships"/>}
              {data.internships.map(it => (
                <Card key={it.id} title={it.role || 'New Internship'} sub={it.company} onRemove={() => int_.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>Company</label><input className={inp} value={it.company} onChange={e => int_.upd(it.id,'company',e.target.value)}/></div>
                    <div className="col-span-2"><label className={lbl}>Role</label><input className={inp} value={it.role} onChange={e => int_.upd(it.id,'role',e.target.value)}/></div>
                    <div><label className={lbl}>Start</label><input className={inp} placeholder="Summer 2022" value={it.startDate} onChange={e => int_.upd(it.id,'startDate',e.target.value)}/></div>
                    <div><label className={lbl}>End</label><input className={inp} placeholder="Fall 2022" value={it.endDate} onChange={e => int_.upd(it.id,'endDate',e.target.value)}/></div>
                  </div>
                  <BulletManager bullets={it.bullets} onChange={v => int_.upd(it.id,'bullets',v)}/>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Projects */}
          <div id="section-projects">
            <EHead icon={<Code2 size={14}/>} title="Projects" onAdd={proj.add} label="Add Project"/>
            <div className="space-y-2.5">
              {data.projects.length === 0 && <Empty label="projects"/>}
              {data.projects.map(it => (
                <Card key={it.id} title={it.name || 'New Project'} sub={it.tech.slice(0,2).join(', ')} onRemove={() => proj.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>Project Name</label><input className={inp} value={it.name} onChange={e => proj.upd(it.id,'name',e.target.value)}/></div>
                    <div className="col-span-2">
                      <label className={lbl}>Project Category / Section Name</label>
                      <input className={inp} placeholder="e.g. Open Source Projects, Professional Projects" value={it.section || ''} onChange={e => proj.upd(it.id,'section',e.target.value)}/>
                    </div>
                    <div><label className={lbl}>Start</label><input className={inp} placeholder="2022" value={it.startDate} onChange={e => proj.upd(it.id,'startDate',e.target.value)}/></div>
                    <div><label className={lbl}>End</label><input className={inp} placeholder="Present" value={it.endDate} onChange={e => proj.upd(it.id,'endDate',e.target.value)}/></div>
                    <div className="col-span-2"><label className={lbl}>URL / Link</label><input className={inp} placeholder="github.com/user/project" value={it.url} onChange={e => proj.upd(it.id,'url',e.target.value)}/></div>
                    <div className="col-span-2">
                      <label className={lbl}>Description</label>
                      <textarea className={`${inp2} min-h-[60px] resize-y leading-[1.55]`} value={it.description} onChange={e => proj.upd(it.id,'description',e.target.value)} placeholder="What does this project do?"/>
                    </div>
                    <div className="col-span-2">
                      <label className={lbl}>Tech Stack</label>
                      <TagInput tags={it.tech} onChange={v => proj.upd(it.id,'tech',v)} placeholder="React, Node.js…"/>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Skills (Categorized tag editors) */}
          <div id="section-skills" className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#c5a059]" />
              <h3 className="text-[13px] font-semibold text-[#1a1a1a] dark:text-white">Categorized Skills</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className={lbl}>Frontend</label>
                <TagInput tags={data.categorizedSkills.frontend} onChange={tags => updCatSkill('frontend', tags)} placeholder="React, TypeScript…"/>
              </div>
              <div>
                <label className={lbl}>Backend</label>
                <TagInput tags={data.categorizedSkills.backend} onChange={tags => updCatSkill('backend', tags)} placeholder="Node.js, Express…"/>
              </div>
              <div>
                <label className={lbl}>Database</label>
                <TagInput tags={data.categorizedSkills.database} onChange={tags => updCatSkill('database', tags)} placeholder="PostgreSQL, MongoDB…"/>
              </div>
              <div>
                <label className={lbl}>AI / ML</label>
                <TagInput tags={data.categorizedSkills.aiml} onChange={tags => updCatSkill('aiml', tags)} placeholder="PyTorch, TensorFlow…"/>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Tools & Platforms */}
          <div id="section-tools" className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-[#c5a059]" />
              <h3 className="text-[13px] font-semibold text-[#1a1a1a] dark:text-white">Tools &amp; Platforms</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className={lbl}>Dev Tools</label>
                <TagInput tags={data.toolsPlatforms.devTools} onChange={tags => updTool('devTools', tags)} placeholder="Git, VS Code…"/>
              </div>
              <div>
                <label className={lbl}>Cloud &amp; Deployment</label>
                <TagInput tags={data.toolsPlatforms.cloudDeployment} onChange={tags => updTool('cloudDeployment', tags)} placeholder="AWS, Vercel…"/>
              </div>
              <div>
                <label className={lbl}>AI Platforms</label>
                <TagInput tags={data.toolsPlatforms.aiPlatforms} onChange={tags => updTool('aiPlatforms', tags)} placeholder="OpenAI API, Claude…"/>
              </div>
              <div>
                <label className={lbl}>Data &amp; ML Tools</label>
                <TagInput tags={data.toolsPlatforms.dataMlTools} onChange={tags => updTool('dataMlTools', tags)} placeholder="Jupyter, Pandas…"/>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Education */}
          <div id="section-education">
            <EHead icon={<BookOpen size={14}/>} title="Education" onAdd={edu.add} label="Add School"/>
            <div className="space-y-2.5">
              {data.education.length === 0 && <Empty label="education"/>}
              {data.education.map(it => (
                <Card key={it.id} title={it.school || 'New School'} sub={`${it.degree} ${it.field}`.trim()} onRemove={() => edu.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>School / Institution</label><input className={inp} value={it.school} onChange={e => edu.upd(it.id,'school',e.target.value)}/></div>
                    <div><label className={lbl}>Degree (e.g. B.S.)</label><input className={inp} placeholder="B.S." value={it.degree} onChange={e => edu.upd(it.id,'degree',e.target.value)}/></div>
                    <div><label className={lbl}>Field of Study</label><input className={inp} value={it.field} onChange={e => edu.upd(it.id,'field',e.target.value)}/></div>
                    <div><label className={lbl}>Graduation Year</label><input className={inp} placeholder="2017" value={it.year} onChange={e => edu.upd(it.id,'year',e.target.value)}/></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Certifications */}
          <div id="section-certifications">
            <EHead icon={<Award size={14}/>} title="Certifications" onAdd={cert.add} label="Add Cert"/>
            <div className="space-y-2.5">
              {data.certifications.length === 0 && <Empty label="certifications"/>}
              {data.certifications.map(it => (
                <Card key={it.id} title={it.name || 'New Certification'} sub={it.issuer} onRemove={() => cert.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>Certification Name</label><input className={inp} value={it.name} onChange={e => cert.upd(it.id,'name',e.target.value)}/></div>
                    <div className="col-span-2"><label className={lbl}>Issuing Organization</label><input className={inp} value={it.issuer} onChange={e => cert.upd(it.id,'issuer',e.target.value)}/></div>
                    <div><label className={lbl}>Year Issued</label><input className={inp} placeholder="2023" value={it.year} onChange={e => cert.upd(it.id,'year',e.target.value)}/></div>
                    <div><label className={lbl}>Credential ID</label><input className={inp} placeholder="Optional" value={it.credentialId} onChange={e => cert.upd(it.id,'credentialId',e.target.value)}/></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Languages */}
          <div id="section-languages">
            <EHead icon={<span className="text-[13px] font-bold font-serif-display text-[#c5a059]">Aa</span>} title="Languages" onAdd={lang.add} label="Add Language"/>
            <div className="space-y-2.5">
              {data.languages.length === 0 && <Empty label="languages"/>}
              {data.languages.map(it => (
                <div key={it.id} className="flex items-end gap-3 group border border-[#ebe7e0] dark:border-[#444] rounded-sm px-3 py-3 bg-[#faf9f6] dark:bg-[#252525]">
                  <div className="flex-1">
                    <label className={lbl}>Language</label>
                    <input className={inp} placeholder="e.g. Spanish" value={it.language} onChange={e => lang.upd(it.id,'language',e.target.value)}/>
                  </div>
                  <div className="w-36">
                    <label className={lbl}>Proficiency</label>
                    <select className={`${inp} cursor-pointer`} value={it.proficiency} onChange={e => lang.upd(it.id,'proficiency',e.target.value)}>
                      {['Native','Fluent','Conversational','Basic'].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <button type="button" onClick={() => lang.remove(it.id)} className="shrink-0 text-[#ccc] hover:text-red-400 transition-colors pb-1.5 opacity-0 group-hover:opacity-100"><Trash2 size={13}/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8] dark:bg-[#333]"/>

          {/* Custom Sections */}
          <div id="section-custom">
            <EHead icon={<Award size={14} className="text-[#c5a059]" />} title="Custom Sections" onAdd={customSec.add} label="Add Section"/>
            <div className="space-y-2.5">
              {(!data.customSections || data.customSections.length === 0) && <Empty label="custom sections"/>}
              {data.customSections?.map(it => (
                <Card key={it.id} title={it.title || 'New Section'} sub="Custom content" onRemove={() => customSec.remove(it.id)}>
                  <div className="space-y-3">
                    <div>
                      <label className={lbl}>Section Title</label>
                      <input className={inp} placeholder="e.g. Awards & Honors, Publications, Hobbies" value={it.title} onChange={e => customSec.upd(it.id, 'title', e.target.value)}/>
                    </div>
                    <div>
                      <label className={lbl}>Section Content (Use newlines for lists/bullets)</label>
                      <textarea className={`${inp2} min-h-[80px] resize-y leading-[1.55]`} placeholder="· Award description..." value={it.content} onChange={e => customSec.upd(it.id, 'content', e.target.value)}/>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="pb-10"/>
        </div>

        {/* Export */}
        <div className="px-5 py-3.5 border-t border-[#f0ede8] dark:border-[#333] shrink-0 bg-white dark:bg-[#1e1e1e]">
          <button type="button" onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] dark:bg-[#c5a059] text-white dark:text-neutral-900 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-[#333] dark:hover:bg-[#a38040] transition-colors rounded-sm shadow-sm cursor-pointer">
            <Download size={13}/> Export PDF
          </button>
        </div>
      </div>

      {/* ══ RIGHT: Live Preview ════════════════════════════════ */}
      <div className="preview-panel flex-1 overflow-y-auto cscroll bg-[#e8e4dc] dark:bg-[#262626] py-10 px-8 flex justify-center items-start">
        <div className="shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
          <ResumePreview data={data} printRef={printRef}/>
        </div>
      </div>
    </div>
  );
}
