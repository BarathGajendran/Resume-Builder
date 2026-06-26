import React, { useState } from "react";
import { Plus, Trash2, Mail, Phone, MapPin, Linkedin, Github, ChevronRight, Terminal } from "lucide-react";

// Types
interface Experience {
  id: string;
  company: string;
  role: string;
  dates: string;
  bullets: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  dates: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

const defaultData: ResumeData = {
  personalInfo: {
    name: "Alex Morgan",
    title: "Senior Systems Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
  },
  summary: "Systems-focused software engineer with 7+ years of experience building scalable backend architectures and high-performance APIs. Passionate about distributed systems, observability, and developer tooling.",
  experience: [
    {
      id: "1",
      company: "Stripe",
      role: "Staff Software Engineer",
      dates: "2021 - Present",
      bullets: [
        "Led the migration of the core billing engine from Ruby to Go, reducing latency by 45% and saving $2M annually in compute costs.",
        "Architected a distributed event-streaming platform using Kafka, processing over 10B events daily with 99.999% uptime.",
        "Mentored a team of 6 engineers, standardizing CI/CD pipelines and improving deployment frequency by 3x."
      ],
    },
    {
      id: "2",
      company: "Datadog",
      role: "Senior Software Engineer",
      dates: "2018 - 2021",
      bullets: [
        "Developed custom metric aggregation pipelines processing 5M data points per second.",
        "Built internal CLI tools in Rust to streamline developer environments, cutting onboarding time from 3 days to 4 hours."
      ],
    },
  ],
  education: [
    {
      id: "1",
      school: "University of Waterloo",
      degree: "B.S. Computer Science",
      dates: "2014 - 2018",
    },
  ],
  skills: ["Go", "Rust", "TypeScript", "Kubernetes", "Kafka", "PostgreSQL", "AWS", "gRPC", "Redis", "Docker"],
};

export function TechPro() {
  const [data, setData] = useState<ResumeData>(defaultData);

  // Handlers for Personal Info
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      personalInfo: { ...data.personalInfo, [e.target.name]: e.target.value },
    });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, summary: e.target.value });
  };

  // Handlers for Experience
  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        { id: Math.random().toString(), company: "", role: "", dates: "", bullets: [""] },
      ],
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setData({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    setData({ ...data, experience: data.experience.filter((exp) => exp.id !== id) });
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    setData({
      ...data,
      experience: data.experience.map((exp) => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[bulletIndex] = value;
          return { ...exp, bullets: newBullets };
        }
        return exp;
      }),
    });
  };

  const addBullet = (expId: string) => {
    setData({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ""] } : exp
      ),
    });
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    setData({
      ...data,
      experience: data.experience.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIndex) };
        }
        return exp;
      }),
    });
  };

  // Handlers for Education
  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...data.education,
        { id: Math.random().toString(), school: "", degree: "", dates: "" },
      ],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    setData({ ...data, education: data.education.filter((edu) => edu.id !== id) });
  };

  // Handlers for Skills
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setData({ ...data, skills: e.target.value.split(",").map((s) => s.trim()) });
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-slate-300 overflow-hidden font-sans selection:bg-cyan-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Custom scrollbar for editor */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #09090b;
        }
        ::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}} />

      {/* LEFT PANEL: EDITOR */}
      <div className="w-full lg:w-[500px] h-full flex flex-col border-r border-[#1e1e24] bg-[#0d0d12] z-10 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="h-14 border-b border-[#1e1e24] flex items-center px-6 shrink-0 bg-[#0d0d12]">
          <Terminal className="w-5 h-5 text-cyan-400 mr-3" />
          <h1 className="font-mono text-sm font-medium tracking-wide text-slate-100">
            ~/resume-builder/config.yml
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10">
          
          {/* PERSONAL INFO */}
          <section className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="text-slate-600">01.</span> PERSONAL_INFO
              <div className="h-px bg-[#1e1e24] flex-1 ml-2"></div>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <EditorInput label="name" name="name" value={data.personalInfo.name} onChange={handlePersonalInfoChange} />
              </div>
              <div className="col-span-2">
                <EditorInput label="title" name="title" value={data.personalInfo.title} onChange={handlePersonalInfoChange} />
              </div>
              <EditorInput label="email" name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} />
              <EditorInput label="phone" name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} />
              <EditorInput label="location" name="location" value={data.personalInfo.location} onChange={handlePersonalInfoChange} />
              <div className="col-span-2">
                <EditorInput label="linkedin" name="linkedin" value={data.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
              </div>
              <div className="col-span-2">
                <EditorInput label="github" name="github" value={data.personalInfo.github} onChange={handlePersonalInfoChange} />
              </div>
            </div>
          </section>

          {/* SUMMARY */}
          <section className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="text-slate-600">02.</span> SUMMARY
              <div className="h-px bg-[#1e1e24] flex-1 ml-2"></div>
            </h2>
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-slate-500 pl-1 block">description_markdown</label>
              <textarea
                className="w-full bg-[#13141a] border border-[#1e1e24] rounded-md p-3 text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-y min-h-[120px]"
                value={data.summary}
                onChange={handleSummaryChange}
                placeholder="Enter a professional summary..."
              />
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="text-slate-600">03.</span> EXPERIENCE
              <div className="h-px bg-[#1e1e24] flex-1 ml-2"></div>
            </h2>
            
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={exp.id} className="p-4 bg-[#13141a] border border-[#1e1e24] rounded-md relative group">
                  <button 
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-3 right-3 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-[10px] font-mono text-slate-600 mb-3 block">experience[{i}]</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <EditorInput label="company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                    <EditorInput label="role" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
                    <div className="col-span-2">
                      <EditorInput label="dates" value={exp.dates} onChange={(e) => updateExperience(exp.id, "dates", e.target.value)} placeholder="e.g. 2021 - Present" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-slate-500 pl-1 block">bullets_array</label>
                    {exp.bullets.map((bullet, bi) => (
                      <div key={bi} className="flex gap-2 items-start">
                        <span className="text-cyan-600 mt-2 font-mono text-xs">-</span>
                        <textarea
                          className="flex-1 bg-[#09090b] border border-[#1e1e24] rounded p-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 resize-y min-h-[60px]"
                          value={bullet}
                          onChange={(e) => updateBullet(exp.id, bi, e.target.value)}
                        />
                        <button 
                          onClick={() => removeBullet(exp.id, bi)}
                          className="mt-2 text-slate-600 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => addBullet(exp.id)}
                      className="text-[11px] font-mono text-slate-500 hover:text-cyan-400 flex items-center gap-1 mt-2 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> append_bullet()
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={addExperience}
              className="w-full py-3 border border-dashed border-[#27272a] rounded-md text-xs font-mono text-slate-500 hover:border-cyan-500/50 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> push_experience()
            </button>
          </section>

          {/* EDUCATION */}
          <section className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="text-slate-600">04.</span> EDUCATION
              <div className="h-px bg-[#1e1e24] flex-1 ml-2"></div>
            </h2>
            
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={edu.id} className="p-4 bg-[#13141a] border border-[#1e1e24] rounded-md relative group">
                  <button 
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-3 right-3 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-[10px] font-mono text-slate-600 mb-3 block">education[{i}]</div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <EditorInput label="school" value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} />
                    <EditorInput label="degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                    <EditorInput label="dates" value={edu.dates} onChange={(e) => updateEducation(edu.id, "dates", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={addEducation}
              className="w-full py-3 border border-dashed border-[#27272a] rounded-md text-xs font-mono text-slate-500 hover:border-cyan-500/50 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> push_education()
            </button>
          </section>

          {/* SKILLS */}
          <section className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="text-slate-600">05.</span> SKILLS
              <div className="h-px bg-[#1e1e24] flex-1 ml-2"></div>
            </h2>
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-slate-500 pl-1 block">skills_array_csv</label>
              <textarea
                className="w-full bg-[#13141a] border border-[#1e1e24] rounded-md p-3 text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-y min-h-[80px]"
                value={data.skills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="React, TypeScript, Node.js..."
              />
            </div>
          </section>

          <div className="h-10"></div> {/* Bottom padding */}
        </div>
      </div>

      {/* RIGHT PANEL: PREVIEW */}
      <div className="flex-1 bg-[#09090b] flex flex-col h-full overflow-hidden relative">
        <div className="h-14 border-b border-[#1e1e24] flex items-center justify-between px-6 bg-[#09090b] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            <span className="font-mono text-xs text-slate-500 ml-2">build/resume.pdf</span>
          </div>
          <button className="px-4 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono rounded border border-cyan-500/30 transition-colors flex items-center gap-2">
            export_pdf()
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 flex justify-center items-start">
          
          {/* THE RESUME DOCUMENT */}
          <div className="w-full max-w-[850px] bg-[#0d0d12] border border-[#1e1e24] shadow-[0_0_40px_rgba(0,240,255,0.05)] text-slate-300 p-12 overflow-hidden relative group">
            
            {/* Subtle grid background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
            
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50"></div>
            
            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col gap-10">
              
              {/* HEADER */}
              <header className="border-b border-[#1e1e24] pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100 mb-2">
                      {data.personalInfo.name || "YOUR NAME"}
                    </h1>
                    <div className="text-cyan-400 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      {data.personalInfo.title || "SOFTWARE ENGINEER"}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-400 items-start md:items-end">
                    {data.personalInfo.email && (
                      <div className="flex items-center gap-2">
                        <span>{data.personalInfo.email}</span>
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    )}
                    {data.personalInfo.phone && (
                      <div className="flex items-center gap-2">
                        <span>{data.personalInfo.phone}</span>
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    )}
                    {data.personalInfo.location && (
                      <div className="flex items-center gap-2">
                        <span>{data.personalInfo.location}</span>
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    )}
                    {(data.personalInfo.linkedin || data.personalInfo.github) && (
                      <div className="flex items-center gap-3 mt-1">
                        {data.personalInfo.linkedin && (
                          <div className="flex items-center gap-1.5">
                            <Linkedin className="w-3.5 h-3.5 text-slate-500" />
                            <span>{data.personalInfo.linkedin.replace(/(^\w+:|^)\/\//, '')}</span>
                          </div>
                        )}
                        {data.personalInfo.github && (
                          <div className="flex items-center gap-1.5">
                            <Github className="w-3.5 h-3.5 text-slate-500" />
                            <span>{data.personalInfo.github.replace(/(^\w+:|^)\/\//, '')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-12">
                
                {/* LEFT COLUMN - MAIN */}
                <div className="space-y-10">
                  
                  {/* SUMMARY */}
                  {data.summary && (
                    <section>
                      <h3 className="font-mono text-xs font-bold text-slate-100 uppercase tracking-widest mb-4 flex items-center">
                        <span className="text-cyan-500 mr-2">/</span> SUMMARY
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-400">
                        {data.summary}
                      </p>
                    </section>
                  )}

                  {/* EXPERIENCE */}
                  {data.experience.length > 0 && (
                    <section>
                      <h3 className="font-mono text-xs font-bold text-slate-100 uppercase tracking-widest mb-6 flex items-center">
                        <span className="text-cyan-500 mr-2">/</span> EXPERIENCE
                      </h3>
                      <div className="space-y-8">
                        {data.experience.map((exp) => (
                          <div key={exp.id} className="relative pl-4 border-l border-[#1e1e24]">
                            <div className="absolute w-2 h-2 rounded-full bg-cyan-500 -left-[4.5px] top-1.5 shadow-[0_0_8px_rgba(0,240,255,0.6)]"></div>
                            <div className="flex flex-col mb-3">
                              <div className="flex justify-between items-baseline gap-4">
                                <h4 className="text-base font-semibold text-slate-200">{exp.role}</h4>
                                <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{exp.dates}</span>
                              </div>
                              <div className="text-cyan-400 font-mono text-xs mt-0.5">{exp.company}</div>
                            </div>
                            <ul className="space-y-2 mt-3">
                              {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                                <li key={i} className="text-sm text-slate-400 leading-relaxed flex items-start gap-3">
                                  <span className="text-cyan-800 font-mono mt-0.5 select-none">{'>'}</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="space-y-10">
                  
                  {/* SKILLS */}
                  {data.skills.length > 0 && (
                    <section>
                      <h3 className="font-mono text-xs font-bold text-slate-100 uppercase tracking-widest mb-4 flex items-center">
                        <span className="text-cyan-500 mr-2">/</span> TECHNICAL_SKILLS
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {data.skills.filter(s => s.trim()).map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-[#13141a] border border-[#1e1e24] rounded text-xs font-mono text-slate-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* EDUCATION */}
                  {data.education.length > 0 && (
                    <section>
                      <h3 className="font-mono text-xs font-bold text-slate-100 uppercase tracking-widest mb-4 flex items-center">
                        <span className="text-cyan-500 mr-2">/</span> EDUCATION
                      </h3>
                      <div className="space-y-6">
                        {data.education.map((edu) => (
                          <div key={edu.id} className="relative pl-3 border-l border-[#1e1e24]">
                            <h4 className="text-sm font-semibold text-slate-200">{edu.degree}</h4>
                            <div className="text-cyan-400 font-mono text-xs mt-1">{edu.school}</div>
                            <div className="text-xs font-mono text-slate-500 mt-1">{edu.dates}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponent for form inputs
function EditorInput({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder 
}: { 
  label: string; 
  name?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="font-mono text-[10px] text-slate-500 pl-1 block">{label}</label>
      <input
        type="text"
        name={name}
        className="w-full bg-[#13141a] border border-[#1e1e24] rounded-md px-3 py-2 text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
