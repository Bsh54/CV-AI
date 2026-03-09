import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin, Briefcase, Palette, Lightbulb, BookOpen, Globe } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function CreativeTemplate({ data }: CVTemplateProps) {
  const primaryColor = "#7c3aed"; // Violet-600
  const secondaryColor = "#ec4899"; // Pink-500

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-sans flex shadow-2xl overflow-hidden">

        {/* SIDEBAR CRÉATIF */}
        <aside className="w-[32%] p-10 flex flex-col" style={{ background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)` }}>

          {/* PHOTO CRÉATIVE */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-44 h-44">
              <div className="absolute inset-0 rounded-3xl" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, opacity: 0.1 }} />
              <div className="relative w-full h-full rounded-3xl border-4 overflow-hidden bg-gray-200 shadow-lg" style={{ borderColor: primaryColor }}>
                {data.profileImage ? (
                  <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs">Photo</div>
                )}
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-8 text-black">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: primaryColor }}>
                  <Mail size={12} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Contact</h3>
              </div>
              <div className="space-y-3 text-[10px] font-medium text-slate-700 pl-8">
                <div className="flex items-center gap-2"><Phone size={11} />{data.contact.phone}</div>
                <div className="flex items-center gap-2"><Mail size={11} />{data.contact.email}</div>
                <div className="flex items-center gap-2"><MapPin size={11} />{data.contact.address}</div>
              </div>
            </section>

            {/* FORMATION */}
            {data.education.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: secondaryColor }}>
                    <BookOpen size={12} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Formation</h3>
                </div>
                <div className="space-y-4 pl-8">
                  {data.education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <h4 className="text-[10px] font-black uppercase text-slate-800">{edu.degree}</h4>
                      <p className="text-[9px] text-slate-600 font-bold">{edu.school}</p>
                      <p className="text-[8px] text-slate-500">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUES */}
            {data.languages.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: primaryColor }}>
                    <Globe size={12} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Langues</h3>
                </div>
                <div className="space-y-2 pl-8">
                  {data.languages.filter(l => l.trim()).map((lang, i) => (
                    <p key={i} className="text-[9px] font-bold text-slate-700">• {lang}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <main className="w-[68%] p-10 flex flex-col bg-white space-y-8">

          {/* HEADER */}
          <div className="space-y-2 pb-6">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight" style={{ color: primaryColor }}>{data.fullName}</h1>
            <p className="text-sm font-bold tracking-[0.15em] uppercase text-slate-600">{data.title}</p>
            <div className="h-1 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }} />
          </div>

          {/* ABOUT */}
          {data.about && (
            <section>
              <p className="text-[11px] leading-relaxed text-slate-700 font-medium italic">{data.about}</p>
            </section>
          )}

          {/* EXPÉRIENCES */}
          {data.experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>Expérience</h2>
              <div className="space-y-6">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="space-y-1 pl-4 border-l-4" style={{ borderColor: secondaryColor }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[11px] font-black uppercase text-slate-800">{exp.role}</h3>
                      <span className="text-[9px] text-slate-400 font-bold">{exp.startDate} - {exp.endDate || "Présent"}</span>
                    </div>
                    <p className="text-[10px] font-bold" style={{ color: primaryColor }}>{exp.company}</p>
                    <p className="text-[10px] leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* COMPÉTENCES */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>Compétences</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-700">
                      <span>{skill.name}</span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: `${primaryColor}20` }}>
                      <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LOISIRS */}
          {data.hobbies.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor }}>Loisirs</h2>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.filter(h => h.trim()).map((hobby, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-[9px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </PdfSafeWrapper>
  );
}
