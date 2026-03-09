import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function MinimalTemplate({ data }: CVTemplateProps) {
  const accentColor = "#3b82f6"; // Blue-500

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-sans flex flex-col shadow-2xl overflow-hidden">

        {/* HEADER MINIMALISTE */}
        <header className="px-12 py-10 border-b border-gray-200">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{data.fullName}</h1>
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-500 mb-6">{data.title}</p>

          <div className="flex gap-6 text-[11px] font-medium text-slate-600">
            <span className="flex items-center gap-2"><Phone size={12} />{data.contact.phone}</span>
            <span className="flex items-center gap-2"><Mail size={12} />{data.contact.email}</span>
            <span className="flex items-center gap-2"><MapPin size={12} />{data.contact.address}</span>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 px-12 py-10 space-y-8">

          {/* ABOUT */}
          {data.about && (
            <section>
              <p className="text-[11px] leading-relaxed text-slate-700 font-medium">{data.about}</p>
            </section>
          )}

          {/* EXPÉRIENCES */}
          {data.experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-4 pb-2 border-b border-gray-300">Expérience</h2>
              <div className="space-y-5">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[11px] font-bold uppercase text-slate-900">{exp.role}</h3>
                      <span className="text-[10px] text-slate-500 font-medium">{exp.startDate} - {exp.endDate || "Présent"}</span>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-600">{exp.company}</p>
                    <p className="text-[10px] leading-relaxed text-slate-700 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FORMATION */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-4 pb-2 border-b border-gray-300">Formation</h2>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="text-[11px] font-bold uppercase text-slate-900">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-600 font-medium">{edu.school}</p>
                    <p className="text-[9px] text-slate-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* COMPÉTENCES */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-4 pb-2 border-b border-gray-300">Compétences</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-800">
                      <span>{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: accentColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUES & LOISIRS */}
          <div className="grid grid-cols-2 gap-8">
            {data.languages.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-3 pb-2 border-b border-gray-300">Langues</h2>
                <div className="space-y-2">
                  {data.languages.filter(l => l.trim()).map((lang, i) => (
                    <p key={i} className="text-[10px] font-medium text-slate-700">• {lang}</p>
                  ))}
                </div>
              </section>
            )}
            {data.hobbies.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-3 pb-2 border-b border-gray-300">Loisirs</h2>
                <div className="space-y-2">
                  {data.hobbies.filter(h => h.trim()).map((hobby, i) => (
                    <p key={i} className="text-[10px] font-medium text-slate-700">• {hobby}</p>
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
