import type { CVData } from "@/types";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";
import { Mail, Phone, MapPin, Briefcase, Award, Users } from "lucide-react";

interface CVTemplateProps {
  data: CVData;
}

export default function ModernTemplate({ data }: CVTemplateProps) {
  const primaryColor = "#6366f1"; // Indigo-500
  const secondaryColor = "#ec4899"; // Pink-500

  return (
    <PdfSafeWrapper>
      <div className="w-full min-h-[1123px] bg-white text-gray-800 font-sans flex shadow-2xl overflow-hidden">

        {/* SIDEBAR MODERNE */}
        <aside className="w-[30%] p-10 flex flex-col" style={{ background: `linear-gradient(180deg, ${primaryColor}10 0%, ${secondaryColor}10 100%)` }}>

          {/* PHOTO */}
          <div className="mb-10 flex justify-center">
            <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gray-200 shadow-lg border-4" style={{ borderColor: primaryColor }}>
              {data.profileImage ? (
                <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs">Photo</div>
              )}
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-8 text-black">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>Contact</h3>
              <div className="space-y-3 text-[10px] font-medium text-slate-700">
                <div className="flex items-center gap-2"><Phone size={12} />{data.contact.phone}</div>
                <div className="flex items-center gap-2"><Mail size={12} />{data.contact.email}</div>
                <div className="flex items-center gap-2"><MapPin size={12} />{data.contact.address}</div>
              </div>
            </section>

            {/* FORMATION */}
            {data.education.length > 0 && (
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>Formation</h3>
                <div className="space-y-4">
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
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor }}>Langues</h3>
                <div className="space-y-2">
                  {data.languages.filter(l => l.trim()).map((lang, i) => (
                    <p key={i} className="text-[9px] font-bold text-slate-700">• {lang}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <main className="w-[70%] p-10 flex flex-col bg-white space-y-8">

          {/* HEADER */}
          <div className="space-y-2 pb-6">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight" style={{ color: primaryColor }}>{data.fullName}</h1>
            <p className="text-sm font-bold tracking-[0.15em] uppercase text-slate-600">{data.title}</p>
            <div className="h-1 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }} />
          </div>

          {/* ABOUT */}
          {data.about && (
            <section>
              <p className="text-[11px] leading-relaxed text-slate-700 font-medium">{data.about}</p>
            </section>
          )}

          {/* EXPÉRIENCES */}
          {data.experiences.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={14} style={{ color: primaryColor }} />
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">Expérience</h2>
              </div>
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
              <div className="flex items-center gap-2 mb-4">
                <Award size={14} style={{ color: secondaryColor }} />
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">Compétences</h2>
              </div>
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
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} style={{ color: primaryColor }} />
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">Loisirs</h2>
              </div>
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
