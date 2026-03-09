import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin, BookOpen, Award, Globe } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function AcademicTemplate({ data }: CVTemplateProps) {
  const primaryColor = "#059669"; // Emerald-600
  const accentColor = "#7c3aed"; // Violet-600

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-serif flex flex-col shadow-2xl overflow-hidden">

        {/* HEADER ACADÉMIQUE */}
        <header className="px-14 py-10 border-b-4" style={{ borderColor: primaryColor }}>
          <h1 className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">{data.fullName}</h1>
          <p className="text-lg font-light text-slate-600 mb-6 tracking-wide italic">{data.title}</p>

          <div className="grid grid-cols-3 gap-8 text-[11px] font-medium text-slate-700">
            <div className="flex items-center gap-2"><Phone size={13} style={{ color: primaryColor }} />{data.contact.phone}</div>
            <div className="flex items-center gap-2"><Mail size={13} style={{ color: primaryColor }} />{data.contact.email}</div>
            <div className="flex items-center gap-2"><MapPin size={13} style={{ color: primaryColor }} />{data.contact.address}</div>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 px-14 py-10 space-y-9">

          {/* RÉSUMÉ ACADÉMIQUE */}
          {data.about && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-4 pb-3 border-b-2" style={{ borderColor: primaryColor }}>Résumé Académique</h2>
              <p className="text-[11px] leading-relaxed text-slate-700 font-medium italic">{data.about}</p>
            </section>
          )}

          {/* EXPÉRIENCES ACADÉMIQUES */}
          {data.experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-5 pb-3 border-b-2" style={{ borderColor: primaryColor }}>Expérience Professionnelle</h2>
              <div className="space-y-7">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="space-y-2 pl-6 border-l-4" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[12px] font-bold uppercase text-slate-900 tracking-wide">{exp.role}</h3>
                      <span className="text-[10px] text-slate-500 font-semibold italic">{exp.startDate} – {exp.endDate || "Présent"}</span>
                    </div>
                    <p className="text-[11px] font-semibold" style={{ color: primaryColor }}>{exp.company}</p>
                    <p className="text-[10px] leading-relaxed text-slate-700 whitespace-pre-line font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FORMATION ACADÉMIQUE */}
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={14} style={{ color: primaryColor }} />
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900">Formation Académique</h2>
              </div>
              <div className="space-y-5 pl-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                    <h3 className="text-[12px] font-bold uppercase text-slate-900 tracking-wide">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-600 font-semibold">{edu.school}</p>
                    <p className="text-[10px] text-slate-500 italic">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DOMAINES DE COMPÉTENCE */}
          {data.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Award size={14} style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900">Domaines de Compétence</h2>
              </div>
              <div className="grid grid-cols-2 gap-6 pl-6">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-800">
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

          {/* LANGUES & INTÉRÊTS */}
          <div className="grid grid-cols-2 gap-10">
            {data.languages.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={14} style={{ color: primaryColor }} />
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900">Langues</h2>
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
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 mb-3">Intérêts Académiques</h2>
                <div className="space-y-2 pl-6">
                  {data.hobbies.filter(h => h.trim()).map((hobby, i) => (
                    <p key={i} className="text-[11px] font-semibold text-slate-700">▪ {hobby}</p>
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
