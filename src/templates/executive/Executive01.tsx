import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function ExecutiveTemplate({ data }: CVTemplateProps) {
  const accentColor = "#d97706"; // Amber-600

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-serif flex flex-col shadow-2xl overflow-hidden">

        {/* HEADER EXECUTIVE */}
        <header className="px-16 py-14 border-b-4" style={{ borderColor: accentColor }}>
          <h1 className="text-5xl font-bold text-slate-900 mb-1 tracking-tight">{data.fullName}</h1>
          <p className="text-2xl font-light text-slate-600 mb-8 tracking-wide">{data.title}</p>

          <div className="grid grid-cols-3 gap-8 text-[11px] font-medium text-slate-700">
            <div className="flex items-center gap-2"><Phone size={13} style={{ color: accentColor }} />{data.contact.phone}</div>
            <div className="flex items-center gap-2"><Mail size={13} style={{ color: accentColor }} />{data.contact.email}</div>
            <div className="flex items-center gap-2"><MapPin size={13} style={{ color: accentColor }} />{data.contact.address}</div>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 px-16 py-12 space-y-10">

          {/* EXECUTIVE SUMMARY */}
          {data.about && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-4 pb-3 border-b-2" style={{ borderColor: accentColor }}>Executive Summary</h2>
              <p className="text-[11px] leading-relaxed text-slate-700 font-medium italic">{data.about}</p>
            </section>
          )}

          {/* EXPÉRIENCES */}
          {data.experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-5 pb-3 border-b-2" style={{ borderColor: accentColor }}>Professional Experience</h2>
              <div className="space-y-7">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[12px] font-bold uppercase text-slate-900 tracking-wide">{exp.role}</h3>
                      <span className="text-[10px] text-slate-500 font-semibold">{exp.startDate} – {exp.endDate || "Present"}</span>
                    </div>
                    <p className="text-[11px] font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                    <p className="text-[10px] leading-relaxed text-slate-700 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FORMATION */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-5 pb-3 border-b-2" style={{ borderColor: accentColor }}>Education</h2>
              <div className="space-y-5">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="text-[12px] font-bold uppercase text-slate-900 tracking-wide">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-600 font-semibold">{edu.school}</p>
                    <p className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* COMPÉTENCES & LANGUES */}
          <div className="grid grid-cols-2 gap-10">
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-4 pb-3 border-b-2" style={{ borderColor: accentColor }}>Core Competencies</h2>
                <div className="space-y-3">
                  {data.skills.slice(0, 6).map((skill, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-800">
                        <span>{skill.name}</span>
                        <span className="text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ backgroundColor: accentColor, width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {data.languages.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-4 pb-3 border-b-2" style={{ borderColor: accentColor }}>Languages</h2>
                <div className="space-y-2">
                  {data.languages.filter(l => l.trim()).map((lang, i) => (
                    <p key={i} className="text-[11px] font-semibold text-slate-700">▪ {lang}</p>
                  ))}
                </div>
              </section>
            )}
          </div>

        </main>
      </div>
    </PdfSafeWrapper>
  );
}
