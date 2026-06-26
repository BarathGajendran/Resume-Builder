import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Mail, Phone, MapPin, Linkedin, Plus, Trash2, FileText } from 'lucide-react';

export function Corporate() {
  const [data, setData] = useState({
    personal: {
      name: "Alex Morgan",
      title: "Senior Software Engineer",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      linkedin: "linkedin.com/in/alexmorgan"
    },
    summary: "Senior Software Engineer with 8+ years of experience architecting scalable, high-performance distributed systems for tier-one financial institutions. Expert in cloud-native microservices, event-driven architectures, and driving engineering excellence across global teams. Proven track record of reducing system latency by 40% and leading full-lifecycle delivery of mission-critical trading platforms.",
    experience: [
      {
        id: 1,
        company: "Goldman Sachs",
        role: "Senior Software Engineer / VP",
        dates: "2020 - Present",
        location: "New York, NY",
        bullets: "Architected and delivered a low-latency microservices platform for fixed-income trading using Java, Spring Boot, and Apache Kafka, processing $5B+ in daily transactions.\nSpearheaded the migration of legacy monoliths to AWS, implementing robust CI/CD pipelines and reducing deployment times from days to under 45 minutes.\nManaged and mentored a squad of 6 engineers, establishing rigorous code review standards and test-driven development practices."
      },
      {
        id: 2,
        company: "Bloomberg LP",
        role: "Software Engineer",
        dates: "2016 - 2020",
        location: "New York, NY",
        bullets: "Developed high-throughput market data ingestion pipelines in C++ and Python, improving data delivery latency by 30% during peak volatility.\nDesigned a real-time analytics dashboard used by 10,000+ terminal subscribers to track macroeconomic indicators.\nCollaborated cross-functionally with product managers and quantitative analysts to translate complex financial models into production-ready code."
      }
    ],
    education: [
      {
        id: 1,
        institution: "Carnegie Mellon University",
        degree: "M.S. in Computer Science",
        dates: "2014 - 2016",
        details: "Focus on Distributed Systems and Machine Learning"
      },
      {
        id: 2,
        institution: "University of Michigan",
        degree: "B.S. in Computer Engineering",
        dates: "2010 - 2014",
        details: "Magna Cum Laude, GPA: 3.8/4.0"
      }
    ],
    skills: "Languages: Java, Python, C++, TypeScript, Go\nArchitecture: Microservices, Event-Driven, System Design\nCloud & Data: AWS, Kubernetes, Kafka, PostgreSQL, Redis\nPractices: CI/CD, TDD, Agile/Scrum, Team Leadership"
  });

  const handlePersonalChange = (field: string, value: string) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateExperience = (id: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now(), company: '', role: '', dates: '', location: '', bullets: '' }
      ]
    }));
  };

  const removeExperience = (id: number) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateEducation = (id: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), institution: '', degree: '', dates: '', details: '' }
      ]
    }));
  };

  const removeEducation = (id: number) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-4">
      <h2 className="text-[#1e3a5f] text-sm font-bold uppercase tracking-widest">{title}</h2>
      <div className="w-full h-[2px] bg-[#1e3a5f] mt-1 mb-1"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-inter overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; border: 2px solid transparent; background-clip: padding-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; border: 2px solid transparent; background-clip: padding-box; }
      `}} />

      {/* LEFT PANEL: EDITOR */}
      <aside className="w-full md:w-[480px] bg-white border-r border-slate-200 flex flex-col h-screen shrink-0 relative z-10 shadow-lg">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e3a5f] text-white rounded-md flex items-center justify-center shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">Resume Builder</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Corporate Variant</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <Accordion type="single" collapsible defaultValue="personal" className="space-y-4">
            
            {/* Personal Info */}
            <AccordionItem value="personal" className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 text-[13px] font-bold uppercase text-slate-700 tracking-wider">
                Personal Information
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
                    <Input className="bg-white h-9" value={data.personal.name} onChange={e => handlePersonalChange('name', e.target.value)} />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Professional Title</label>
                    <Input className="bg-white h-9" value={data.personal.title} onChange={e => handlePersonalChange('title', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Email</label>
                    <Input className="bg-white h-9" value={data.personal.email} onChange={e => handlePersonalChange('email', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Phone</label>
                    <Input className="bg-white h-9" value={data.personal.phone} onChange={e => handlePersonalChange('phone', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Location</label>
                    <Input className="bg-white h-9" value={data.personal.location} onChange={e => handlePersonalChange('location', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">LinkedIn</label>
                    <Input className="bg-white h-9" value={data.personal.linkedin} onChange={e => handlePersonalChange('linkedin', e.target.value)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Summary */}
            <AccordionItem value="summary" className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 text-[13px] font-bold uppercase text-slate-700 tracking-wider">
                Professional Summary
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Summary Statement</label>
                  <Textarea className="h-32 bg-white text-sm" value={data.summary} onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Experience */}
            <AccordionItem value="experience" className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 text-[13px] font-bold uppercase text-slate-700 tracking-wider">
                Work Experience
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border border-slate-200 rounded-md bg-white shadow-sm relative group transition-all hover:border-slate-300">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => removeExperience(exp.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5 col-span-2 sm:col-span-1">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Company</label>
                          <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="h-9 text-sm bg-slate-50/50" />
                        </div>
                        <div className="space-y-1.5 col-span-2 sm:col-span-1">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Role</label>
                          <Input value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} className="h-9 text-sm bg-slate-50/50" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Dates</label>
                          <Input value={exp.dates} onChange={(e) => updateExperience(exp.id, 'dates', e.target.value)} className="h-9 text-sm bg-slate-50/50" placeholder="e.g. 2020 - Present" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Location</label>
                          <Input value={exp.location} onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} className="h-9 text-sm bg-slate-50/50" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Accomplishments (1 per line)</label>
                        <Textarea value={exp.bullets} onChange={(e) => updateExperience(exp.id, 'bullets', e.target.value)} className="h-32 text-sm bg-slate-50/50 leading-relaxed" />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-dashed border-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 transition-colors h-12" onClick={addExperience}>
                    <Plus size={16} className="mr-2" /> Add Experience
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Education */}
            <AccordionItem value="education" className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 text-[13px] font-bold uppercase text-slate-700 tracking-wider">
                Education
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border border-slate-200 rounded-md bg-white shadow-sm relative group transition-all hover:border-slate-300">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => removeEducation(edu.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Institution</label>
                          <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="h-9 text-sm bg-slate-50/50" />
                        </div>
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Degree</label>
                          <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="h-9 text-sm bg-slate-50/50" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Dates</label>
                          <Input value={edu.dates} onChange={(e) => updateEducation(edu.id, 'dates', e.target.value)} className="h-9 text-sm bg-slate-50/50" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Honors/Details</label>
                          <Input value={edu.details} onChange={(e) => updateEducation(edu.id, 'details', e.target.value)} className="h-9 text-sm bg-slate-50/50" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-dashed border-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 transition-colors h-12" onClick={addEducation}>
                    <Plus size={16} className="mr-2" /> Add Education
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Skills */}
            <AccordionItem value="skills" className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 text-[13px] font-bold uppercase text-slate-700 tracking-wider">
                Core Competencies
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Skills (One category per line recommended)</label>
                  <Textarea 
                    value={data.skills} 
                    onChange={(e) => setData(prev => ({ ...prev, skills: e.target.value }))} 
                    className="h-32 text-sm bg-white" 
                    placeholder="Languages: Java, Python, C++&#10;Cloud: AWS, Kubernetes" 
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </aside>

      {/* RIGHT PANEL: LIVE PREVIEW */}
      <main className="flex-1 h-screen overflow-auto bg-[#eef1f6] p-4 md:p-8 flex justify-center items-start custom-scrollbar">
        {/* A4 Page Container (Approximate proportions) */}
        <div className="w-full max-w-[800px] min-h-[1131px] bg-white shadow-xl rounded-[1px] overflow-hidden flex flex-col shrink-0 text-slate-900 mb-8 border border-slate-200">
          
          {/* Resume Header (Navy) */}
          <div className="bg-[#1e3a5f] text-white px-10 sm:px-12 py-10 flex flex-col justify-center border-b-[6px] border-[#132a48]">
            <h1 className="text-4xl sm:text-[42px] font-bold uppercase tracking-[0.08em] leading-none mb-2">{data.personal.name}</h1>
            <h2 className="text-lg sm:text-xl font-medium text-blue-200/90 tracking-wider mb-6">{data.personal.title}</h2>
            
            <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 text-[13px] font-medium text-blue-100/90 tracking-wide">
              {data.personal.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-300" /> 
                  <span>{data.personal.email}</span>
                </div>
              )}
              {data.personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-300" /> 
                  <span>{data.personal.phone}</span>
                </div>
              )}
              {data.personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-blue-300" /> 
                  <span>{data.personal.location}</span>
                </div>
              )}
              {data.personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={14} className="text-blue-300" /> 
                  <span>{data.personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Resume Body */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_320px] gap-10 px-10 sm:px-12 py-10 bg-white">
            
            {/* Main Column (Left) */}
            <div className="space-y-8">
              
              <section>
                <SectionHeader title="Professional Summary" />
                <p className="text-slate-800 text-[13.5px] leading-[1.65] font-normal">
                  {data.summary}
                </p>
              </section>

              <section>
                <SectionHeader title="Professional Experience" />
                <div className="space-y-7">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-1 gap-1 sm:gap-0">
                        <h3 className="font-bold text-slate-900 text-[14.5px] uppercase tracking-wider">{exp.company}</h3>
                        <span className="text-slate-600 text-[12px] font-bold uppercase tracking-widest">{exp.location}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-1 sm:gap-0">
                        <h4 className="font-bold text-[#1e3a5f] text-[13.5px] italic">{exp.role}</h4>
                        <span className="text-[#1e3a5f] text-[13px] font-bold tracking-wide">{exp.dates}</span>
                      </div>
                      <ul className="list-disc pl-4 text-[13.5px] text-slate-800 space-y-2 font-normal leading-[1.6]">
                        {exp.bullets.split('\n').filter(b => b.trim() !== '').map((b, i) => (
                          <li key={i} className="pl-1">{b.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Column (Right) */}
            <div className="space-y-8">
              
              <section>
                <SectionHeader title="Core Competencies" />
                <ul className="flex flex-col gap-2.5 mt-4">
                  {data.skills.split('\n').filter(s => s.trim() !== '').map((skill, i) => {
                    if (skill.includes(':')) {
                      const [cat, ...rest] = skill.split(':');
                      return (
                        <li key={i} className="text-[13px] text-slate-800 leading-relaxed">
                          <span className="font-bold text-[#1e3a5f] uppercase tracking-wider text-[11px] block mb-0.5">{cat}</span>
                          <span className="font-normal">{rest.join(':')}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={i} className="text-[13px] text-slate-800 flex items-start gap-2">
                        <span className="text-[#1e3a5f] shrink-0 font-bold">•</span>
                        <span className="leading-snug font-normal">{skill.trim()}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section>
                <SectionHeader title="Education" />
                <div className="space-y-6 mt-4">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-slate-900 text-[13.5px] leading-snug">{edu.institution}</h3>
                      <div className="text-[#1e3a5f] font-bold text-[13px] mt-1 leading-snug italic">{edu.degree}</div>
                      <div className="text-slate-600 text-[11.5px] font-bold uppercase tracking-widest mt-2 mb-1">{edu.dates}</div>
                      {edu.details && <div className="text-slate-800 text-[12.5px] font-normal leading-snug mt-1.5">{edu.details}</div>}
                    </div>
                  ))}
                </div>
              </section>
              
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
