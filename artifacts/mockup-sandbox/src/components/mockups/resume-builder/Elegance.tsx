import React, { useState, useRef } from 'react';
import {
  Plus, Trash2, Download, ChevronDown, ChevronUp,
  X, Github, Linkedin, Globe, Mail, Phone, MapPin,
  Award, Briefcase, BookOpen, Code2, Heart
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────── */
interface Experience    { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
interface Internship    { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
interface Education     { id: string; school: string; degree: string; field: string; year: string; }
interface Project       { id: string; name: string; description: string; tech: string[]; url: string; startDate: string; endDate: string; }
interface Certification { id: string; name: string; issuer: string; year: string; credentialId: string; }
interface Language      { id: string; language: string; proficiency: string; }
interface Volunteer     { id: string; organization: string; role: string; startDate: string; endDate: string; description: string; }

interface ResumeData {
  personalInfo: { name: string; title: string; email: string; phone: string; location: string; website: string; linkedin: string; github: string; };
  summary: string;
  experience:     Experience[];
  internships:    Internship[];
  education:      Education[];
  projects:       Project[];
  certifications: Certification[];
  languages:      Language[];
  volunteer:      Volunteer[];
  skills:         string[];
}

/* ─── Initial Data ───────────────────────────────────────── */
const initial: ResumeData = {
  personalInfo: { name: 'Alex Morgan', title: 'Senior Software Engineer', email: 'alex.morgan@example.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA', website: 'alexmorgan.dev', linkedin: 'linkedin.com/in/alexmorgan', github: 'github.com/alexmorgan' },
  summary: 'Craft-driven software engineer with 8+ years of experience building elegant, scalable systems. Specialized in frontend architecture and polished user interfaces. Passionate about bridging the gap between rigorous engineering and thoughtful design.',
  experience: [
    { id: '1', company: 'Stripe', role: 'Senior Frontend Engineer', startDate: '2020', endDate: 'Present', bullets: ['Led frontend architecture for the new Billing dashboard, improving load times by 35%.', 'Implemented a suite of highly accessible, fluidly animated components.', 'Mentored 4 mid-level engineers, fostering a culture of craftsmanship and rigorous code reviews.'] },
    { id: '2', company: 'Vercel', role: 'Software Engineer', startDate: '2017', endDate: '2020', bullets: ['Developed core features for the deployment dashboard, focusing on real-time log streaming.', 'Optimized core web vitals of the marketing site, achieving perfect Lighthouse scores.'] },
  ],
  internships: [
    { id: '1', company: 'Figma', role: 'Frontend Engineering Intern', startDate: 'Summer 2016', endDate: '', bullets: ['Built prototype tooling for the collaboration feature used in beta testing.', 'Contributed to the real-time cursor sharing feature shipped in Q4 2016.'] },
  ],
  education:     [{ id: '1', school: 'Stanford University', degree: 'B.S.', field: 'Computer Science', year: '2017' }],
  projects: [
    { id: '1', name: 'Cartographer UI', description: 'Open-source canvas library for React with real-time collaboration, shape primitives, and a plugin API.', tech: ['React', 'TypeScript', 'WebSockets'], url: 'github.com/alexmorgan/cartographer', startDate: '2022', endDate: 'Present' },
    { id: '2', name: 'Palette AI', description: 'Generative design tool that extracts color palettes from natural language descriptions using GPT-4.', tech: ['Next.js', 'OpenAI API'], url: 'paletteai.dev', startDate: '2023', endDate: '2023' },
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2023', credentialId: 'AWS-SAA-C03' },
    { id: '2', name: 'Professional Scrum Master I', issuer: 'Scrum.org', year: '2021', credentialId: 'PSM-I' },
  ],
  languages: [
    { id: '1', language: 'English',  proficiency: 'Native' },
    { id: '2', language: 'Spanish',  proficiency: 'Fluent' },
    { id: '3', language: 'French',   proficiency: 'Conversational' },
  ],
  volunteer: [
    { id: '1', organization: 'Code for America', role: 'Volunteer Engineer', startDate: '2021', endDate: 'Present', description: 'Build and maintain civic tech tools that help local governments deliver better digital services.' },
  ],
  skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS', 'Framer Motion', 'System Architecture', 'Web Performance'],
};

/* ─── Shared styles ──────────────────────────────────────── */
const inp  = 'w-full bg-transparent border-b border-[#e0dbd2] focus:border-[#c5a059] py-2 px-0 text-[12.5px] outline-none transition-colors text-[#333] placeholder:text-[#ccc]';
const inp2 = 'w-full bg-transparent border border-[#e0dbd2] rounded-sm focus:border-[#c5a059] py-2 px-2.5 text-[12.5px] outline-none transition-colors text-[#333] placeholder:text-[#ccc]';
const lbl  = 'text-[9.5px] uppercase tracking-[0.14em] text-[#999] font-semibold block mb-1';
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
    <div className="border border-[#e0dbd2] rounded-sm p-2.5 focus-within:border-[#c5a059] transition-all cursor-text" onClick={() => ref.current?.focus()}>
      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {tags.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-[#f5f2ec] border border-[#e0dbd2] text-[#555] text-[10px] px-2 py-0.5 rounded-sm">
            {t}<button onClick={() => onChange(tags.filter((_, j) => j !== i))} className="text-[#bbb] hover:text-red-400"><X size={9}/></button>
          </span>
        ))}
        <input ref={ref} className="flex-1 min-w-[100px] bg-transparent text-[12px] outline-none text-[#333] placeholder:text-[#ccc]" value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey} onBlur={commit} placeholder={tags.length ? '' : placeholder} />
      </div>
      <p className="text-[9px] text-[#d0ccc5]">Enter or comma to add</p>
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
        <button onClick={add} className={addB}><Plus size={10}/> bullet</button>
      </div>
      <div className="space-y-1.5">
        {bullets.map((b, i) => (
          <div key={i} className="flex items-center gap-1.5 group">
            <span className="text-[#c5a059] text-base leading-none shrink-0">·</span>
            <input className={`${inp} flex-1`} value={b} onChange={e => upd(i, e.target.value)} placeholder="Achievement or responsibility…" />
            <button onClick={() => del(i)} className="shrink-0 text-[#ddd] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={11}/></button>
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
    <div className="border border-[#ebe7e0] rounded-sm overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#faf9f6] cursor-pointer" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-[12.5px] text-[#1a1a1a] truncate">{title || 'Untitled'}</span>
          {sub && <span className="text-[11px] text-[#aaa] truncate shrink-0">{sub}</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button onClick={e => { e.stopPropagation(); onRemove(); }} className="text-[#ccc] hover:text-red-400 transition-colors"><Trash2 size={12}/></button>
          {open ? <ChevronUp size={13} className="text-[#bbb]"/> : <ChevronDown size={13} className="text-[#bbb]"/>}
        </div>
      </div>
      {open && <div className="px-3.5 py-3.5 border-t border-[#f0ede8] space-y-3.5">{children}</div>}
    </div>
  );
}

/* ─── Editor Section Header ──────────────────────────────── */
function EHead({ icon, title, onAdd, label }: { icon: React.ReactNode; title: string; onAdd: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-[#c5a059]">{icon}</span>
        <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{title}</h3>
      </div>
      <button onClick={onAdd} className={addB}><Plus size={11}/> {label}</button>
    </div>
  );
}

/* ─── Preview Section Header ─────────────────────────────── */
function PH({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-serif-display italic text-[16px] text-[#111] shrink-0">{title}</h2>
      <div className="flex-1 h-px bg-[#f0eee9]"/>
    </div>
  );
}

/* ─── Preview Experience Row ─────────────────────────────── */
function PExp({ item }: { item: Experience | Internship }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-baseline mb-0.5">
        <h3 className="font-serif-display text-[14.5px] text-[#111]">{item.role}</h3>
        <span className="text-[9px] font-sans tracking-widest uppercase text-[#999] ml-3 shrink-0">{item.startDate}{item.startDate && item.endDate ? ' — ' : ''}{item.endDate}</span>
      </div>
      <div className="text-[#c5a059] text-[9.5px] tracking-[0.15em] uppercase font-sans mb-2">{item.company}</div>
      {item.bullets.filter(b => b.trim()).length > 0 && (
        <ul className="space-y-1.5">
          {item.bullets.filter(b => b.trim()).map((b, i) => (
            <li key={i} className="flex items-start text-[#444] text-[12px] leading-[1.65]">
              <span className="text-[#c5a059] mr-2 mt-0.5 text-base leading-none shrink-0">·</span>
              <span>{b}</span>
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
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

  const p = data.personalInfo;

  const navSections = [
    { id: 'personal',      label: 'Personal' },
    { id: 'summary',       label: 'Summary' },
    { id: 'experience',    label: 'Experience' },
    { id: 'internships',   label: 'Internships' },
    { id: 'projects',      label: 'Projects' },
    { id: 'education',     label: 'Education' },
    { id: 'certifications',label: 'Certifications' },
    { id: 'languages',     label: 'Languages' },
    { id: 'volunteer',     label: 'Volunteer' },
    { id: 'skills',        label: 'Skills' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f1ec] font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-serif-body    { font-family: 'Lora', serif; }
        .cscroll::-webkit-scrollbar { width: 4px; }
        .cscroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 8px; }
        .cscroll::-webkit-scrollbar-track { background: transparent; }
        select option { background: #fff; color: #333; }
      `}}/>

      {/* ══ LEFT: Editor ══════════════════════════════════════ */}
      <div className="w-[420px] shrink-0 flex flex-col bg-white border-r border-[#e8e4de] shadow-[2px_0_16px_rgba(0,0,0,0.04)]">

        {/* Top bar */}
        <div className="px-5 py-4 border-b border-[#f0ede8] shrink-0">
          <h1 className="font-serif-display text-[20px] text-[#1a1a1a] leading-none">Elegance</h1>
          <p className="text-[9px] tracking-[0.18em] uppercase text-[#aaa] mt-0.5">Document Builder</p>
        </div>

        {/* Section nav pills */}
        <div className="px-4 py-2.5 border-b border-[#f0ede8] flex gap-1.5 flex-wrap shrink-0">
          {navSections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-[9.5px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold transition-colors ${activeSection === s.id ? 'bg-[#1a1a1a] text-white' : 'bg-[#f4f1ec] text-[#888] hover:bg-[#eae6df] hover:text-[#555]'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto cscroll px-5 py-5 space-y-8">

          {/* Personal */}
          <div id="section-personal">
            <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Personal Details</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {([['name','Full Name','Jane Doe'],['title','Professional Title','Senior Designer'],['email','Email','jane@example.com'],['phone','Phone','+1 234 567 890'],['location','Location','New York, NY'],['website','Website','janedoe.com'],['linkedin','LinkedIn','linkedin.com/in/jane'],['github','GitHub','github.com/jane']] as [string,string,string][]).map(([f,label,ph]) => (
                  <div key={f}>
                    <label className={lbl}>{label}</label>
                    <input className={inp} placeholder={ph} value={(data.personalInfo as Record<string,string>)[f]} onChange={e => updP(f, e.target.value)}/>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-[#f0ede8]"/>

          {/* Summary */}
          <div id="section-summary">
            <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Professional Summary</h3>
            <label className={lbl}>Profile</label>
            <textarea
              className={`${inp2} min-h-[90px] resize-y leading-[1.6]`}
              value={data.summary}
              onChange={e => setData(d => ({ ...d, summary: e.target.value }))}
              placeholder="Brief professional overview…"
            />
          </div>

          <div className="h-px bg-[#f0ede8]"/>

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

          <div className="h-px bg-[#f0ede8]"/>

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

          <div className="h-px bg-[#f0ede8]"/>

          {/* Projects */}
          <div id="section-projects">
            <EHead icon={<Code2 size={14}/>} title="Projects" onAdd={proj.add} label="Add Project"/>
            <div className="space-y-2.5">
              {data.projects.length === 0 && <Empty label="projects"/>}
              {data.projects.map(it => (
                <Card key={it.id} title={it.name || 'New Project'} sub={it.tech.slice(0,2).join(', ')} onRemove={() => proj.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>Project Name</label><input className={inp} value={it.name} onChange={e => proj.upd(it.id,'name',e.target.value)}/></div>
                    <div><label className={lbl}>Start</label><input className={inp} placeholder="2022" value={it.startDate} onChange={e => proj.upd(it.id,'startDate',e.target.value)}/></div>
                    <div><label className={lbl}>End</label><input className={inp} placeholder="Present" value={it.endDate} onChange={e => proj.upd(it.id,'endDate',e.target.value)}/></div>
                    <div className="col-span-2"><label className={lbl}>URL</label><input className={inp} placeholder="github.com/user/project" value={it.url} onChange={e => proj.upd(it.id,'url',e.target.value)}/></div>
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

          <div className="h-px bg-[#f0ede8]"/>

          {/* Education */}
          <div id="section-education">
            <EHead icon={<BookOpen size={14}/>} title="Education" onAdd={edu.add} label="Add School"/>
            <div className="space-y-2.5">
              {data.education.length === 0 && <Empty label="education"/>}
              {data.education.map(it => (
                <Card key={it.id} title={it.school || 'New School'} sub={`${it.degree} ${it.field}`} onRemove={() => edu.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>School</label><input className={inp} value={it.school} onChange={e => edu.upd(it.id,'school',e.target.value)}/></div>
                    <div><label className={lbl}>Degree</label><input className={inp} placeholder="B.S." value={it.degree} onChange={e => edu.upd(it.id,'degree',e.target.value)}/></div>
                    <div><label className={lbl}>Field of Study</label><input className={inp} value={it.field} onChange={e => edu.upd(it.id,'field',e.target.value)}/></div>
                    <div><label className={lbl}>Year</label><input className={inp} placeholder="2017" value={it.year} onChange={e => edu.upd(it.id,'year',e.target.value)}/></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8]"/>

          {/* Certifications */}
          <div id="section-certifications">
            <EHead icon={<Award size={14}/>} title="Certifications" onAdd={cert.add} label="Add Cert"/>
            <div className="space-y-2.5">
              {data.certifications.length === 0 && <Empty label="certifications"/>}
              {data.certifications.map(it => (
                <Card key={it.id} title={it.name || 'New Certification'} sub={it.issuer} onRemove={() => cert.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>Name</label><input className={inp} value={it.name} onChange={e => cert.upd(it.id,'name',e.target.value)}/></div>
                    <div className="col-span-2"><label className={lbl}>Issuer</label><input className={inp} value={it.issuer} onChange={e => cert.upd(it.id,'issuer',e.target.value)}/></div>
                    <div><label className={lbl}>Year</label><input className={inp} placeholder="2023" value={it.year} onChange={e => cert.upd(it.id,'year',e.target.value)}/></div>
                    <div><label className={lbl}>Credential ID</label><input className={inp} placeholder="Optional" value={it.credentialId} onChange={e => cert.upd(it.id,'credentialId',e.target.value)}/></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8]"/>

          {/* Languages */}
          <div id="section-languages">
            <EHead icon={<span className="text-[13px] font-bold font-serif-display text-[#c5a059]">Aa</span>} title="Languages" onAdd={lang.add} label="Add Language"/>
            <div className="space-y-2.5">
              {data.languages.length === 0 && <Empty label="languages"/>}
              {data.languages.map(it => (
                <div key={it.id} className="flex items-end gap-3 group border border-[#ebe7e0] rounded-sm px-3 py-3 bg-[#faf9f6]">
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
                  <button onClick={() => lang.remove(it.id)} className="shrink-0 text-[#ccc] hover:text-red-400 transition-colors pb-1.5 opacity-0 group-hover:opacity-100"><Trash2 size={13}/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8]"/>

          {/* Volunteer */}
          <div id="section-volunteer">
            <EHead icon={<Heart size={14}/>} title="Volunteer" onAdd={vol.add} label="Add Entry"/>
            <div className="space-y-2.5">
              {data.volunteer.length === 0 && <Empty label="volunteer work"/>}
              {data.volunteer.map(it => (
                <Card key={it.id} title={it.role || 'New Entry'} sub={it.organization} onRemove={() => vol.remove(it.id)}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="col-span-2"><label className={lbl}>Organization</label><input className={inp} value={it.organization} onChange={e => vol.upd(it.id,'organization',e.target.value)}/></div>
                    <div className="col-span-2"><label className={lbl}>Role</label><input className={inp} value={it.role} onChange={e => vol.upd(it.id,'role',e.target.value)}/></div>
                    <div><label className={lbl}>Start</label><input className={inp} placeholder="2021" value={it.startDate} onChange={e => vol.upd(it.id,'startDate',e.target.value)}/></div>
                    <div><label className={lbl}>End</label><input className={inp} placeholder="Present" value={it.endDate} onChange={e => vol.upd(it.id,'endDate',e.target.value)}/></div>
                    <div className="col-span-2">
                      <label className={lbl}>Description</label>
                      <textarea className={`${inp2} min-h-[60px] resize-y leading-[1.55]`} value={it.description} onChange={e => vol.upd(it.id,'description',e.target.value)} placeholder="Describe your contribution…"/>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f0ede8]"/>

          {/* Skills */}
          <div id="section-skills">
            <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Expertise &amp; Skills</h3>
            <TagInput tags={data.skills} onChange={v => setData(d => ({ ...d, skills: v }))} placeholder="Type a skill and press Enter…"/>
          </div>

          <div className="pb-10"/>
        </div>

        {/* Export */}
        <div className="px-5 py-3.5 border-t border-[#f0ede8] shrink-0">
          <button className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-[#333] transition-colors rounded-sm">
            <Download size={13}/> Export PDF
          </button>
        </div>
      </div>

      {/* ══ RIGHT: Live Preview ════════════════════════════════ */}
      <div className="flex-1 overflow-y-auto cscroll bg-[#e8e4dc] py-10 px-8">
        <div className="max-w-[700px] mx-auto bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] font-serif-body text-[#222]">

          {/* Header */}
          <header className="px-12 pt-12 pb-8 text-center border-b border-[#f5f2ec] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"/>
            <h1 className="font-serif-display text-[36px] text-[#111] tracking-wide mt-3 leading-tight">{p.name || 'Your Name'}</h1>
            <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-[#999] mt-1.5 mb-5">{p.title || 'Professional Title'}</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[9.5px] font-sans text-[#666]">
              {p.location  && <span className="flex items-center gap-1"><MapPin   size={8} className="text-[#c5a059]"/>{p.location}</span>}
              {p.phone     && <span className="flex items-center gap-1"><Phone    size={8} className="text-[#c5a059]"/>{p.phone}</span>}
              {p.email     && <span className="flex items-center gap-1"><Mail     size={8} className="text-[#c5a059]"/>{p.email}</span>}
              {p.website   && <span className="flex items-center gap-1"><Globe    size={8} className="text-[#c5a059]"/>{p.website}</span>}
              {p.linkedin  && <span className="flex items-center gap-1"><Linkedin size={8} className="text-[#c5a059]"/>{p.linkedin}</span>}
              {p.github    && <span className="flex items-center gap-1"><Github   size={8} className="text-[#c5a059]"/>{p.github}</span>}
            </div>
          </header>

          {/* Body */}
          <div className="px-12 py-9 space-y-8 text-[12.5px] leading-[1.75]">

            {/* Summary */}
            {data.summary && (
              <section>
                <PH title="Profile"/>
                <p className="text-[#444] text-justify">{data.summary}</p>
              </section>
            )}

            {/* Skills */}
            {data.skills.filter(s => s.trim()).length > 0 && (
              <section>
                <PH title="Expertise"/>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.filter(s => s.trim()).map((s, i) => (
                    <span key={i} className="border border-[#e0dbd2] text-[#555] text-[10px] tracking-wide px-2 py-0.5 font-sans">{s.trim()}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <PH title="Experience"/>
                {data.experience.map(it => <PExp key={it.id} item={it}/>)}
              </section>
            )}

            {/* Internships */}
            {data.internships.length > 0 && (
              <section>
                <PH title="Internships"/>
                {data.internships.map(it => <PExp key={it.id} item={it}/>)}
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section>
                <PH title="Projects"/>
                <div className="space-y-5">
                  {data.projects.map(it => (
                    <div key={it.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-serif-display text-[14.5px] text-[#111]">{it.name}</h3>
                        <span className="text-[9px] font-sans tracking-widest uppercase text-[#999] ml-3 shrink-0">{it.startDate}{it.startDate && it.endDate ? ' — ' : ''}{it.endDate}</span>
                      </div>
                      {it.url && <div className="text-[#c5a059] text-[9.5px] tracking-wide font-sans mb-1.5">{it.url}</div>}
                      {it.description && <p className="text-[#444] text-justify mb-2">{it.description}</p>}
                      {it.tech.filter(t => t.trim()).length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {it.tech.filter(t => t.trim()).map((t, i) => <span key={i} className="border border-[#ede9e2] text-[#777] text-[9px] px-1.5 py-0.5 font-sans">{t}</span>)}
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
                <PH title="Education"/>
                <div className="space-y-4">
                  {data.education.map(it => (
                    <div key={it.id}>
                      <h3 className="font-serif-display text-[14.5px] text-[#111]">{it.school}</h3>
                      <div className="text-[#444] mt-0.5">{it.degree} {it.field}</div>
                      <div className="text-[#c5a059] text-[9.5px] tracking-widest uppercase font-sans mt-0.5">{it.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <section>
                <PH title="Certifications"/>
                <div className="space-y-3.5">
                  {data.certifications.map(it => (
                    <div key={it.id} className="flex items-start gap-4">
                      <div className="w-1 h-full shrink-0 mt-1 rounded-full bg-[#e0dbd2]"/>
                      <div>
                        <div className="font-medium text-[#1a1a1a] text-[12.5px]">{it.name}</div>
                        <div className="text-[#888] text-[11px]">{it.issuer}</div>
                        <div className="text-[#c5a059] text-[9.5px] tracking-widest uppercase font-sans mt-0.5">{it.year}{it.credentialId ? ` · ${it.credentialId}` : ''}</div>
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
                  {data.languages.map(it => (
                    <div key={it.id} className="border border-[#f0ede8] px-3 py-2.5 text-center">
                      <div className="font-medium text-[#1a1a1a] text-[12.5px]">{it.language}</div>
                      <div className="text-[#999] text-[10px] font-sans mt-0.5">{it.proficiency}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Volunteer */}
            {data.volunteer.length > 0 && (
              <section>
                <PH title="Volunteer"/>
                <div className="space-y-5">
                  {data.volunteer.map(it => (
                    <div key={it.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-serif-display text-[14.5px] text-[#111]">{it.role}</h3>
                        <span className="text-[9px] font-sans tracking-widest uppercase text-[#999] ml-3 shrink-0">{it.startDate}{it.startDate && it.endDate ? ' — ' : ''}{it.endDate}</span>
                      </div>
                      <div className="text-[#c5a059] text-[9.5px] tracking-[0.15em] uppercase font-sans mb-1.5">{it.organization}</div>
                      {it.description && <p className="text-[#444] text-justify">{it.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-[10.5px] text-[#ccc] italic text-center py-4 border border-dashed border-[#ebe7e0] rounded-sm">No {label} added yet</p>;
}
