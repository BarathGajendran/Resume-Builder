import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  GraduationCap, 
  User, 
  FileText, 
  Sparkles,
  Link as LinkIcon,
  MapPin,
  Mail,
  Phone,
  Download,
  Wand2
} from 'lucide-react';

// --- Types ---
type Section = 'personal' | 'summary' | 'experience' | 'education' | 'skills';

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

// --- Initial Data ---
const initialData: ResumeData = {
  personal: {
    name: 'Alex Morgan',
    title: 'Senior Software Engineer',
    email: 'hello@alexmorgan.dev',
    phone: '+1 555 019 8273',
    location: 'Brooklyn, NY',
    linkedin: 'linkedin.com/in/alexmdev',
    website: 'alexmorgan.dev'
  },
  summary: 'Creative technologist and Senior Software Engineer specializing in highly interactive, design-driven web experiences. Bridging the gap between ambitious visual design and robust, scalable frontend architecture. Passionate about webgl, micro-interactions, and performance.',
  experience: [
    {
      id: '1',
      company: 'Studio Vanguard',
      role: 'Lead Creative Developer',
      startDate: '2021',
      endDate: 'Present',
      description: 'Lead frontend engineering for award-winning digital experiences. Architected a proprietary WebGL rendering engine used across 12+ international brand campaigns. Mentored a team of 4 creative developers and bridged workflows between design and engineering.'
    },
    {
      id: '2',
      company: 'Neon Digital',
      role: 'Frontend Engineer',
      startDate: '2018',
      endDate: '2021',
      description: 'Built complex web applications with React, Three.js, and Framer Motion. Reduced initial load times by 40% across flagship products through aggressive code splitting and asset optimization. Collaborated directly with art directors on interactive prototypes.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'Rhode Island School of Design',
      degree: 'BFA Graphic Design',
      year: '2014 - 2018'
    }
  ],
  skills: ['TypeScript', 'React & Next.js', 'WebGL / Three.js', 'Framer Motion', 'CSS Architecture', 'UI/UX Design', 'Figma', 'Performance Tuning']
};

// --- Subcomponents ---
const Input = ({ label, value, onChange, placeholder, type = 'text' }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:border-[#2E1065] focus:bg-white focus:ring-1 focus:ring-[#2E1065] rounded-xl outline-none transition-all font-['DM_Sans',sans-serif] text-sm text-neutral-800 placeholder:text-neutral-400"
    />
  </div>
);

const Textarea = ({ label, value, onChange, placeholder }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">{label}</label>
    <textarea 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:border-[#2E1065] focus:bg-white focus:ring-1 focus:ring-[#2E1065] rounded-xl outline-none transition-all font-['DM_Sans',sans-serif] text-sm text-neutral-800 placeholder:text-neutral-400 resize-none"
    />
  </div>
);

const AccordionSection = ({ title, icon, isExpanded, onToggle, children, accentColor }: any) => {
  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-neutral-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'border-neutral-200 hover:border-neutral-300'}`}>
       <button 
         onClick={onToggle}
         className="w-full flex items-center justify-between p-5 bg-white"
       >
         <div className="flex items-center gap-3">
           <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isExpanded ? accentColor : 'bg-neutral-100 text-neutral-500'}`}>
             {icon}
           </div>
           <span className="font-['Syne',sans-serif] font-bold text-lg text-neutral-800">{title}</span>
         </div>
         {isExpanded ? <ChevronUp className="w-5 h-5 text-neutral-400" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
       </button>
       
       {isExpanded && (
         <div className="p-5 pt-0 mt-2">
           {children}
         </div>
       )}
    </div>
  )
}

// --- Main Component ---
export function Creative() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [expandedSection, setExpandedSection] = useState<Section>('personal');
  const [skillInput, setSkillInput] = useState('');

  const nameParts = data.personal.name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  // --- Handlers ---
  const updatePersonal = (field: string, value: string) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', year: '' }]
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      setData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] font-['DM_Sans',sans-serif]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap');
      `}} />

      {/* Header */}
      <header className="h-[72px] shrink-0 bg-white border-b border-neutral-200 px-8 flex items-center justify-between z-30 relative shadow-sm">
         <div className="flex items-center gap-3 text-[#2E1065]">
           <div className="w-10 h-10 bg-[#FF6B6B] rounded-xl flex items-center justify-center rotate-3">
             <Wand2 className="w-5 h-5 text-white" />
           </div>
           <span className="font-['Syne',sans-serif] font-bold text-2xl tracking-tight">Creative<span className="text-neutral-400 font-normal">CV</span></span>
         </div>
         <button 
           onClick={() => alert("Downloading PDF... (Mock)")}
           className="bg-[#2E1065] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#1E112A] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_0_rgba(46,16,101,0.39)] flex items-center gap-2"
         >
           <Download className="w-4 h-4" /> Download PDF
         </button>
      </header>
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel: Editor */}
        <aside className="w-[500px] shrink-0 bg-neutral-50/50 border-r border-neutral-200 overflow-y-auto flex flex-col p-6 gap-4 z-20">
           
           <AccordionSection 
             title="Personal Info" 
             icon={<User className="w-5 h-5" />} 
             isExpanded={expandedSection === 'personal'} 
             onToggle={() => setExpandedSection(expandedSection === 'personal' ? '' as Section : 'personal')}
             accentColor="bg-[#FF6B6B]/10 text-[#FF6B6B]"
           >
             <div className="flex flex-col gap-4">
               <Input label="Full Name" value={data.personal.name} onChange={(e: any) => updatePersonal('name', e.target.value)} />
               <Input label="Professional Title" value={data.personal.title} onChange={(e: any) => updatePersonal('title', e.target.value)} />
               <div className="grid grid-cols-2 gap-4">
                 <Input label="Email" type="email" value={data.personal.email} onChange={(e: any) => updatePersonal('email', e.target.value)} />
                 <Input label="Phone" type="tel" value={data.personal.phone} onChange={(e: any) => updatePersonal('phone', e.target.value)} />
               </div>
               <Input label="Location" value={data.personal.location} onChange={(e: any) => updatePersonal('location', e.target.value)} />
               <div className="grid grid-cols-2 gap-4">
                 <Input label="LinkedIn (URL)" value={data.personal.linkedin} onChange={(e: any) => updatePersonal('linkedin', e.target.value)} />
                 <Input label="Website (URL)" value={data.personal.website} onChange={(e: any) => updatePersonal('website', e.target.value)} />
               </div>
             </div>
           </AccordionSection>

           <AccordionSection 
             title="Professional Summary" 
             icon={<FileText className="w-5 h-5" />} 
             isExpanded={expandedSection === 'summary'} 
             onToggle={() => setExpandedSection(expandedSection === 'summary' ? '' as Section : 'summary')}
             accentColor="bg-amber-500/10 text-amber-600"
           >
             <Textarea 
               label="Summary" 
               value={data.summary} 
               onChange={(e: any) => setData(prev => ({ ...prev, summary: e.target.value }))} 
               placeholder="Briefly describe your expertise, aesthetic, and professional goals..."
             />
           </AccordionSection>

           <AccordionSection 
             title="Work Experience" 
             icon={<Briefcase className="w-5 h-5" />} 
             isExpanded={expandedSection === 'experience'} 
             onToggle={() => setExpandedSection(expandedSection === 'experience' ? '' as Section : 'experience')}
             accentColor="bg-violet-500/10 text-violet-600"
           >
             <div className="flex flex-col gap-6">
               {data.experience.map((exp) => (
                 <div key={exp.id} className="p-5 border border-neutral-200 rounded-xl relative group bg-neutral-50/50">
                   <button 
                     onClick={() => removeExperience(exp.id)}
                     className="absolute -right-3 -top-3 bg-white border border-neutral-200 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50 hover:scale-110"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                   
                   <div className="grid grid-cols-2 gap-4 mb-4">
                     <Input label="Company" value={exp.company} onChange={(e: any) => updateExperience(exp.id, 'company', e.target.value)} />
                     <Input label="Role" value={exp.role} onChange={(e: any) => updateExperience(exp.id, 'role', e.target.value)} />
                     <Input label="Start Date" value={exp.startDate} onChange={(e: any) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="e.g. 2021" />
                     <Input label="End Date" value={exp.endDate} onChange={(e: any) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="e.g. Present" />
                   </div>
                   <Textarea label="Description" value={exp.description} onChange={(e: any) => updateExperience(exp.id, 'description', e.target.value)} />
                 </div>
               ))}
               <button 
                 onClick={addExperience}
                 className="w-full py-4 border-2 border-dashed border-[#2E1065]/20 text-[#2E1065] font-bold rounded-xl hover:bg-[#2E1065]/5 hover:border-[#2E1065]/40 transition-colors flex items-center justify-center gap-2 text-sm"
               >
                 <Plus className="w-5 h-5" /> Add New Experience
               </button>
             </div>
           </AccordionSection>

           <AccordionSection 
             title="Education" 
             icon={<GraduationCap className="w-5 h-5" />} 
             isExpanded={expandedSection === 'education'} 
             onToggle={() => setExpandedSection(expandedSection === 'education' ? '' as Section : 'education')}
             accentColor="bg-emerald-500/10 text-emerald-600"
           >
             <div className="flex flex-col gap-6">
               {data.education.map((edu) => (
                 <div key={edu.id} className="p-5 border border-neutral-200 rounded-xl relative group bg-neutral-50/50">
                   <button 
                     onClick={() => removeEducation(edu.id)}
                     className="absolute -right-3 -top-3 bg-white border border-neutral-200 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50 hover:scale-110"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                   
                   <div className="grid grid-cols-1 gap-4 mb-4">
                     <Input label="School / University" value={edu.school} onChange={(e: any) => updateEducation(edu.id, 'school', e.target.value)} />
                     <div className="grid grid-cols-2 gap-4">
                       <Input label="Degree / Program" value={edu.degree} onChange={(e: any) => updateEducation(edu.id, 'degree', e.target.value)} />
                       <Input label="Year" value={edu.year} onChange={(e: any) => updateEducation(edu.id, 'year', e.target.value)} placeholder="e.g. 2014 - 2018" />
                     </div>
                   </div>
                 </div>
               ))}
               <button 
                 onClick={addEducation}
                 className="w-full py-4 border-2 border-dashed border-[#2E1065]/20 text-[#2E1065] font-bold rounded-xl hover:bg-[#2E1065]/5 hover:border-[#2E1065]/40 transition-colors flex items-center justify-center gap-2 text-sm"
               >
                 <Plus className="w-5 h-5" /> Add New Education
               </button>
             </div>
           </AccordionSection>

           <AccordionSection 
             title="Skills & Expertise" 
             icon={<Sparkles className="w-5 h-5" />} 
             isExpanded={expandedSection === 'skills'} 
             onToggle={() => setExpandedSection(expandedSection === 'skills' ? '' as Section : 'skills')}
             accentColor="bg-blue-500/10 text-blue-600"
           >
             <div className="flex flex-col gap-4">
               <div className="flex flex-wrap gap-2">
                 {data.skills.map((skill, i) => (
                   <span key={i} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg flex items-center gap-2 border border-neutral-200">
                     {skill}
                     <button onClick={() => removeSkill(i)} className="text-neutral-400 hover:text-red-500 transition-colors">
                       <Trash2 className="w-3.5 h-3.5" />
                     </button>
                   </span>
                 ))}
               </div>
               <div className="relative mt-2">
                 <input 
                   type="text" 
                   value={skillInput}
                   onChange={e => setSkillInput(e.target.value)}
                   onKeyDown={handleAddSkill}
                   placeholder="Type a skill and press Enter"
                   className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 focus:border-[#2E1065] focus:bg-white focus:ring-1 focus:ring-[#2E1065] rounded-xl outline-none text-sm font-['DM_Sans',sans-serif] pr-10"
                 />
                 <Plus className="w-5 h-5 text-neutral-400 absolute right-3 top-3" />
               </div>
             </div>
           </AccordionSection>

        </aside>

        {/* Right Panel: Live Preview */}
        <main className="flex-1 overflow-y-auto bg-neutral-100 flex items-start justify-center p-12 relative">
          {/* Subtle grid background for the canvas to make the preview "pop" */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          
          {/* The Resume Document */}
          <div className="w-[800px] min-h-[1131px] bg-[#FDFBF7] shadow-[0_20px_60px_rgba(46,16,101,0.08)] shrink-0 flex relative font-['DM_Sans',sans-serif] z-10 hover:shadow-[0_30px_70px_rgba(46,16,101,0.12)] transition-shadow duration-700">
            
            {/* Left Column (35%) */}
            <div className="w-[280px] bg-[#2E1065] text-white p-10 pt-[100px] flex flex-col relative z-10">
              
              {/* Contact Section */}
              <div className="mb-14">
                <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#FF6B6B] uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#FF6B6B]"></span> Contact
                </h3>
                <div className="flex flex-col gap-5 text-[13px] font-medium text-neutral-200">
                  {data.personal.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                      <span className="break-all leading-tight mt-0.5">{data.personal.email}</span>
                    </div>
                  )}
                  {data.personal.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                      <span className="break-all leading-tight mt-0.5">{data.personal.phone}</span>
                    </div>
                  )}
                  {data.personal.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                      <span className="break-all leading-tight mt-0.5">{data.personal.location}</span>
                    </div>
                  )}
                  {data.personal.website && (
                    <div className="flex items-start gap-3">
                      <LinkIcon className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                      <span className="break-all leading-tight mt-0.5">{data.personal.website}</span>
                    </div>
                  )}
                  {data.personal.linkedin && (
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-[#FF6B6B] shrink-0 text-xs w-4 mt-0.5 text-center">in</span>
                      <span className="break-all leading-tight mt-0.5">{data.personal.linkedin}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              {data.skills.length > 0 && (
                <div className="mb-14">
                  <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#FF6B6B] uppercase mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#FF6B6B]"></span> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[13px] font-medium text-neutral-100 hover:bg-[#FF6B6B]/20 hover:text-[#FF6B6B] hover:border-[#FF6B6B]/50 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Education Section */}
              {data.education.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#FF6B6B] uppercase mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#FF6B6B]"></span> Education
                  </h3>
                  <div className="flex flex-col gap-8">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="relative">
                        <div className="text-[#FF6B6B] font-bold text-xs mb-1.5 tracking-wide">{edu.year}</div>
                        <div className="font-['Syne',sans-serif] font-bold text-lg leading-tight mb-2">{edu.degree}</div>
                        <div className="text-[13px] text-neutral-300 leading-snug">{edu.school}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (65%) */}
            <div className="flex-1 p-12 pl-[72px] pt-[100px] relative">
              
              {/* Name & Title */}
              <div className="mb-14 relative">
                <h1 className="font-['Syne',sans-serif] text-[76px] font-extrabold leading-[0.9] tracking-tighter uppercase text-[#2E1065] -ml-1">
                  {firstName}<br />
                  {lastName && <span className="text-[#FF6B6B]">{lastName}</span>}
                </h1>
                {data.personal.title && (
                  <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#FF6B6B] mt-8 uppercase tracking-[0.05em]">
                    {data.personal.title}
                  </h2>
                )}
              </div>

              {/* Summary */}
              {data.summary && (
                <div className="mb-16 relative">
                  {/* Small decorative quote mark */}
                  <span className="absolute -left-6 top-0 font-['Syne',sans-serif] text-6xl text-[#2E1065] opacity-10">"</span>
                  <p className="text-[15px] leading-[1.8] text-neutral-700 font-medium z-10 relative">
                    {data.summary}
                  </p>
                </div>
              )}

              {/* Experience Section */}
              {data.experience.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#FF6B6B] uppercase mb-10 flex items-center gap-4">
                    Experience
                    <span className="h-[1px] flex-1 bg-neutral-200"></span>
                  </h3>
                  
                  <div className="flex flex-col gap-12">
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="relative group">
                        {/* Timeline dot */}
                        <div className="absolute -left-[27px] top-2.5 w-2 h-2 rounded-full bg-[#FF6B6B] ring-4 ring-[#FDFBF7]"></div>
                        {/* Timeline line connecting items (if not last item, could be added via CSS or mapping) */}
                        
                        <div className="flex items-baseline justify-between mb-2">
                          <h4 className="font-['Syne',sans-serif] font-bold text-[22px] text-[#2E1065] leading-none">
                            {exp.role}
                          </h4>
                          <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-md uppercase tracking-wider shrink-0 ml-4">
                            {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                          </span>
                        </div>
                        <div className="text-[15px] font-bold text-[#FF6B6B] mb-4 uppercase tracking-wide">
                          {exp.company}
                        </div>
                        <div className="text-[14.5px] leading-[1.7] text-neutral-600 whitespace-pre-wrap">
                          {exp.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtle connecting line for timeline */}
            <div className="absolute left-[280px] top-[480px] bottom-[100px] w-px bg-gradient-to-b from-neutral-200 via-neutral-200 to-transparent z-0 ml-[43px]"></div>

          </div>
        </main>
      </div>
    </div>
  );
}
