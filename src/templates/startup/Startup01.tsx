import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin, Rocket, TrendingUp, Zap, Lightbulb } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function StartupTemplate({ data }: CVTemplateProps) {
  const primaryColor = "#f59e0b"; // Amber-500
  const accentColor = "#06b6d4"; // Cyan-500

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-sans flex flex-col shadow-2xl overflow-hidden">

        {/* HERO SECTION */}
        <header className="px-12 py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ backgroundColor: primaryColor }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full" style={{ backgroundColor: accentColor }} />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Rocket size={18} style={{ color: primaryColor }} />
              <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: primaryColor }}>Innovateur</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">{data.fullName}</h1>
            <p className="text-xl font-light tracking-wide text-gray-300">{data.title}</p>

            <div className="flex gap-8 text-[11px] font-medium text-gray-300 pt-4">
              <div className="flex items-center gap-2"><Phone size={13} style={{ color: accentColor }} />{data.contact.phone}</div>
              <div className="flex items-center gap-2"><Mail size={13} style={{ color: accentColor }} />{data.contact.email}</div>
              <div className="flex items-center gap-2"><MapPin size={13} style={{ color: accentColor }} />{data.contact.address}</div>
            </div>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 px-12 py-12 space-y-10">

          {/* PITCH */}
          {data.about && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: primaryColor }}>
                  <Lightbulb size={16} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Vision & Mission</h2>
              </div>
              <div className="pl-12 border-l-4" style={{ borderColor: primaryColor }}>
                <p className="text-[11px] leading-relaxed text-slate-700 font-medium italic">{data.about}</p>
              </div>
            </section>
          )}

          {/* EXPÉRIENCES */}
          {data.experiences.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp size={16} style={{ color: accentColor }} />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Parcours Entrepreneurial</h2>
              </div>
              <div className="space-y-6">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="relative pl-8">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: primaryColor, backgroundColor: "white" }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[12px] font-black uppercase text-slate-900 tracking-wide">{exp.role}</h3>
                        <span className="text-[10px] text-slate-500 font-bold">{exp.startDate} – {exp.endDate || "Aujourd'hui"}</span>
                      </div>
                      <p className="text-[11px] font-bold" style={{ color: accentColor }}>{exp.company}</p>
                      <p className="text-[10px] leading-relaxed text-slate-700 whitespace-pre-line">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FORMATION */}
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={16} style={{ color: primaryColor }} />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Formation & Certifications</h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="p-4 rounded-lg border-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}05` }}>
                    <h3 className="text-[11px] font-black uppercase text-slate-900 mb-1">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-600 font-semibold mb-1">{edu.school}</p>
                    <p className="text-[9px] text-slate-500">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* COMPÉTENCES */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-4 pb-3 border-b-2" style={{ borderColor: accentColor }}>Compétences Clés</h2>
              <div className="grid grid-cols-2 gap-6">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-slate-800">
                      <span>{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200">
                      <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})` }} />
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
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor }}>Langues</h2>
                <div className="space-y-2">
                  {data.languages.filter(l => l.trim()).map((lang, i) => (
                    <p key={i} className="text-[11px] font-bold text-slate-700">◆ {lang}</p>
                  ))}
                </div>
              </section>
            )}
            {data.hobbies.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>Passions</h2>
                <div className="space-y-2">
                  {data.hobbies.filter(h => h.trim()).map((hobby, i) => (
                    <p key={i} className="text-[11px] font-bold text-slate-700">◆ {hobby}</p>
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
