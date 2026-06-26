import React, { useState } from 'react';
import { Plus, Trash2, Download, ChevronDown, ChevronUp } from 'lucide-react';

const initialData = {
  personalInfo: {
    name: "Alex Morgan",
    title: "Senior Software Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexmorgan.dev"
  },
  summary: "Craft-driven software engineer with 8+ years of experience building elegant, scalable systems. Specialized in frontend architecture and polished user interfaces. Passionate about bridging the gap between rigorous engineering and thoughtful design to create memorable digital experiences.",
  experience: [
    {
      id: "1",
      company: "Stripe",
      role: "Senior Frontend Engineer",
      startDate: "2020",
      endDate: "Present",
      bullets: [
        "Led the frontend architecture for the new Billing dashboard, improving load times by 35% through meticulous code splitting and state management.",
        "Collaborated directly with the design systems team to implement a suite of highly accessible, fluidly animated components.",
        "Mentored 4 mid-level engineers, fostering a culture of craftsmanship and rigorous code reviews."
      ]
    },
    {
      id: "2",
      company: "Vercel",
      role: "Software Engineer",
      startDate: "2017",
      endDate: "2020",
      bullets: [
        "Developed core features for the deployment dashboard, focusing on real-time log streaming and intuitive data visualization.",
        "Optimized the core web vitals of the marketing site, achieving perfect Lighthouse scores across all key pages.",
        "Authored comprehensive technical documentation that reduced onboarding time for new hires by 20%."
      ]
    }
  ],
  education: [
    {
      id: "1",
      school: "Stanford University",
      degree: "BS in Computer Science",
      year: "2017"
    }
  ],
  skills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS", "Framer Motion", "System Architecture", "Web Performance"]
};

const inputClass = "w-full bg-transparent border-b border-[#e5e1d8] focus:border-[#c5a059] py-2 px-1 text-[13px] outline-none transition-colors text-[#333] placeholder:text-[#c2c0bb]";
const labelClass = "text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold block mb-1.5";
const sectionTitleClass = "text-xl font-serif-display text-[#111] mb-6";

function ExpCard({ exp, update, remove }: { exp: any, update: any, remove: any }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="bg-[#fdfdfc] border border-[#e5e1d8] p-5 relative transition-all hover:border-[#d5d1c8]">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h4 className="font-medium text-[14px] text-[#1a1a1a]">{exp.role || 'New Role'}</h4>
          <div className="text-[12px] text-[#888] mt-0.5">{exp.company || 'Company Name'}</div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); remove(); }} 
            className="text-[#c2c0bb] hover:text-red-500 transition-colors p-1"
            title="Remove Role"
          >
            <Trash2 size={14}/>
          </button>
          {isOpen ? <ChevronUp size={16} className="text-[#a09e98]" /> : <ChevronDown size={16} className="text-[#a09e98]" />}
        </div>
      </div>
      
      {isOpen && (
        <div className="pt-6 mt-4 border-t border-[#f0eee9] grid grid-cols-2 gap-x-5 gap-y-5 animate-in slide-in-from-top-2 duration-200">
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>Company</label>
            <input className={inputClass} value={exp.company} onChange={e => update('company', e.target.value)} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>Role</label>
            <input className={inputClass} value={exp.role} onChange={e => update('role', e.target.value)} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>Start Date</label>
            <input className={inputClass} value={exp.startDate} onChange={e => update('startDate', e.target.value)} placeholder="e.g. 2020" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>End Date</label>
            <input className={inputClass} value={exp.endDate} onChange={e => update('endDate', e.target.value)} placeholder="e.g. Present" />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Description (One bullet per line)</label>
            <textarea 
              className={`${inputClass} min-h-[100px] resize-y leading-[1.6]`}
              value={exp.bullets.join('\n')}
              onChange={e => update('bullets', e.target.value.split('\n'))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function EduCard({ edu, update, remove }: { edu: any, update: any, remove: any }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="bg-[#fdfdfc] border border-[#e5e1d8] p-5 relative transition-all hover:border-[#d5d1c8]">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h4 className="font-medium text-[14px] text-[#1a1a1a]">{edu.school || 'New School'}</h4>
          <div className="text-[12px] text-[#888] mt-0.5">{edu.degree || 'Degree'}</div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); remove(); }} 
            className="text-[#c2c0bb] hover:text-red-500 transition-colors p-1"
            title="Remove School"
          >
            <Trash2 size={14}/>
          </button>
          {isOpen ? <ChevronUp size={16} className="text-[#a09e98]" /> : <ChevronDown size={16} className="text-[#a09e98]" />}
        </div>
      </div>
      
      {isOpen && (
        <div className="pt-6 mt-4 border-t border-[#f0eee9] grid grid-cols-2 gap-x-5 gap-y-5 animate-in slide-in-from-top-2 duration-200">
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>School / Institution</label>
            <input className={inputClass} value={edu.school} onChange={e => update('school', e.target.value)} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>Degree</label>
            <input className={inputClass} value={edu.degree} onChange={e => update('degree', e.target.value)} />
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

export function Elegance() {
  const [data, setData] = useState(initialData);
  const [mobileView, setMobileView] = useState<'editor'|'preview'>('editor');

  const updatePersonal = (field: string, value: string) => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  const updateSummary = (value: string) => setData(prev => ({ ...prev, summary: value }));
  const updateSkills = (skills: string[]) => setData(prev => ({ ...prev, skills }));
  
  const addExp = () => setData(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', bullets: [] }] }));
  const updateExp = (id: string, field: string, value: any) => setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));
  const removeExp = (id: string) => setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  
  const addEdu = () => setData(prev => ({ ...prev, education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', year: '' }] }));
  const updateEdu = (id: string, field: string, value: any) => setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));
  const removeEdu = (id: string) => setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#e8e6e1] text-[#222] font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-serif-body { font-family: 'Lora', serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.2); }
      `}} />

      {/* Mobile Toggle */}
      <div className="lg:hidden flex border-b border-[#e5e1d8] bg-[#faf9f6] shrink-0 z-20 relative">
        <button 
          className={`flex-1 py-4 text-xs tracking-widest uppercase font-medium transition-colors ${mobileView === 'editor' ? 'text-[#1a1a1a] border-b-[3px] border-[#1a1a1a] bg-white' : 'text-[#888] border-b-[3px] border-transparent hover:bg-[#f2f0eb]'}`}
          onClick={() => setMobileView('editor')}
        >
          Editor
        </button>
        <button 
          className={`flex-1 py-4 text-xs tracking-widest uppercase font-medium transition-colors ${mobileView === 'preview' ? 'text-[#1a1a1a] border-b-[3px] border-[#1a1a1a] bg-white' : 'text-[#888] border-b-[3px] border-transparent hover:bg-[#f2f0eb]'}`}
          onClick={() => setMobileView('preview')}
        >
          Preview
        </button>
      </div>

      {/* Left Panel - Editor */}
      <div className={`w-full lg:w-[45%] h-full flex-col border-r border-[#e5e1d8] bg-white z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative shrink-0 ${mobileView === 'editor' ? 'flex' : 'hidden lg:flex'}`}>
        
        <div className="px-8 py-6 border-b border-[#e5e1d8] flex justify-between items-center bg-[#faf9f6]">
          <div>
            <h1 className="font-serif-display text-2xl text-[#1a1a1a]">Elegance</h1>
            <p className="text-[10px] tracking-widest uppercase text-[#888] mt-1 font-semibold">Document Builder</p>
          </div>
          <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 text-[11px] font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors">
            <Download size={14} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#faf9f6]">
          <div className="space-y-12 max-w-xl mx-auto pb-24">
            
            <section>
              <h2 className={sectionTitleClass}>Personal Details</h2>
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
                  <input className={inputClass} placeholder="jane@example.com" value={data.personalInfo.email} onChange={e => updatePersonal('email', e.target.value)} />
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
              </div>
            </section>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e5e1d8] to-transparent" />

            <section>
              <h2 className={sectionTitleClass}>Professional Summary</h2>
              <div>
                <label className={labelClass}>Profile</label>
                <textarea 
                  className={`${inputClass} min-h-[120px] resize-y leading-[1.6]`} 
                  placeholder="A brief overview of your professional background and goals..."
                  value={data.summary}
                  onChange={e => updateSummary(e.target.value)}
                />
              </div>
            </section>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e5e1d8] to-transparent" />

            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif-display text-[#222]">Experience</h2>
                <button onClick={addExp} className="text-[11px] flex items-center gap-1 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold">
                  <Plus size={14} /> Add Role
                </button>
              </div>
              <div className="space-y-4">
                {data.experience.map(exp => (
                  <ExpCard key={exp.id} exp={exp} update={(field: string, val: any) => updateExp(exp.id, field, val)} remove={() => removeExp(exp.id)} />
                ))}
              </div>
            </section>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e5e1d8] to-transparent" />

            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif-display text-[#222]">Education</h2>
                <button onClick={addEdu} className="text-[11px] flex items-center gap-1 text-[#c5a059] hover:text-[#a38040] transition-colors uppercase tracking-wider font-semibold">
                  <Plus size={14} /> Add School
                </button>
              </div>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <EduCard key={edu.id} edu={edu} update={(field: string, val: any) => updateEdu(edu.id, field, val)} remove={() => removeEdu(edu.id)} />
                ))}
              </div>
            </section>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e5e1d8] to-transparent" />

            <section>
              <h2 className={sectionTitleClass}>Expertise</h2>
              <div>
                <label className={labelClass}>Skills (comma separated)</label>
                <textarea 
                  className={`${inputClass} min-h-[80px] resize-y leading-[1.6]`} 
                  placeholder="Brand Strategy, Typography, Art Direction..."
                  value={data.skills.join(', ')}
                  onChange={e => updateSkills(e.target.value.split(','))}
                />
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className={`w-full lg:w-[55%] h-[calc(100vh-53px)] lg:h-full bg-[#e8e6e1] overflow-y-auto p-4 md:p-8 lg:p-12 flex justify-center items-start custom-scrollbar ${mobileView === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        
        <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.03)] w-full max-w-[850px] min-h-[1100px] p-[50px] md:p-[70px] lg:p-[80px] shrink-0 text-[#222]">
          
          <header className="text-center mb-14 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-[#c5a059]"></div>
             
             <h1 className="font-serif-display text-4xl md:text-5xl text-[#111] mb-4 mt-6 tracking-wide">{data.personalInfo.name || 'Your Name'}</h1>
             <p className="font-serif-body text-[13px] tracking-[0.2em] uppercase text-[#888] mb-8">{data.personalInfo.title || 'Professional Title'}</p>
             
             <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] font-sans text-[#666] tracking-widest uppercase">
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
             </div>
          </header>

          <div className="space-y-12 font-serif-body text-[13.5px] leading-[1.8]">
            
            {data.summary && (
              <section>
                <div className="flex items-center gap-4 mb-5">
                  <h2 className="font-serif-display italic text-xl text-[#111]">Profile</h2>
                  <div className="flex-1 h-px bg-[#f0eee9]"></div>
                </div>
                <p className="text-[#444] text-justify">{data.summary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-serif-display italic text-xl text-[#111]">Experience</h2>
                  <div className="flex-1 h-px bg-[#f0eee9]"></div>
                </div>
                <div className="space-y-10">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="relative">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1 sm:gap-4">
                        <h3 className="font-serif-display text-lg text-[#111]">{exp.role}</h3>
                        <span className="text-[11px] text-[#888] tracking-widest uppercase font-sans shrink-0">
                          {exp.startDate} {exp.startDate && exp.endDate && '—'} {exp.endDate}
                        </span>
                      </div>
                      <div className="text-[#c5a059] text-[11px] tracking-[0.15em] uppercase font-sans mb-4">{exp.company}</div>
                      <ul className="space-y-3">
                        {exp.bullets.filter(b => b.trim() !== '').map((b, i) => (
                          <li key={i} className="text-[#444] flex items-start text-justify">
                            <span className="text-[#c5a059] mr-3 mt-[0.1em] text-lg leading-none">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
              {data.education.length > 0 && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-serif-display italic text-xl text-[#111]">Education</h2>
                    <div className="flex-1 h-px bg-[#f0eee9]"></div>
                  </div>
                  <div className="space-y-6">
                    {data.education.map(edu => (
                      <div key={edu.id}>
                        <h3 className="font-serif-display text-[17px] text-[#111] mb-1">{edu.school}</h3>
                        <div className="text-[#444] text-[13.5px] mb-2">{edu.degree}</div>
                        <div className="text-[#c5a059] text-[10px] tracking-[0.15em] uppercase font-sans">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {data.skills.length > 0 && data.skills.some(s => s.trim() !== '') && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-serif-display italic text-xl text-[#111]">Expertise</h2>
                    <div className="flex-1 h-px bg-[#f0eee9]"></div>
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-2">
                    {data.skills.filter(s => s.trim() !== '').map((skill, i, arr) => (
                      <span key={i} className="text-[#444] text-[13.5px] tracking-wide">
                        {skill.trim()}{i < arr.length - 1 ? <span className="text-[#c5a059] mx-2">/</span> : ''}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
