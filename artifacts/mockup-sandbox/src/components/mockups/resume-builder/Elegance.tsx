import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, ChevronDown, ChevronUp, X, Github, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */
interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  year: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

/* ─── Initial Data ───────────────────────────────────── */
const initialData: ResumeData = {
  personalInfo: {
    name: 'Alex Morgan',
    title: 'Senior Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
  },
  summary:
    'Craft-driven software engineer with 8+ years of experience building elegant, scalable systems. Specialized in frontend architecture and polished user interfaces. Passionate about bridging the gap between rigorous engineering and thoughtful design to create memorable digital experiences.',
  experience: [
    {
      id: '1',
      company: 'Stripe',
      role: 'Senior Frontend Engineer',
      startDate: '2020',
      endDate: 'Present',
      bullets: [
        'Led the frontend architecture for the new Billing dashboard, improving load times by 35% through meticulous code splitting and state management.',
        'Collaborated with the design systems team to implement a suite of highly accessible, fluidly animated components.',
        'Mentored 4 mid-level engineers, fostering a culture of craftsmanship and rigorous code reviews.',
      ],
    },
    {
      id: '2',
      company: 'Vercel',
      role: 'Software Engineer',
      startDate: '2017',
      endDate: '2020',
      bullets: [
        'Developed core features for the deployment dashboard, focusing on real-time log streaming and intuitive data visualization.',
        'Optimized core web vitals of the marketing site, achieving perfect Lighthouse scores across all key pages.',
        'Authored comprehensive technical documentation that reduced onboarding time for new hires by 20%.',
      ],
    },
  ],
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'B.S.',
      field: 'Computer Science',
      year: '2017',
    },
  ],
  skills: [
    'React', 'TypeScript', 'Next.js', 'GraphQL',
    'Tailwind CSS', 'Framer Motion', 'System Architecture', 'Web Performance',
  ],
};

/* ─── Shared Styles ─────────────────────────────────── */
const inputClass =
  'w-full bg-transparent border-b border-[#e5e1d8] focus:border-[#c5a059] py-2 px-1 text-[13px] outline-none transition-colors text-[#333] placeholder:text-[#c2c0bb]';
const labelClass =
  'text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold block mb-1.5';
const sectionHeadClass =
  'text-xl font-serif-display text-[#111] mb-6';

/* ─── Experience Card ───────────────────────────────── */
function ExpCard({ exp, update, remove }: {
  exp: Experience;
  update: (field: string, val: string | string[]) => void;
  remove: () => void;
}) {
  const [open, setOpen] = useState(true);

  const addBullet = () => update('bullets', [...exp.bullets, '']);
  const updateBullet = (i: number, val: string) => {
    const next = [...exp.bullets];
    next[i] = val;
    update('bullets', next);
  };
  const removeBullet = (i: number) => update('bullets', exp.bullets.filter((_, j) => j !== i));

  return (
    <div className="bg-[#fdfdfc] border border-[#e5e1d8] p-5 transition-all hover:border-[#d5d1c8]">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <h4 className="font-medium text-[14px] text-[#1a1a1a]">{exp.role || 'New Role'}</h4>
          <div className="text-[12px] text-[#888] mt-0.5">{exp.company || 'Company Name'}</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={e => { e.stopPropagation(); remove(); }}
            className="text-[#c2c0bb] hover:text-red-400 transition-colors p-1"
          >
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} className="text-[#a09e98]" /> : <ChevronDown size={16} className="text-[#a09e98]" />}
        </div>
      </div>

      {open && (
        <div className="pt-5 mt-4 border-t border-[#f0eee9] space-y-5 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            <div>
              <label className={labelClass}>Company</label>
              <input className={inputClass} value={exp.company} onChange={e => update('company', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Role</label>
              <input className={inputClass} value={exp.role} onChange={e => update('role', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Start Date</label>
              <input className={inputClass} value={exp.startDate} onChange={e => update('startDate', e.target.value)} placeholder="e.g. 2020" />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input className={inputClass} value={exp.endDate} onChange={e => update('endDate', e.target.value)} placeholder="e.g. Present" />
            </div>
          </div>

          {/* Per-bullet management */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className={labelClass}>Highlights</label>
              <button
                onClick={addBullet}
                className="text-[10px] flex items-center gap-1 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold"
              >
                <Plus size={11} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {exp.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 group">
                  <span className="text-[#c5a059] mt-[9px] text-base leading-none shrink-0">·</span>
                  <input
                    className={`${inputClass} flex-1`}
                    value={b}
                    onChange={e => updateBullet(i, e.target.value)}
                    placeholder="Describe an achievement or responsibility…"
                  />
                  <button
                    onClick={() => removeBullet(i)}
                    className="text-[#d9d6d0] hover:text-red-400 transition-colors mt-2 shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
              {exp.bullets.length === 0 && (
                <p className="text-[11px] text-[#c2c0bb] italic py-1">No highlights yet — click Add to begin.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Education Card ────────────────────────────────── */
function EduCard({ edu, update, remove }: {
  edu: Education;
  update: (field: string, val: string) => void;
  remove: () => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-[#fdfdfc] border border-[#e5e1d8] p-5 transition-all hover:border-[#d5d1c8]">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <h4 className="font-medium text-[14px] text-[#1a1a1a]">{edu.school || 'New School'}</h4>
          <div className="text-[12px] text-[#888] mt-0.5">{edu.degree} {edu.field}</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={e => { e.stopPropagation(); remove(); }}
            className="text-[#c2c0bb] hover:text-red-400 transition-colors p-1"
          >
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} className="text-[#a09e98]" /> : <ChevronDown size={16} className="text-[#a09e98]" />}
        </div>
      </div>

      {open && (
        <div className="pt-5 mt-4 border-t border-[#f0eee9] grid grid-cols-2 gap-x-5 gap-y-5 animate-in slide-in-from-top-2 duration-200">
          <div className="col-span-2">
            <label className={labelClass}>School / Institution</label>
            <input className={inputClass} value={edu.school} onChange={e => update('school', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Degree (e.g. B.S.)</label>
            <input className={inputClass} value={edu.degree} onChange={e => update('degree', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Field of Study</label>
            <input className={inputClass} value={edu.field} onChange={e => update('field', e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Graduation Year</label>
            <input className={inputClass} value={edu.year} onChange={e => update('year', e.target.value)} placeholder="e.g. 2017" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Skills Tag Input ──────────────────────────────── */
function SkillTagInput({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add();
    } else if (e.key === 'Backspace' && input === '' && skills.length > 0) {
      onChange(skills.slice(0, -1));
    }
  };

  return (
    <div>
      {/* Tag pills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-[#f5f3ef] border border-[#e5e1d8] text-[#444] text-[11px] tracking-wide px-3 py-1.5 font-medium"
            >
              {s}
              <button
                onClick={() => onChange(skills.filter((_, j) => j !== i))}
                className="text-[#c2c0bb] hover:text-red-400 transition-colors"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        className="flex items-center border-b border-[#e5e1d8] focus-within:border-[#c5a059] transition-colors cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          className="flex-1 bg-transparent py-2 px-1 text-[13px] outline-none text-[#333] placeholder:text-[#c2c0bb]"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={add}
          placeholder="Type a skill and press Enter…"
        />
        {input.trim() && (
          <button
            onClick={add}
            className="text-[#c5a059] text-[10px] font-semibold uppercase tracking-wider px-2 pb-0.5 hover:text-[#a38040] transition-colors"
          >
            Add
          </button>
        )}
      </div>
      <p className="text-[10px] text-[#c2c0bb] mt-1.5">Press Enter or comma to add · Backspace to remove last</p>
    </div>
  );
}

/* ─── Resume Preview ────────────────────────────────── */
function ResumePreview({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, experience, education, skills } = data;

  return (
    <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.03)] w-full max-w-[860px] min-h-[1100px] shrink-0 text-[#222] overflow-hidden font-serif-body">

      {/* Header */}
      <header className="px-14 pt-14 pb-10 text-center border-b border-[#f0eee9] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
        <h1 className="font-serif-display text-[42px] text-[#111] tracking-wide mt-4 leading-tight">
          {p.name || 'Your Name'}
        </h1>
        <p className="font-sans text-[11.5px] tracking-[0.22em] uppercase text-[#888] mt-2 mb-7">
          {p.title || 'Professional Title'}
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1.5 text-[10.5px] font-sans text-[#666] tracking-wider">
          {p.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={10} className="text-[#c5a059]" />{p.location}
            </span>
          )}
          {p.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={10} className="text-[#c5a059]" />{p.phone}
            </span>
          )}
          {p.email && (
            <span className="flex items-center gap-1.5">
              <Mail size={10} className="text-[#c5a059]" />{p.email}
            </span>
          )}
          {p.website && (
            <span className="flex items-center gap-1.5">
              <Globe size={10} className="text-[#c5a059]" />{p.website}
            </span>
          )}
          {p.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin size={10} className="text-[#c5a059]" />{p.linkedin}
            </span>
          )}
          {p.github && (
            <span className="flex items-center gap-1.5">
              <Github size={10} className="text-[#c5a059]" />{p.github}
            </span>
          )}
        </div>
      </header>

      {/* Two-column body */}
      <div className="flex">

        {/* ── Main column ── */}
        <div className="flex-1 px-10 py-10 space-y-10 text-[13.5px] leading-[1.82] border-r border-[#f0eee9]">

          {/* Profile */}
          {summary && (
            <section>
              <PreviewSectionHead title="Profile" />
              <p className="text-[#444] text-justify">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <PreviewSectionHead title="Experience" />
              <div className="space-y-9">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-serif-display text-[17px] text-[#111]">{exp.role}</h3>
                      <span className="text-[10px] font-sans tracking-widest uppercase text-[#888] shrink-0 ml-4">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                      </span>
                    </div>
                    <div className="text-[#c5a059] text-[10.5px] tracking-[0.15em] uppercase font-sans mb-3">
                      {exp.company}
                    </div>
                    {exp.bullets.filter(b => b.trim()).length > 0 && (
                      <ul className="space-y-2.5">
                        {exp.bullets.filter(b => b.trim()).map((b, i) => (
                          <li key={i} className="flex items-start text-[#444]">
                            <span className="text-[#c5a059] mr-3 mt-0.5 text-lg leading-none shrink-0">·</span>
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
        </div>

        {/* ── Sidebar column ── */}
        <div className="w-[220px] shrink-0 px-7 py-10 space-y-9 bg-[#faf9f7] text-[12.5px] leading-[1.75]">

          {/* Skills as pill badges */}
          {skills.filter(s => s.trim()).length > 0 && (
            <section>
              <SidebarSectionHead title="Expertise" />
              <div className="flex flex-wrap gap-1.5">
                {skills.filter(s => s.trim()).map((s, i) => (
                  <span
                    key={i}
                    className="inline-block border border-[#e0dbd2] text-[#555] text-[10px] tracking-wide px-2.5 py-1 font-sans leading-none"
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <SidebarSectionHead title="Education" />
              <div className="space-y-5">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-serif-display text-[14px] text-[#111] leading-snug">{edu.school}</div>
                    <div className="text-[#555] text-[11.5px] mt-0.5">{edu.degree} {edu.field}</div>
                    <div className="text-[#c5a059] text-[10px] tracking-widest uppercase font-sans mt-1">{edu.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  );
}

function PreviewSectionHead({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="font-serif-display italic text-[19px] text-[#111] shrink-0">{title}</h2>
      <div className="flex-1 h-px bg-[#f0eee9]" />
    </div>
  );
}

function SidebarSectionHead({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-sans text-[9.5px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-2">{title}</h3>
      <div className="h-px bg-[#e8e4dd]" />
    </div>
  );
}

/* ─── Root Component ────────────────────────────────── */
export function Elegance() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  /* Personal info */
  const updatePersonal = (field: string, value: string) =>
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  /* Experience */
  const addExp = () =>
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', bullets: [] }],
    }));
  const updateExp = (id: string, field: string, val: string | string[]) =>
    setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: val } : e) }));
  const removeExp = (id: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  /* Education */
  const addEdu = () =>
    setData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', field: '', year: '' }],
    }));
  const updateEdu = (id: string, field: string, val: string) =>
    setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: val } : e) }));
  const removeEdu = (id: string) =>
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#e8e6e1] text-[#222] font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
          .font-serif-display { font-family: 'Playfair Display', serif; }
          .font-serif-body    { font-family: 'Lora', serif; }
          .custom-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.08); border-radius: 10px; }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.18); }
        `
      }} />

      {/* Mobile toggle */}
      <div className="lg:hidden flex border-b border-[#e5e1d8] bg-[#faf9f6] shrink-0 z-20">
        {(['editor', 'preview'] as const).map(v => (
          <button
            key={v}
            className={`flex-1 py-4 text-xs tracking-widest uppercase font-medium transition-colors ${mobileView === v ? 'text-[#1a1a1a] border-b-[3px] border-[#1a1a1a] bg-white' : 'text-[#888] border-b-[3px] border-transparent'}`}
            onClick={() => setMobileView(v)}
          >
            {v}
          </button>
        ))}
      </div>

      {/* ── Editor Panel ── */}
      <div className={`w-full lg:w-[44%] h-full flex-col border-r border-[#e5e1d8] bg-white z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0 ${mobileView === 'editor' ? 'flex' : 'hidden lg:flex'}`}>

        {/* Header */}
        <div className="px-8 py-5 border-b border-[#e5e1d8] flex justify-between items-center bg-[#faf9f6]">
          <div>
            <h1 className="font-serif-display text-2xl text-[#1a1a1a]">Elegance</h1>
            <p className="text-[10px] tracking-widest uppercase text-[#888] mt-0.5 font-semibold">Document Builder</p>
          </div>
          <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 text-[11px] font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors">
            <Download size={13} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#faf9f6]">
          <div className="space-y-10 max-w-xl mx-auto pb-24">

            {/* Personal Details */}
            <section>
              <h2 className={sectionHeadClass}>Personal Details</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Full Name</label>
                  <input className={inputClass} placeholder="Jane Doe" value={data.personalInfo.name} onChange={e => updatePersonal('name', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Professional Title</label>
                  <input className={inputClass} placeholder="Senior Designer" value={data.personalInfo.title} onChange={e => updatePersonal('title', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Email Address</label>
                  <input className={inputClass} type="email" placeholder="jane@example.com" value={data.personalInfo.email} onChange={e => updatePersonal('email', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Phone Number</label>
                  <input className={inputClass} placeholder="+1 234 567 890" value={data.personalInfo.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Location</label>
                  <input className={inputClass} placeholder="New York, NY" value={data.personalInfo.location} onChange={e => updatePersonal('location', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Website / Portfolio</label>
                  <input className={inputClass} placeholder="janedoe.com" value={data.personalInfo.website} onChange={e => updatePersonal('website', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>LinkedIn</label>
                  <input className={inputClass} placeholder="linkedin.com/in/jane" value={data.personalInfo.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>GitHub</label>
                  <input className={inputClass} placeholder="github.com/jane" value={data.personalInfo.github} onChange={e => updatePersonal('github', e.target.value)} />
                </div>
              </div>
            </section>

            <Divider />

            {/* Summary */}
            <section>
              <h2 className={sectionHeadClass}>Professional Summary</h2>
              <label className={labelClass}>Profile</label>
              <textarea
                className={`${inputClass} min-h-[110px] resize-y leading-[1.65]`}
                placeholder="A brief overview of your professional background and goals…"
                value={data.summary}
                onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}
              />
            </section>

            <Divider />

            {/* Experience */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif-display text-[#222]">Experience</h2>
                <button onClick={addExp} className="text-[11px] flex items-center gap-1 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold">
                  <Plus size={13} /> Add Role
                </button>
              </div>
              <div className="space-y-4">
                {data.experience.map(exp => (
                  <ExpCard
                    key={exp.id}
                    exp={exp}
                    update={(field, val) => updateExp(exp.id, field, val)}
                    remove={() => removeExp(exp.id)}
                  />
                ))}
                {data.experience.length === 0 && (
                  <p className="text-[12px] text-[#c2c0bb] italic text-center py-6 border border-dashed border-[#e5e1d8]">
                    No experience added yet
                  </p>
                )}
              </div>
            </section>

            <Divider />

            {/* Education */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif-display text-[#222]">Education</h2>
                <button onClick={addEdu} className="text-[11px] flex items-center gap-1 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold">
                  <Plus size={13} /> Add School
                </button>
              </div>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <EduCard
                    key={edu.id}
                    edu={edu}
                    update={(field, val) => updateEdu(edu.id, field, val)}
                    remove={() => removeEdu(edu.id)}
                  />
                ))}
                {data.education.length === 0 && (
                  <p className="text-[12px] text-[#c2c0bb] italic text-center py-6 border border-dashed border-[#e5e1d8]">
                    No education added yet
                  </p>
                )}
              </div>
            </section>

            <Divider />

            {/* Skills */}
            <section>
              <h2 className={sectionHeadClass}>Expertise</h2>
              <SkillTagInput
                skills={data.skills}
                onChange={skills => setData(prev => ({ ...prev, skills }))}
              />
            </section>

          </div>
        </div>
      </div>

      {/* ── Preview Panel ── */}
      <div className={`w-full lg:flex-1 h-[calc(100vh-53px)] lg:h-full bg-[#e8e6e1] overflow-y-auto p-6 md:p-10 flex justify-center items-start custom-scrollbar ${mobileView === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        <ResumePreview data={data} />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e5e1d8] to-transparent" />;
}
