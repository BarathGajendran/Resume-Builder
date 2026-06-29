import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  SafeAreaView,
  Alert,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthScreen } from './AuthScreen';

/* ─── Types ──────────────────────────────────────────────── */
export interface PersonalInfo {
  name: string; title: string; email: string; phone: string;
  location: string; website: string; linkedin: string; github: string;
  photo?: string;
}
export interface Experience    { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
export interface Internship    { id: string; company: string; role: string; startDate: string; endDate: string; bullets: string[]; }
export interface Education     { id: string; school: string; degree: string; field: string; year: string; }
export interface Project       { id: string; name: string; description: string; tech: string[]; url: string; startDate: string; endDate: string; }
export interface Certification { id: string; name: string; issuer: string; year: string; credentialId: string; }
export interface Language      { id: string; language: string; proficiency: string; }

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
}

/* ─── Defaults ───────────────────────────────────────────── */
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
    { id: '1', name: 'Cartographer UI', description: 'Open-source canvas library for React with real-time collaboration, shape primitives, and a plugin API.', tech: ['React', 'TypeScript', 'WebSockets'], url: 'github.com/alexmorgan/cartographer', startDate: '2022', endDate: 'Present' },
    { id: '2', name: 'Palette AI', description: 'Generative design tool that extracts color palettes from natural language descriptions using GPT-4.', tech: ['Next.js', 'OpenAI API'], url: 'paletteai.dev', startDate: '2023', endDate: '2023' },
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
  }
};

export default function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [data, setData] = useState<ResumeData>(DEMO_RESUME);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [activeSection, setActiveSection] = useState<'personal' | 'summary' | 'expertise' | 'experience' | 'internships' | 'projects' | 'skills' | 'tools' | 'education' | 'certifications' | 'languages'>('personal');

  if (!user) {
    return <AuthScreen onLoginSuccess={setUser} />;
  }

  const sectionsList: { id: typeof activeSection; label: string }[] = [
    { id: 'personal', label: 'Personal' },
    { id: 'summary', label: 'Summary' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'experience', label: 'Experience' },
    { id: 'internships', label: 'Internships' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'tools', label: 'Tools' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certs' },
    { id: 'languages', label: 'Languages' },
  ];

  /* ─── State Helpers ────────────────────────────────────── */
  const updPersonal = (field: keyof PersonalInfo, value: string) => {
    setData(d => ({ ...d, personalInfo: { ...d.personalInfo, [field]: value } }));
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need access to your camera roll to let you choose a photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        const dataUrl = selectedImage.base64 
          ? `data:image/jpeg;base64,${selectedImage.base64}` 
          : selectedImage.uri;
        updPersonal('photo', dataUrl);
      }
    } catch (error) {
      console.error('Failed to pick image:', error);
      Alert.alert('Error', 'An error occurred while picking the image.');
    }
  };

  const addItem = (key: 'experience' | 'internships' | 'projects' | 'education' | 'certifications' | 'languages') => {
    const blankMap = {
      experience: { company: '', role: '', startDate: '', endDate: '', bullets: [] },
      internships: { company: '', role: '', startDate: '', endDate: '', bullets: [] },
      projects: { name: '', description: '', tech: [], url: '', startDate: '', endDate: '' },
      education: { school: '', degree: '', field: '', year: '' },
      certifications: { name: '', issuer: '', year: '', credentialId: '' },
      languages: { language: '', proficiency: 'Conversational' }
    };
    setData(d => ({
      ...d,
      [key]: [...(d[key] as any), { id: Date.now().toString(), ...blankMap[key] }]
    }));
  };

  const updateItem = (key: 'experience' | 'internships' | 'projects' | 'education' | 'certifications' | 'languages', id: string, field: string, value: any) => {
    setData(d => ({
      ...d,
      [key]: (d[key] as any[]).map(it => it.id === id ? { ...it, [field]: value } : it)
    }));
  };

  const removeItem = (key: 'experience' | 'internships' | 'projects' | 'education' | 'certifications' | 'languages', id: string) => {
    setData(d => ({
      ...d,
      [key]: (d[key] as any[]).filter(it => it.id !== id)
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Elegance</Text>
          <Text style={styles.headerSubtitle}>Mobile Builder</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setUser(null)} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'edit' && styles.tabActive]}
          onPress={() => setActiveTab('edit')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'edit' && styles.tabActiveText]}>Edit Form</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'preview' && styles.tabActive]}
          onPress={() => setActiveTab('preview')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'preview' && styles.tabActiveText]}>Preview Resume</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'edit' ? (
        <View style={styles.flexContainer}>
          {/* Section pills */}
          <View style={styles.pillsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
              {sectionsList.map(s => (
                <TouchableOpacity 
                  key={s.id}
                  style={[styles.pill, activeSection === s.id && styles.pillActive]}
                  onPress={() => setActiveSection(s.id)}
                >
                  <Text style={[styles.pillText, activeSection === s.id && styles.pillActiveText]}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Form Content */}
          <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent}>
            {activeSection === 'personal' && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Personal Info</Text>
                
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} value={data.personalInfo.name} onChangeText={t => updPersonal('name', t)} placeholder="Jane Doe"/>

                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={data.personalInfo.title} onChangeText={t => updPersonal('title', t)} placeholder="Senior Software Engineer"/>

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} keyboardType="email-address" autoCapitalize="none" value={data.personalInfo.email} onChangeText={t => updPersonal('email', t)} placeholder="jane@example.com"/>

                <Text style={styles.label}>Phone</Text>
                <TextInput style={styles.input} keyboardType="phone-pad" value={data.personalInfo.phone} onChangeText={t => updPersonal('phone', t)} placeholder="+1 234 567 890"/>

                <Text style={styles.label}>Location</Text>
                <TextInput style={styles.input} value={data.personalInfo.location} onChangeText={t => updPersonal('location', t)} placeholder="San Francisco, CA"/>

                <Text style={styles.label}>Website</Text>
                <TextInput style={styles.input} autoCapitalize="none" value={data.personalInfo.website} onChangeText={t => updPersonal('website', t)} placeholder="janedoe.dev"/>

                <Text style={styles.label}>GitHub</Text>
                <TextInput style={styles.input} autoCapitalize="none" value={data.personalInfo.github} onChangeText={t => updPersonal('github', t)} placeholder="github.com/jane"/>

                <Text style={styles.label}>LinkedIn</Text>
                <TextInput style={styles.input} autoCapitalize="none" value={data.personalInfo.linkedin} onChangeText={t => updPersonal('linkedin', t)} placeholder="linkedin.com/in/jane"/>
              </View>
            )}

            {activeSection === 'summary' && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Profile Summary</Text>
                <Text style={styles.label}>Summary Statement</Text>
                <TextInput 
                  style={[styles.input, styles.multilineInput]} 
                  multiline 
                  value={data.summary} 
                  onChangeText={t => setData(d => ({ ...d, summary: t }))} 
                  placeholder="Tell us about yourself…"
                />
              </View>
            )}

            {activeSection === 'expertise' && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Expertise Tags</Text>
                <Text style={styles.label}>Expertise Tags (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.skills.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, skills: t.split(',').map(s => s.trim()).filter(Boolean) }))} 
                  placeholder="React, TypeScript, AWS…"
                />
              </View>
            )}

            {activeSection === 'experience' && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
                  <TouchableOpacity onPress={() => addItem('experience')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ ADD</Text>
                  </TouchableOpacity>
                </View>
                {data.experience.map(it => (
                  <View key={it.id} style={styles.itemBox}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemHeaderTitle}>{it.role || 'New Role'}</Text>
                      <TouchableOpacity onPress={() => removeItem('experience', it.id)}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Company</Text>
                    <TextInput style={styles.input} value={it.company} onChangeText={t => updateItem('experience', it.id, 'company', t)} placeholder="Stripe"/>
                    
                    <Text style={styles.label}>Role</Text>
                    <TextInput style={styles.input} value={it.role} onChangeText={t => updateItem('experience', it.id, 'role', t)} placeholder="Frontend Developer"/>

                    <View style={styles.row}>
                      <View style={styles.col}>
                        <Text style={styles.label}>Start Date</Text>
                        <TextInput style={styles.input} value={it.startDate} onChangeText={t => updateItem('experience', it.id, 'startDate', t)} placeholder="2020"/>
                      </View>
                      <View style={styles.col}>
                        <Text style={styles.label}>End Date</Text>
                        <TextInput style={styles.input} value={it.endDate} onChangeText={t => updateItem('experience', it.id, 'endDate', t)} placeholder="Present"/>
                      </View>
                    </View>

                    <Text style={styles.label}>Bullets (Comma-separated)</Text>
                    <TextInput 
                      style={[styles.input, styles.multilineInput]} 
                      multiline 
                      value={it.bullets.join('\n')} 
                      onChangeText={t => updateItem('experience', it.id, 'bullets', t.split('\n').filter(Boolean))} 
                      placeholder="Enter bullet points on separate lines…"
                    />
                  </View>
                ))}
              </View>
            )}

            {activeSection === 'internships' && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Internships</Text>
                  <TouchableOpacity onPress={() => addItem('internships')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ ADD</Text>
                  </TouchableOpacity>
                </View>
                {data.internships.map(it => (
                  <View key={it.id} style={styles.itemBox}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemHeaderTitle}>{it.role || 'New Internship'}</Text>
                      <TouchableOpacity onPress={() => removeItem('internships', it.id)}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Company</Text>
                    <TextInput style={styles.input} value={it.company} onChangeText={t => updateItem('internships', it.id, 'company', t)} placeholder="Figma"/>
                    
                    <Text style={styles.label}>Role</Text>
                    <TextInput style={styles.input} value={it.role} onChangeText={t => updateItem('internships', it.id, 'role', t)} placeholder="Intern"/>

                    <View style={styles.row}>
                      <View style={styles.col}>
                        <Text style={styles.label}>Start Date</Text>
                        <TextInput style={styles.input} value={it.startDate} onChangeText={t => updateItem('internships', it.id, 'startDate', t)} placeholder="Summer 2022"/>
                      </View>
                      <View style={styles.col}>
                        <Text style={styles.label}>End Date</Text>
                        <TextInput style={styles.input} value={it.endDate} onChangeText={t => updateItem('internships', it.id, 'endDate', t)} placeholder="Fall 2022"/>
                      </View>
                    </View>

                    <Text style={styles.label}>Bullets (Comma-separated)</Text>
                    <TextInput 
                      style={[styles.input, styles.multilineInput]} 
                      multiline 
                      value={it.bullets.join('\n')} 
                      onChangeText={t => updateItem('internships', it.id, 'bullets', t.split('\n').filter(Boolean))} 
                      placeholder="Enter bullet points on separate lines…"
                    />
                  </View>
                ))}
              </View>
            )}

            {activeSection === 'projects' && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Projects</Text>
                  <TouchableOpacity onPress={() => addItem('projects')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ ADD</Text>
                  </TouchableOpacity>
                </View>
                {data.projects.map(it => (
                  <View key={it.id} style={styles.itemBox}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemHeaderTitle}>{it.name || 'New Project'}</Text>
                      <TouchableOpacity onPress={() => removeItem('projects', it.id)}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Project Name</Text>
                    <TextInput style={styles.input} value={it.name} onChangeText={t => updateItem('projects', it.id, 'name', t)} placeholder="My Project"/>
                    
                    <Text style={styles.label}>URL</Text>
                    <TextInput style={styles.input} value={it.url} onChangeText={t => updateItem('projects', it.id, 'url', t)} placeholder="github.com/project"/>

                    <View style={styles.row}>
                      <View style={styles.col}>
                        <Text style={styles.label}>Start Date</Text>
                        <TextInput style={styles.input} value={it.startDate} onChangeText={t => updateItem('projects', it.id, 'startDate', t)} placeholder="2022"/>
                      </View>
                      <View style={styles.col}>
                        <Text style={styles.label}>End Date</Text>
                        <TextInput style={styles.input} value={it.endDate} onChangeText={t => updateItem('projects', it.id, 'endDate', t)} placeholder="Present"/>
                      </View>
                    </View>

                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={it.description} onChangeText={t => updateItem('projects', it.id, 'description', t)} placeholder="Brief overview of project…"/>

                    <Text style={styles.label}>Tech Stack (Comma-separated)</Text>
                    <TextInput style={styles.input} value={it.tech.join(', ')} onChangeText={t => updateItem('projects', it.id, 'tech', t.split(',').map(s => s.trim()).filter(Boolean))} placeholder="React, Vite, Node.js"/>
                  </View>
                ))}
              </View>
            )}

            {activeSection === 'skills' && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Categorized Skills</Text>
                
                <Text style={styles.label}>Frontend (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.categorizedSkills.frontend.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, categorizedSkills: { ...d.categorizedSkills, frontend: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="React, CSS, HTML…"
                />

                <Text style={styles.label}>Backend (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.categorizedSkills.backend.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, categorizedSkills: { ...d.categorizedSkills, backend: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="Node.js, Express, Go…"
                />

                <Text style={styles.label}>Database (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.categorizedSkills.database.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, categorizedSkills: { ...d.categorizedSkills, database: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="PostgreSQL, MongoDB, Redis…"
                />

                <Text style={styles.label}>AI / ML (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.categorizedSkills.aiml.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, categorizedSkills: { ...d.categorizedSkills, aiml: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="PyTorch, TensorFlow…"
                />
              </View>
            )}

            {activeSection === 'tools' && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Tools &amp; Platforms</Text>
                
                <Text style={styles.label}>Dev Tools (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.toolsPlatforms.devTools.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, toolsPlatforms: { ...d.toolsPlatforms, devTools: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="Git, VS Code, Vite…"
                />

                <Text style={styles.label}>Cloud &amp; Deployment (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.toolsPlatforms.cloudDeployment.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, toolsPlatforms: { ...d.toolsPlatforms, cloudDeployment: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="AWS, Vercel, Docker…"
                />

                <Text style={styles.label}>AI Platforms (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.toolsPlatforms.aiPlatforms.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, toolsPlatforms: { ...d.toolsPlatforms, aiPlatforms: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="OpenAI, Hugging Face…"
                />

                <Text style={styles.label}>Data &amp; ML Tools (Comma-separated)</Text>
                <TextInput 
                  style={styles.input} 
                  value={data.toolsPlatforms.dataMlTools.join(', ')} 
                  onChangeText={t => setData(d => ({ ...d, toolsPlatforms: { ...d.toolsPlatforms, dataMlTools: t.split(',').map(s => s.trim()).filter(Boolean) } }))} 
                  placeholder="Jupyter, NumPy, Pandas…"
                />
              </View>
            )}

            {activeSection === 'education' && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  <TouchableOpacity onPress={() => addItem('education')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ ADD</Text>
                  </TouchableOpacity>
                </View>
                {data.education.map(it => (
                  <View key={it.id} style={styles.itemBox}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemHeaderTitle}>{it.school || 'New Institution'}</Text>
                      <TouchableOpacity onPress={() => removeItem('education', it.id)}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>School / University</Text>
                    <TextInput style={styles.input} value={it.school} onChangeText={t => updateItem('education', it.id, 'school', t)} placeholder="Stanford University"/>
                    
                    <Text style={styles.label}>Degree</Text>
                    <TextInput style={styles.input} value={it.degree} onChangeText={t => updateItem('education', it.id, 'degree', t)} placeholder="B.S."/>

                    <Text style={styles.label}>Field of Study</Text>
                    <TextInput style={styles.input} value={it.field} onChangeText={t => updateItem('education', it.id, 'field', t)} placeholder="Computer Science"/>

                    <Text style={styles.label}>Graduation Year</Text>
                    <TextInput style={styles.input} value={it.year} onChangeText={t => updateItem('education', it.id, 'year', t)} placeholder="2017"/>
                  </View>
                ))}
              </View>
            )}

            {activeSection === 'certifications' && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  <TouchableOpacity onPress={() => addItem('certifications')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ ADD</Text>
                  </TouchableOpacity>
                </View>
                {data.certifications.map(it => (
                  <View key={it.id} style={styles.itemBox}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemHeaderTitle}>{it.name || 'New Certification'}</Text>
                      <TouchableOpacity onPress={() => removeItem('certifications', it.id)}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Certification Name</Text>
                    <TextInput style={styles.input} value={it.name} onChangeText={t => updateItem('certifications', it.id, 'name', t)} placeholder="AWS Certified Solutions Architect"/>
                    
                    <Text style={styles.label}>Issuer</Text>
                    <TextInput style={styles.input} value={it.issuer} onChangeText={t => updateItem('certifications', it.id, 'issuer', t)} placeholder="Amazon Web Services"/>

                    <View style={styles.row}>
                      <View style={styles.col}>
                        <Text style={styles.label}>Year</Text>
                        <TextInput style={styles.input} value={it.year} onChangeText={t => updateItem('certifications', it.id, 'year', t)} placeholder="2023"/>
                      </View>
                      <View style={styles.col}>
                        <Text style={styles.label}>Credential ID</Text>
                        <TextInput style={styles.input} value={it.credentialId} onChangeText={t => updateItem('certifications', it.id, 'credentialId', t)} placeholder="Optional"/>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {activeSection === 'languages' && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  <TouchableOpacity onPress={() => addItem('languages')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ ADD</Text>
                  </TouchableOpacity>
                </View>
                {data.languages.map(it => (
                  <View key={it.id} style={styles.itemBox}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemHeaderTitle}>{it.language || 'New Language'}</Text>
                      <TouchableOpacity onPress={() => removeItem('languages', it.id)}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Language</Text>
                    <TextInput style={styles.input} value={it.language} onChangeText={t => updateItem('languages', it.id, 'language', t)} placeholder="English"/>
                    
                    <Text style={styles.label}>Proficiency</Text>
                    <TextInput style={styles.input} value={it.proficiency} onChangeText={t => updateItem('languages', it.id, 'proficiency', t)} placeholder="Native / Fluent / Conversational"/>
                    <View style={styles.proficiencyQuickRow}>
                      {['Native', 'Fluent', 'Conversational', 'Basic'].map(lvl => (
                        <TouchableOpacity 
                          key={lvl} 
                          onPress={() => updateItem('languages', it.id, 'proficiency', lvl)}
                          style={[
                            styles.proficiencyQuickPill,
                            it.proficiency === lvl && styles.proficiencyQuickPillActive
                          ]}
                        >
                          <Text style={[
                            styles.proficiencyQuickText,
                            it.proficiency === lvl && styles.proficiencyQuickTextActive
                          ]}>
                            {lvl}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        /* Preview Tab View */
        <ScrollView style={styles.previewScroll} contentContainerStyle={styles.previewContent}>
          <View style={styles.previewCard}>
            {/* Header */}
            <View style={styles.previewHeader}>
              <View style={styles.headerLeft}>
                <Text style={styles.previewName}>{data.personalInfo.name || 'Your Name'}</Text>
                <Text style={styles.previewTitle}>{data.personalInfo.title || 'Professional Title'}</Text>
              </View>
            </View>

            {/* Contact details */}
            <View style={styles.previewContacts}>
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            </View>

            <View style={styles.divider} />

            {/* Profile Section */}
            {Boolean(data.summary) && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Profile</Text>
                <Text style={styles.previewText}>{data.summary}</Text>
              </View>
            )}

            {/* Expertise Section */}
            {data.skills.length > 0 && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Expertise</Text>
                <View style={styles.tagGrid}>
                  {data.skills.map((s, idx) => (
                    <View key={idx} style={styles.tagBadge}>
                      <Text style={styles.tagText}>{s}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Experience Section */}
            {data.experience.length > 0 && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Experience</Text>
                {data.experience.map(it => (
                  <View key={it.id} style={styles.previewItem}>
                    <View style={styles.previewRow}>
                      <Text style={styles.previewRole}>{it.role}</Text>
                      <Text style={styles.previewDate}>{it.startDate} — {it.endDate}</Text>
                    </View>
                    <Text style={styles.previewCompany}>{it.company}</Text>
                    {it.bullets.map((b, idx) => (
                      <Text key={idx} style={styles.previewBullet}>• {b}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Internships Section */}
            {data.internships.length > 0 && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Internships</Text>
                {data.internships.map(it => (
                  <View key={it.id} style={styles.previewItem}>
                    <View style={styles.previewRow}>
                      <Text style={styles.previewRole}>{it.role}</Text>
                      <Text style={styles.previewDate}>{it.startDate} — {it.endDate}</Text>
                    </View>
                    <Text style={styles.previewCompany}>{it.company}</Text>
                    {it.bullets.map((b, idx) => (
                      <Text key={idx} style={styles.previewBullet}>• {b}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Projects Section */}
            {data.projects.length > 0 && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Projects</Text>
                {data.projects.map(it => (
                  <View key={it.id} style={styles.previewItem}>
                    <View style={styles.previewRow}>
                      <Text style={styles.previewProjectName}>{it.name}</Text>
                      <Text style={styles.previewDate}>{it.startDate} — {it.endDate}</Text>
                    </View>
                    <Text style={styles.previewProjectUrl}>{it.url}</Text>
                    <Text style={styles.previewText}>{it.description}</Text>
                    {it.tech.length > 0 && (
                      <View style={styles.projectTechGrid}>
                        {it.tech.map((t, idx) => (
                          <View key={idx} style={styles.techBadge}>
                            <Text style={styles.techBadgeText}>{t}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Skills Section */}
            <View style={styles.previewSection}>
              <Text style={styles.previewSectionTitle}>Skills</Text>
              <View style={styles.skillsPreviewGrid}>
                {Object.entries({
                  Frontend: data.categorizedSkills.frontend,
                  Backend: data.categorizedSkills.backend,
                  Database: data.categorizedSkills.database,
                  'AI / ML': data.categorizedSkills.aiml,
                }).map(([category, tags]) => (
                  <View key={category} style={styles.skillsPreviewColumn}>
                    <Text style={styles.skillsCategoryTitle}>{category}</Text>
                    {tags.map((t, idx) => (
                      <Text key={idx} style={styles.skillBullet}>• {t}</Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            {/* Tools Section */}
            <View style={styles.previewSection}>
              <Text style={styles.previewSectionTitle}>Tools &amp; Platforms</Text>
              <View style={styles.skillsPreviewGrid}>
                {Object.entries({
                  'Dev Tools': data.toolsPlatforms.devTools,
                  'Cloud': data.toolsPlatforms.cloudDeployment,
                  'AI Platforms': data.toolsPlatforms.aiPlatforms,
                  'Data & ML': data.toolsPlatforms.dataMlTools,
                }).map(([category, tags]) => (
                  <View key={category} style={styles.skillsPreviewColumn}>
                    <Text style={styles.skillsCategoryTitle}>{category}</Text>
                    {tags.map((t, idx) => (
                      <Text key={idx} style={styles.skillBullet}>• {t}</Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            {/* Education Section */}
            {data.education.length > 0 && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Education</Text>
                <View style={styles.eduPreviewContainer}>
                  {data.education.map(it => (
                    <View key={it.id} style={styles.eduCard}>
                      <View style={styles.previewRow}>
                        <View style={styles.eduInfo}>
                          <Text style={styles.eduSchool}>{it.school}</Text>
                          <Text style={styles.eduDegree}>{it.degree} in {it.field}</Text>
                        </View>
                        <View style={styles.eduBadge}>
                          <Text style={styles.eduBadgeText}>{it.year}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications Section */}
            {data.certifications.length > 0 && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Certifications</Text>
                <View style={styles.certPreviewGrid}>
                  {data.certifications.map(it => (
                    <View key={it.id} style={styles.certCard}>
                      <View style={styles.previewRow}>
                        <Text style={styles.certTitle} numberOfLines={1}>{it.name}</Text>
                        <Text style={styles.certYear}>{it.year}</Text>
                      </View>
                      <Text style={styles.certIssuer} numberOfLines={1}>{it.issuer}</Text>
                      {Boolean(it.credentialId) && (
                        <Text style={styles.certId} numberOfLines={1}>ID: {it.credentialId}</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Languages Section */}
            {data.languages.length > 0 && (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Languages</Text>
                <View style={styles.langPreviewGrid}>
                  {data.languages.map(it => {
                    const prof = it.proficiency.toLowerCase();
                    let rating = 3;
                    if (prof.includes('native')) rating = 5;
                    else if (prof.includes('fluent')) rating = 4;
                    else if (prof.includes('conversational')) rating = 3;
                    else if (prof.includes('basic')) rating = 2;

                    return (
                      <View key={it.id} style={styles.langCard}>
                        <View style={styles.langInfo}>
                          <Text style={styles.langName}>{it.language}</Text>
                          <Text style={styles.langProficiency}>{it.proficiency}</Text>
                        </View>
                        <View style={styles.langDots}>
                          {[1, 2, 3, 4, 5].map(idx => (
                            <View 
                              key={idx} 
                              style={[
                                styles.langDot,
                                idx <= rating ? styles.langDotActive : styles.langDotInactive
                              ]}
                            />
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

          </View>
        </ScrollView>
      )}

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1ec',
  },
  flexContainer: {
    flex: 1,
  },
  header: {
    height: 52,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4de',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 18,
  },
  headerSubtitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#aaa',
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0dbd2',
    borderRadius: 2,
  },
  logoutButtonText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4de',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#c5a059',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
  },
  tabActiveText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  pillsContainer: {
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f4f1ec',
  },
  pillsScroll: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f4f1ec',
    borderRadius: 14,
    marginRight: 6,
  },
  pillActive: {
    backgroundColor: '#1a1a1a',
  },
  pillText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  pillActiveText: {
    color: '#fff',
  },
  formScroll: {
    flex: 1,
  },
  formContent: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e8e4de',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  addButton: {
    backgroundColor: '#fcf9f2',
    borderWidth: 1,
    borderColor: '#e8d8b8',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  addButtonText: {
    fontSize: 9,
    color: '#c5a059',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0dbd2',
    fontSize: 13,
    color: '#1a1a1a',
    paddingVertical: 6,
    marginBottom: 10,
  },
  multilineInput: {
    borderWidth: 1,
    borderColor: '#e0dbd2',
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  itemBox: {
    borderWidth: 1,
    borderColor: '#ebe7e0',
    borderRadius: 3,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#faf9f6',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemHeaderTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  deleteButtonText: {
    fontSize: 10,
    color: '#ff6b6b',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
  previewScroll: {
    flex: 1,
    backgroundColor: '#e8e4dc',
  },
  previewContent: {
    padding: 16,
  },
  previewCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  previewHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerLeft: {
    alignItems: 'center',
    marginBottom: 6,
  },
  previewName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    fontFamily: 'Playfair Display',
    textAlign: 'center',
  },
  previewTitle: {
    fontSize: 9,
    color: '#c5a059',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 2,
    textAlign: 'center',
  },
  previewPhotoSlot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#c5a059',
    backgroundColor: '#faf9f6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewPhotoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewPhotoText: {
    fontSize: 8,
    color: '#c5a059',
  },
  previewContacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 8,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#f5f2ec',
    marginVertical: 10,
  },
  previewSection: {
    marginBottom: 14,
  },
  previewSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0dbd2',
    paddingBottom: 2,
    marginBottom: 6,
  },
  previewText: {
    fontSize: 9.5,
    color: '#444',
    lineHeight: 14,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagBadge: {
    backgroundColor: '#fcf9f2',
    borderWidth: 0.5,
    borderColor: '#e8d8b8',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 2,
  },
  tagText: {
    fontSize: 8.5,
    color: '#7c5e21',
    fontWeight: '500',
  },
  previewItem: {
    marginBottom: 10,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewRole: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111',
  },
  previewCompany: {
    fontSize: 8.5,
    color: '#c5a059',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 1,
    marginBottom: 3,
  },
  previewDate: {
    fontSize: 8,
    color: '#888',
  },
  previewBullet: {
    fontSize: 9.5,
    color: '#444',
    paddingLeft: 6,
    marginTop: 2,
    lineHeight: 13,
  },
  previewProjectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111',
  },
  previewProjectUrl: {
    fontSize: 8,
    color: '#c5a059',
    marginTop: 1,
    marginBottom: 3,
  },
  projectTechGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginTop: 4,
  },
  techBadge: {
    backgroundColor: '#f5f2ec',
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 1,
  },
  techBadgeText: {
    fontSize: 7.5,
    color: '#666',
  },
  skillsPreviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillsPreviewColumn: {
    width: '50%',
    paddingRight: 10,
    marginBottom: 8,
  },
  skillsCategoryTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  skillBullet: {
    fontSize: 8.5,
    color: '#555',
    lineHeight: 12,
  },
  eduPreviewContainer: {
    gap: 6,
  },
  eduCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e8d8b8',
    borderLeftWidth: 3,
    borderLeftColor: '#c5a059',
    backgroundColor: '#fcf9f2',
    padding: 10,
    borderRadius: 2,
    marginBottom: 6,
  },
  eduInfo: {
    flex: 1,
  },
  eduSchool: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#c5a059',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  eduBadge: {
    backgroundColor: '#fcf9f2',
    borderWidth: 0.5,
    borderColor: '#e8d8b8',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  eduBadgeText: {
    fontSize: 8,
    color: '#7c5e21',
    fontWeight: 'bold',
  },
  certPreviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  certCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e8d8b8',
    borderLeftWidth: 2,
    borderLeftColor: '#c5a059',
    backgroundColor: '#fcf9f2',
    padding: 8,
    borderRadius: 2,
  },
  certTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 4,
  },
  certYear: {
    fontSize: 7.5,
    color: '#c5a059',
    fontWeight: '600',
  },
  certIssuer: {
    fontSize: 8,
    color: '#555',
    marginTop: 2,
  },
  certId: {
    fontSize: 7,
    color: '#888',
    marginTop: 1,
  },
  langPreviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  langCard: {
    width: '31%',
    borderWidth: 1,
    borderColor: '#e8d8b8',
    borderLeftWidth: 2,
    borderLeftColor: '#c5a059',
    backgroundColor: '#fcf9f2',
    padding: 6,
    borderRadius: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 46,
  },
  langInfo: {
    marginBottom: 4,
  },
  langName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  langProficiency: {
    fontSize: 7.5,
    color: '#c5a059',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 1,
  },
  langDots: {
    flexDirection: 'row',
    gap: 2.5,
  },
  langDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  langDotActive: {
    backgroundColor: '#c5a059',
  },
  langDotInactive: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#e8d8b8',
  },
  proficiencyQuickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  proficiencyQuickPill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f4f1ec',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#e8e4de',
  },
  proficiencyQuickPillActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  proficiencyQuickText: {
    fontSize: 9.5,
    color: '#666',
    fontWeight: '500',
  },
  proficiencyQuickTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photoUploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  formPhotoPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f4f1ec',
    borderWidth: 1,
    borderColor: '#e8e4de',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  formPhotoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formPhotoPlaceholderText: {
    fontSize: 8.5,
    color: '#888',
    textAlign: 'center',
  },
  photoActionButtons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  photoButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  photoRemoveButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  photoRemoveText: {
    color: '#ff4d4f',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
