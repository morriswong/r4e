import { useState } from 'react';
import './App.css';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  professionalSummary: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  skills: Array<string>;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA'
  },
  professionalSummary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.',
  experience: [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: 'Led development of enterprise-scale applications, mentored junior developers, and implemented CI/CD pipelines resulting in 40% faster deployment times.'
    },
    {
      company: 'Digital Innovations Ltd.',
      position: 'Software Engineer',
      startDate: 'Jun 2018',
      endDate: 'Dec 2019',
      description: 'Developed and maintained multiple client-facing web applications using React and TypeScript. Improved application performance by 60%.'
    }
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      graduationDate: 'May 2018'
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'CI/CD', 'Agile Methodologies', 'Team Leadership']
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const handleDownloadPDF = () => {
    const element = document.querySelector('.resume-preview');
    if (!element) return;

    const opt = {
      margin: [10, 10],
      filename: `${resumeData.personalInfo.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <a href="#" className="nav-logo">r4e</a>
        <Button
          onClick={handleDownloadPDF}
          variant="default"
          size="default"
        >
          Download PDF
        </Button>
      </nav>
      <div className="main-content">
        <div className="editor-panel">
          <h2 className="text-2xl font-bold mb-6">Resume Editor</h2>
          <section className="editor-section">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <Input
              type="text"
              placeholder="Full Name"
              value={resumeData.personalInfo.name}
              onChange={(e) => setResumeData({
                ...resumeData,
                personalInfo: { ...resumeData.personalInfo, name: e.target.value }
              })}
              className="mb-3"
            />
            <Input
              type="email"
              placeholder="Email"
              value={resumeData.personalInfo.email}
              onChange={(e) => setResumeData({
                ...resumeData,
                personalInfo: { ...resumeData.personalInfo, email: e.target.value }
              })}
              className="mb-3"
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => setResumeData({
                ...resumeData,
                personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
              })}
              className="mb-3"
            />
            <Input
              type="text"
              placeholder="Location"
              value={resumeData.personalInfo.location}
              onChange={(e) => setResumeData({
                ...resumeData,
                personalInfo: { ...resumeData.personalInfo, location: e.target.value }
              })}
              className="mb-3"
            />
          </section>

          <section className="editor-section">
            <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
            <textarea
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Write a brief summary of your professional background"
              value={resumeData.professionalSummary}
              onChange={(e) => setResumeData({
                ...resumeData,
                professionalSummary: e.target.value
              })}
            />
          </section>

          <section className="editor-section">
            <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="experience-entry mb-4 p-4 border rounded-lg">
                <Input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  className="mb-3"
                  onChange={(e) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index] = { ...exp, company: e.target.value };
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                />
                <Input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  className="mb-3"
                  onChange={(e) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index] = { ...exp, position: e.target.value };
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                />
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input
                    type="text"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExperience = [...resumeData.experience];
                      newExperience[index] = { ...exp, startDate: e.target.value };
                      setResumeData({ ...resumeData, experience: newExperience });
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExperience = [...resumeData.experience];
                      newExperience[index] = { ...exp, endDate: e.target.value };
                      setResumeData({ ...resumeData, experience: newExperience });
                    }}
                  />
                </div>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-3"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index] = { ...exp, description: e.target.value };
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    const newExperience = resumeData.experience.filter((_, i) => i !== index);
                    setResumeData({ ...resumeData, experience: newExperience });
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setResumeData({
                ...resumeData,
                experience: [...resumeData.experience, {
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  description: ''
                }]
              })}
            >
              Add Experience
            </Button>
          </section>

          <section className="editor-section">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-entry mb-4 p-4 border rounded-lg">
                <Input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  className="mb-3"
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index] = { ...edu, school: e.target.value };
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                />
                <Input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  className="mb-3"
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index] = { ...edu, degree: e.target.value };
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                />
                <Input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field}
                  className="mb-3"
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index] = { ...edu, field: e.target.value };
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                />
                <Input
                  type="text"
                  placeholder="Graduation Date"
                  value={edu.graduationDate}
                  className="mb-3"
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index] = { ...edu, graduationDate: e.target.value };
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    const newEducation = resumeData.education.filter((_, i) => i !== index);
                    setResumeData({ ...resumeData, education: newEducation });
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setResumeData({
                ...resumeData,
                education: [...resumeData.education, {
                  school: '',
                  degree: '',
                  field: '',
                  graduationDate: ''
                }]
              })}
            >
              Add Education
            </Button>
          </section>

          <section className="editor-section">
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <Input
              type="text"
              placeholder="Add a skill and press Enter"
              className="mb-3"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  setResumeData({
                    ...resumeData,
                    skills: [...resumeData.skills, e.currentTarget.value.trim()]
                  });
                  e.currentTarget.value = '';
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                  {skill}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => {
                      const newSkills = resumeData.skills.filter((_, i) => i !== index);
                      setResumeData({ ...resumeData, skills: newSkills });
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <div className="preview-panel">
          <div className="resume-preview">
            <h1 className="text-4xl font-bold mb-4">{resumeData.personalInfo.name || 'Your Name'}</h1>
            <div className="contact-info mb-6 text-gray-600 flex flex-wrap gap-4">
              {resumeData.personalInfo.email && <p className="inline-flex items-center gap-2 min-w-[200px]"><span className="text-primary">✉</span>{resumeData.personalInfo.email}</p>}
              {resumeData.personalInfo.phone && <p className="inline-flex items-center gap-2 min-w-[200px]"><span className="text-primary">📱</span>{resumeData.personalInfo.phone}</p>}
              {resumeData.personalInfo.location && <p className="inline-flex items-center gap-2 min-w-[200px]"><span className="text-primary">📍</span>{resumeData.personalInfo.location}</p>}
            </div>

            {resumeData.professionalSummary && (
              <section className="resume-section mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-primary">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">{resumeData.professionalSummary}</p>
              </section>
            )}

            {resumeData.experience.length > 0 && (
              <section className="resume-section mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Professional Experience</h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="experience-item mb-6">
                    <h3 className="text-xl font-medium mb-1">{exp.position} at {exp.company}</h3>
                    <p className="text-gray-600 mb-2">{exp.startDate} - {exp.endDate}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.education.length > 0 && (
              <section className="resume-section mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Education</h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item mb-4">
                    <h3 className="text-xl font-medium mb-1">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                    <p className="text-gray-600">Graduated: {edu.graduationDate}</p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.skills.length > 0 && (
              <section className="resume-section">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
