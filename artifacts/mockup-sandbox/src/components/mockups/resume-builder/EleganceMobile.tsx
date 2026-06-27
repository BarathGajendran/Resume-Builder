import React, { useState } from 'react';
import { 
  Download, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe,
  Plus
} from 'lucide-react';

export default function EleganceMobile() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [activeSection, setActiveSection] = useState('Personal');

  const demoData = {
    name: "Alex Morgan",
    title: "Senior Software Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    summary: "Craft-driven software engineer with 8+ years building elegant, scalable systems.",
    experience: [{ 
      role: "Senior Frontend Engineer", 
      company: "Stripe", 
      dates: "2020 — Present", 
      bullets: [
        "Led frontend architecture for new Billing dashboard, improving load times by 35%.", 
        "Implemented accessible, fluidly animated UI components."
      ] 
    }],
    education: [{ 
      degree: "B.S. Computer Science", 
      school: "Stanford University", 
      year: "2017" 
    }],
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS", "Framer Motion"]
  };

  const sections = ['Personal', 'Summary', 'Experience', 'Education', 'Skills'];

  return (
    <div className="flex flex-col min-h-[100dvh] w-full bg-[#f4f1ec] font-sans overflow-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white border-b border-[#e8e4de] shadow-sm shrink-0">
        <div className="flex items-baseline gap-2">
          <h1 className="font-['Playfair_Display'] text-[18px] text-[#1a1a1a] leading-none">Elegance</h1>
          <span className="text-[9px] uppercase tracking-widest text-[#aaa] font-medium leading-none">Resume Builder</span>
        </div>
        <button className="text-[#1a1a1a] p-1">
          <Download size={18} strokeWidth={1.5} />
        </button>
      </header>

      {/* Tab Bar */}
      <div className="sticky top-[49px] z-10 flex bg-white border-b border-[#e8e4de] shrink-0">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-3 text-[13px] tracking-wide transition-colors ${
            activeTab === 'edit' 
              ? 'border-b-2 border-[#c5a059] text-[#1a1a1a] font-semibold' 
              : 'text-[#999] font-medium border-b-2 border-transparent'
          }`}
        >
          Edit
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-[13px] tracking-wide transition-colors ${
            activeTab === 'preview' 
              ? 'border-b-2 border-[#c5a059] text-[#1a1a1a] font-semibold' 
              : 'text-[#999] font-medium border-b-2 border-transparent'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto relative">
        {activeTab === 'edit' ? (
          <div className="bg-white min-h-full pb-24">
            {/* Section Pills */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#f4f1ec] py-3 px-4 flex gap-2 overflow-x-auto scrollbar-hide">
              {sections.map(sec => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                    activeSection === sec
                      ? 'bg-[#1a1a1a] text-white'
                      : 'bg-[#f4f1ec] text-[#888]'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Form Sections */}
            <div className="p-5 space-y-8">
              
              {/* Personal Details */}
              <section className="space-y-5">
                <h2 className="font-['Playfair_Display'] text-[16px] text-[#1a1a1a]">Personal Details</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div className="col-span-2">
                    <label className="block text-[9px] uppercase tracking-wider text-[#999] mb-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={demoData.name}
                      className="w-full bg-transparent border-b border-[#e0dbd2] py-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] uppercase tracking-wider text-[#999] mb-1">Professional Title</label>
                    <input 
                      type="text" 
                      defaultValue={demoData.title}
                      className="w-full bg-transparent border-b border-[#e0dbd2] py-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#999] mb-1">Email</label>
                    <input 
                      type="email" 
                      defaultValue={demoData.email}
                      className="w-full bg-transparent border-b border-[#e0dbd2] py-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#999] mb-1">Phone</label>
                    <input 
                      type="tel" 
                      defaultValue={demoData.phone}
                      className="w-full bg-transparent border-b border-[#e0dbd2] py-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] uppercase tracking-wider text-[#999] mb-1">Location</label>
                    <input 
                      type="text" 
                      defaultValue={demoData.location}
                      className="w-full bg-transparent border-b border-[#e0dbd2] py-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] uppercase tracking-wider text-[#999] mb-1">LinkedIn</label>
                    <input 
                      type="text" 
                      defaultValue={demoData.linkedin}
                      className="w-full bg-transparent border-b border-[#e0dbd2] py-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] uppercase tracking-wider text-[#999] mb-1">GitHub</label>
                    <input 
                      type="text" 
                      defaultValue={demoData.github}
                      className="w-full bg-transparent border-b border-[#e0dbd2] py-2 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section className="space-y-4 pt-4 border-t border-[#f4f1ec]">
                <h2 className="font-['Playfair_Display'] text-[16px] text-[#1a1a1a]">Professional Summary</h2>
                <div>
                  <textarea 
                    defaultValue={demoData.summary}
                    className="w-full bg-transparent border border-[#e0dbd2] rounded p-3 text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#c5a059] transition-colors min-h-[100px] resize-y"
                  />
                </div>
              </section>

              {/* Experience */}
              <section className="space-y-4 pt-4 border-t border-[#f4f1ec]">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Playfair_Display'] text-[16px] text-[#1a1a1a]">Experience</h2>
                  <button className="text-[11px] font-medium text-[#c5a059] uppercase tracking-wider flex items-center gap-1">
                    <Plus size={12} strokeWidth={2} /> Add
                  </button>
                </div>
                
                <div className="border border-[#ebe7e0] rounded-lg overflow-hidden">
                  <div className="bg-[#faf9f6] px-4 py-3 flex items-center justify-between cursor-pointer border-b border-[#ebe7e0]">
                    <div>
                      <div className="text-[13px] font-medium text-[#1a1a1a]">{demoData.experience[0].role}</div>
                      <div className="text-[11px] text-[#666]">{demoData.experience[0].company} • {demoData.experience[0].dates}</div>
                    </div>
                    <ChevronDown size={16} className="text-[#999]" />
                  </div>
                  {/* Collapsed body would go here if expanded */}
                </div>
              </section>
              
              {/* Education */}
              <section className="space-y-4 pt-4 border-t border-[#f4f1ec]">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Playfair_Display'] text-[16px] text-[#1a1a1a]">Education</h2>
                  <button className="text-[11px] font-medium text-[#c5a059] uppercase tracking-wider flex items-center gap-1">
                    <Plus size={12} strokeWidth={2} /> Add
                  </button>
                </div>
                
                <div className="border border-[#ebe7e0] rounded-lg overflow-hidden">
                  <div className="bg-[#faf9f6] px-4 py-3 flex items-center justify-between cursor-pointer border-b border-[#ebe7e0]">
                    <div>
                      <div className="text-[13px] font-medium text-[#1a1a1a]">{demoData.education[0].degree}</div>
                      <div className="text-[11px] text-[#666]">{demoData.education[0].school} • {demoData.education[0].year}</div>
                    </div>
                    <ChevronDown size={16} className="text-[#999]" />
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="space-y-4 pt-4 border-t border-[#f4f1ec]">
                <h2 className="font-['Playfair_Display'] text-[16px] text-[#1a1a1a]">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {demoData.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-full border border-[#e0dbd2] text-[12px] text-[#1a1a1a] bg-white">
                      {skill}
                    </span>
                  ))}
                  <button className="px-3 py-1.5 rounded-full border border-dashed border-[#c5a059] text-[12px] text-[#c5a059] bg-[#faf9f6] flex items-center gap-1">
                    <Plus size={12} /> Add skill
                  </button>
                </div>
              </section>

            </div>

            {/* FAB */}
            <button className="fixed bottom-6 right-4 z-30 bg-[#1a1a1a] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2">
              <Download size={14} strokeWidth={2} />
              <span className="text-[11px] tracking-wider uppercase font-medium">Export PDF</span>
            </button>
          </div>
        ) : (
          <div className="bg-[#e8e4dc] min-h-full p-4 pb-10">
            {/* Resume Preview */}
            <div className="bg-white shadow-md w-full p-6 pt-10 min-h-[600px]">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="font-['Playfair_Display'] text-[24px] leading-tight text-[#1a1a1a] mb-1">{demoData.name}</h1>
                <p className="text-[12px] text-[#c5a059] uppercase tracking-[0.15em] font-medium mb-4">{demoData.title}</p>
                
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] text-[#666]">
                  <span className="flex items-center gap-1"><Mail size={10} /> {demoData.email}</span>
                  <span className="flex items-center gap-1"><Phone size={10} /> {demoData.phone}</span>
                  <span className="flex items-center gap-1"><MapPin size={10} /> {demoData.location}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] text-[#666] mt-2">
                  <span className="flex items-center gap-1"><Linkedin size={10} /> {demoData.linkedin.replace('linkedin.com/in/', '')}</span>
                  <span className="flex items-center gap-1"><Github size={10} /> {demoData.github.replace('github.com/', '')}</span>
                </div>
              </div>

              {/* Profile */}
              <div className="mb-6">
                <h2 className="font-['Playfair_Display'] text-[14px] text-[#1a1a1a] border-b border-[#e0dbd2] pb-1 mb-3 relative">
                  Profile
                  <div className="absolute bottom-[-1px] left-0 w-8 h-[1px] bg-[#c5a059]"></div>
                </h2>
                <p className="text-[11px] leading-[1.6] text-[#444]">
                  {demoData.summary}
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h2 className="font-['Playfair_Display'] text-[14px] text-[#1a1a1a] border-b border-[#e0dbd2] pb-1 mb-4 relative">
                  Experience
                  <div className="absolute bottom-[-1px] left-0 w-8 h-[1px] bg-[#c5a059]"></div>
                </h2>
                
                {demoData.experience.map((exp, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[12px] font-semibold text-[#1a1a1a]">{exp.role}</h3>
                      <span className="text-[10px] text-[#666]">{exp.dates}</span>
                    </div>
                    <div className="text-[11px] text-[#c5a059] font-medium mb-2">{exp.company}</div>
                    <ul className="space-y-1.5 pl-3">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-[11px] leading-[1.5] text-[#444] relative before:content-[''] before:absolute before:left-[-10px] before:top-[6px] before:w-[3px] before:h-[3px] before:bg-[#c5a059] before:rounded-full">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="font-['Playfair_Display'] text-[14px] text-[#1a1a1a] border-b border-[#e0dbd2] pb-1 mb-4 relative">
                  Education
                  <div className="absolute bottom-[-1px] left-0 w-8 h-[1px] bg-[#c5a059]"></div>
                </h2>
                
                {demoData.education.map((edu, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[12px] font-semibold text-[#1a1a1a]">{edu.degree}</h3>
                      <span className="text-[10px] text-[#666]">{edu.year}</span>
                    </div>
                    <div className="text-[11px] text-[#444]">{edu.school}</div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h2 className="font-['Playfair_Display'] text-[14px] text-[#1a1a1a] border-b border-[#e0dbd2] pb-1 mb-4 relative">
                  Expertise
                  <div className="absolute bottom-[-1px] left-0 w-8 h-[1px] bg-[#c5a059]"></div>
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {demoData.skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] bg-[#f8f7f5] text-[#444] px-2.5 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
      
      {/* Scrollbar hiding styles injected via style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
