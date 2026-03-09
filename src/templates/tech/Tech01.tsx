import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin, Code2, Terminal, Zap } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function TechTemplate({ data }: CVTemplateProps) {
  const primaryColor = "#10b981"; // Emerald-500
  const bgColor = "#0f172a"; // Slate-900

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-mono flex flex-col shadow-2xl overflow-hidden">

        {/* HEADER TECH */}
        <header className="px-12 py-10" style={{ backgroundColor: bgColor, color: "white" }}>
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <Terminal size={16} style={{ color: primaryColor }} />
              <span className="text-[10px] font-bold tracking-widest" style={{ color: primaryColor }}>$ whoami</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">{data.fullName}</h1>
            <p className="text-sm font-bold tracking-[0.15em] uppercase text-gray-400">{data.title}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 text-[10px] font-medium text-gray-300">
            <div className="flex items-center gap-2"><Phone size={12} style={{ color: primaryColor }} />{data.contact.phone}</div>
            <div className="flex items-center gap-2"><Mail size={12} style={{ color: primaryColor }} />{data.contact.email}</div>
            <div className="flex items-center gap-2"><MapPin size={12} style={{ color: primaryColor }} />{data.contact.address}</div>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 px-12 py-10 space-y-8">

          {/* ABOUT */}
          {data.about && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-widest" style={{ color: primaryColor }}>$ cat about.txt</span>
              </div>
              <div className="pl-4 border-l-2" style={{ borderColor: primaryColor }}>
                <p className="text-[10px] leading-relaxed text-slate-700 font-medium">{data.about}</p>
              </div>
            </section>
          )}

          {/* EXPÉRIENCES */}
          {data.experiences.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={14} style={{ color: primaryColor }} />
                <span className="text-[10px] font-bold tracking-widest" style={{ color: primaryColor }}>EXPERIENCE</span>
              </div>
              <div className="space-y-6 pl-4">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="space-y-1 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[11px] font-black uppercase text-slate-900">{exp.role}</h3>
                      <span className="text-[9px] text-slate-500 font-bold">{exp.startDate} - {exp.endDate || "now"}</span>
                    </div>
                    <p className="text-[10px] font-bold" style={{ color: primaryColor }}>{exp.company}</p>
                    <p className="text-[10px] leading-relaxed text-slate-700 whitespace-pre-line font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FORMATION */}
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} style={{ color: primaryColor }} />
                <span className="text-[10px] font-bold tracking-widest" style={{ color: primaryColor }}>EDUCATION</span>
              </div>
              <div className="space-y-4 pl-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                    <h3 className="text-[11px] font-black uppercase text-slate-900">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-600 font-bold">{edu.school}</p>
                    <p className="text-[9px] text-slate-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* COMPÉTENCES */}
          {data.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={14} style={{ color: primaryColor }} />
                <span className="text-[10px] font-bold tracking-widest" style={{ color: primaryColor }}>SKILLS</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pl-4">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-800">
                      <span>{skill.name}</span>
                      <span className="text-slate-500">[{skill.level}%]</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-300 rounded overflow-hidden">
                      <div className="h-full rounded" style={{ width: `${skill.level}%`, backgroundColor: primaryColor }} />
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
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-widest" style={{ color: primaryColor }}>LANGUAGES</span>
                </div>
                <div className="space-y-2 pl-4">
                  {data.languages.filter(l => l.trim()).map((lang, i) => (
                    <p key={i} className="text-[10px] font-bold text-slate-700">→ {lang}</p>
                  ))}
                </div>
              </section>
            )}
            {data.hobbies.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-widest" style={{ color: primaryColor }}>INTERESTS</span>
                </div>
                <div className="space-y-2 pl-4">
                  {data.hobbies.filter(h => h.trim()).map((hobby, i) => (
                    <p key={i} className="text-[10px] font-bold text-slate-700">→ {hobby}</p>
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
