import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin, Briefcase, Award, Globe } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function CorporateTemplate({ data }: CVTemplateProps) {
  const primaryColor = "#1e40af"; // Blue-800
  const accentColor = "#0369a1"; // Cyan-700

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-sans flex flex-col shadow-2xl overflow-hidden">

        {/* HEADER CORPORATE */}
        <header className="px-16 py-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-5xl font-bold tracking-tight">{data.fullName}</h1>
              <p className="text-xl font-light tracking-wide text-gray-300">{data.title}</p>
            </div>

            <div className="grid grid-cols-3 gap-8 text-[11px] font-medium text-gray-300 pt-4">
              <div className="flex items-center gap-2"><Phone size={13} className="text-blue-400" />{data.contact.phone}</div>
              <div className="flex items-center gap-2"><Mail size={13} className="text-blue-400" />{data.contact.email}</div>
              <div className="flex items-center gap-2"><MapPin size={13} className="text-blue-400" />{data.contact.address}</div>
            </div>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 px-16 py-12 space-y-10">

          {/* EXECUTIVE PROFILE */}
          {data.about && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-4 pb-3 border-b-2" style={{ borderColor: primaryColor }}>Professional Profile</h2>
              <p className="text-[11px] leading-relaxed text-slate-700 font-medium">{data.about}</p>
            </section>
          )}

          {/* EXPÉRIENCES PROFESSIONNELLES */}
          {data.experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-5 pb-3 border-b-2" style={{ borderColor: primaryColor }}>Professional Experience</h2>
              <div className="space-y-7">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[12px] font-bold uppercase text-slate-900 tracking-wide">{exp.role}</h3>
                      <span className="text-[10px] text-slate-500 font-semibold">{exp.startDate} – {exp.endDate || "Present"}</span>
                    </div>
                    <p className="text-[11px] font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                    <p className="text-[10px] leading-relaxed text-slate-700 whitespace-pre-line font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FORMATION & CERTIFICATIONS */}
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Award size={14} style={{ color: primaryColor }} />
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900">Education & Certifications</h2>
              </div>
              <div className="grid grid-cols-2 gap-6 pl-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1 p-4 border-l-4" style={{ borderColor: accentColor, backgroundColor: `${primaryColor}05` }}>
                    <h3 className="text-[11px] font-bold uppercase text-slate-900">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-600 font-semibold">{edu.school}</p>
                    <p className="text-[9px] text-slate-500">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CORE COMPETENCIES */}
          {data.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={14} style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900">Core Competencies</h2>
              </div>
              <div className="grid grid-cols-3 gap-6 pl-6">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-800">
                      <span>{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-300 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ backgroundColor: primaryColor, width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES & INTERESTS */}
          <div className="grid grid-cols-2 gap-10">
            {data.languages.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={14} style={{ color: primaryColor }} />
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900">Languages</h2>
                </div>
                <div className="space-y-2 pl-6">
                  {data.languages.filter(l => l.trim()).map((lang, i) => (
                    <p key={i} className="text-[11px] font-semibold text-slate-700">▪ {lang}</p>
                  ))}
                </div>
              </section>
            )}
            {data.hobbies.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-3">Professional Interests</h2>
                <div className="space-y-2 pl-6">
                  {data.hobbies.filter(h => h.trim()).map((hobby, i) => (
                    <p key={i} className="text-[11px] font-semibold text-slate-700">▪ {hobby}</p>
                  ))}
                </div>
              </section>
            )}
          </div>

        </main>

        {/* FOOTER */}
        <footer className="px-16 py-6 bg-slate-50 border-t border-gray-200 text-center">
          <p className="text-[9px] text-slate-500 font-medium tracking-widest uppercase">Professional CV • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </PdfSafeWrapper>
  );
}
