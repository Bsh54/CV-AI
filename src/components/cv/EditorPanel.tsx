import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, Plus, Sparkles, Download, Printer, Loader2, ImageIcon, X } from "lucide-react";
import type { CVData } from "@/types";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";

interface EditorPanelProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export default function EditorPanel({ data, onChange }: EditorPanelProps) {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof CVData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleNestedChange = (parent: keyof CVData, field: string, value: string) => {
    onChange({
      ...data,
      [parent]: { ...data[parent as keyof CVData] as any, [field]: value },
    });
  };

  const addItem = (field: keyof CVData, item: any) => {
    const list = (data[field] as any[]) || [];
    onChange({ ...data, [field]: [...list, item] });
  };

  const updateItem = (field: keyof CVData, index: number, key: string | null, value: any) => {
    const list = [...(data[field] as any[])];
    if (key) list[index] = { ...list[index], [key]: value };
    else list[index] = value;
    onChange({ ...data, [field]: list });
  };

  const removeItem = (field: keyof CVData, index: number) => {
    const list = [...(data[field] as any[])];
    list.splice(index, 1);
    onChange({ ...data, [field]: list });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => handleChange("profileImage", reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleExportPDF = async () => {
    const element = document.querySelector("#cv-preview > div") as HTMLElement;
    if (!element) return;

    setIsExporting(true);
    const toastId = toast.loading("Génération du PDF haute fidélité...");

    try {
      const opt = {
        margin: 0,
        filename: `CV_${data.fullName.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: {
          scale: 4, // Qualité maximale pour éviter le flou
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc: Document) => {
            // 1. Fix OKLCH pour éviter le crash
            const styles = clonedDoc.querySelectorAll("style");
            styles.forEach(s => {
              s.innerHTML = s.innerHTML.replace(/oklch\([^)]+\)/g, "#1e293b");
            });

            const clonedElement = clonedDoc.querySelector(".pdf-export-mode") as HTMLElement;
            if (clonedElement) {
              // 2. VERROUILLAGE PHYSIQUE A4
              clonedElement.style.width = "794px";
              clonedElement.style.height = "1122px";
              clonedElement.style.minHeight = "1122px";
              clonedElement.style.maxHeight = "1122px";
              clonedElement.style.overflow = "hidden";
              clonedElement.style.position = "relative";

              // 3. FIX PROFOND DES ICÔNES (Injection dans les paths)
              clonedElement.querySelectorAll("svg").forEach(svg => {
                const color = window.getComputedStyle(svg).color;
                svg.setAttribute("stroke", color);
                svg.style.stroke = color;
                svg.querySelectorAll("path, circle, line, polyline, rect").forEach(path => {
                  path.setAttribute("stroke", color);
                  path.style.stroke = color;
                });
              });

              // 4. FIX IMAGES
              clonedElement.querySelectorAll("img").forEach(img => {
                img.style.objectFit = "cover";
                img.style.display = "block";
              });
            }
          }
        },
        jsPDF: { unit: "px", format: [794, 1122], orientation: "portrait", hotfixes: ["px_scaling"] }
      };

      element.classList.add("pdf-export-mode");
      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
      element.classList.remove("pdf-export-mode");

      toast.update(toastId, { render: "✅ PDF téléchargé !", type: "success", isLoading: false, autoClose: 2000 });
    } catch (e) {
      console.error("PDF_ERROR:", e);
      toast.update(toastId, { render: "❌ Erreur de génération", type: "error", isLoading: false, autoClose: 2000 });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["infos", "experiences"]} className="w-full">

        {/* 1. INFOS & PHOTO */}
        <AccordionItem value="infos">
          <AccordionTrigger className="font-bold">1. État Civil & Photo</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed rounded-xl bg-gray-50">
                {data.profileImage ? (
                    <div className="relative">
                        <img src={data.profileImage} className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md" alt="Profil" />
                        <button onClick={() => handleChange("profileImage", "")} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md"><X className="w-3 h-3"/></button>
                    </div>
                ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center text-gray-400 hover:text-indigo-600 transition-colors">
                        <ImageIcon className="w-10 h-10 mb-2" />
                        <span className="text-xs font-bold uppercase">Ajouter une photo</span>
                    </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black text-gray-400">Nom Complet</Label>
              <input className="w-full border rounded-md px-3 py-2 text-sm" value={data.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black text-gray-400">Titre du poste</Label>
              <input className="w-full border rounded-md px-3 py-2 text-sm" value={data.title} onChange={(e) => handleChange("title", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-gray-400">Email</Label>
                <input className="w-full border rounded-md px-3 py-2 text-sm" value={data.contact.email} onChange={(e) => handleNestedChange("contact", "email", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-gray-400">Téléphone</Label>
                <input className="w-full border rounded-md px-3 py-2 text-sm" value={data.contact.phone} onChange={(e) => handleNestedChange("contact", "phone", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-gray-400">Adresse</Label>
                <input className="w-full border rounded-md px-3 py-2 text-sm" value={data.contact.address} onChange={(e) => handleNestedChange("contact", "address", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-gray-400">Profil / Résumé</Label>
                <textarea className="w-full border rounded px-3 py-2 text-sm h-20 outline-none focus:border-indigo-500" value={data.about} onChange={(e) => handleChange("about", e.target.value)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. EXPÉRIENCES */}
        <AccordionItem value="experiences">
          <AccordionTrigger className="font-bold">2. Expériences Pro</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {data.experiences.map((exp, i) => (
              <div key={i} className="border p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                <button onClick={() => removeItem("experiences", i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                <input placeholder="Poste" className="w-full bg-white border rounded px-3 py-2 text-sm font-bold outline-none" value={exp.role} onChange={(e) => updateItem("experiences", i, "role", e.target.value)} />
                <input placeholder="Entreprise / Lieu" className="w-full bg-white border rounded px-3 py-2 text-xs outline-none" value={exp.company} onChange={(e) => updateItem("experiences", i, "company", e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Dates (ex: 2020 - Présent)" className="w-full bg-white border rounded px-3 py-2 text-[10px] outline-none" value={exp.startDate} onChange={(e) => updateItem("experiences", i, "startDate", e.target.value)} />
                </div>
                <textarea placeholder="Missions..." className="w-full text-xs border rounded p-2 h-20 outline-none" value={exp.description} onChange={(e) => updateItem("experiences", i, "description", e.target.value)} />
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => addItem("experiences", { role: "", company: "", startDate: "", endDate: "", isCurrent: true, description: "" })}>+ Ajouter Expérience</Button>
          </AccordionContent>
        </AccordionItem>

        {/* 3. AUTRES (Compétences, Formation, Langues...) */}
        <AccordionItem value="others">
          <AccordionTrigger className="font-bold text-gray-400">3. Autres rubriques</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2">
             {/* FORMATION */}
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-indigo-600">Formation</Label>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex gap-2 items-center bg-white p-2 border rounded">
                        <input className="flex-1 text-xs outline-none" placeholder="Diplôme / Ecole" value={edu.degree} onChange={(e) => updateItem("education", i, "degree", e.target.value)} />
                        <button onClick={() => removeItem("education", i)}><X className="w-3 h-3 text-red-400"/></button>
                    </div>
                ))}
                <button onClick={() => addItem("education", { degree: "", school: "", startDate: "", endDate: "", isCurrent: false })} className="text-[10px] font-bold text-indigo-600">+ Ajouter Diplôme</button>
             </div>

             {/* SKILLS */}
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-indigo-600">Compétences (%)</Label>
                {data.skills.map((s, i) => (
                    <div key={i} className="flex gap-2 items-center bg-white p-2 border rounded">
                        <input className="flex-1 text-xs outline-none" value={s.name} onChange={(e) => updateItem("skills", i, "name", e.target.value)} />
                        <input type="number" className="w-10 text-xs text-center" value={s.level} onChange={(e) => updateItem("skills", i, "level", parseInt(e.target.value))} />
                        <button onClick={() => removeItem("skills", i)}><X className="w-3 h-3 text-red-400"/></button>
                    </div>
                ))}
                <button onClick={() => addItem("skills", { name: "", level: 80 })} className="text-[10px] font-bold text-indigo-600">+ Ajouter Compétence</button>
             </div>

             {/* LANGUAGES & HOBBIES */}
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase">Langues</Label>
                    <textarea className="w-full border rounded text-xs p-2 h-16 outline-none" placeholder="Une langue par ligne" value={data.languages.join("\n")} onChange={(e) => handleChange("languages", e.target.value.split("\n"))} />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase">Loisirs</Label>
                    <textarea className="w-full border rounded text-xs p-2 h-16 outline-none" placeholder="Un loisir par ligne" value={data.hobbies.join("\n")} onChange={(e) => handleChange("hobbies", e.target.value.split("\n"))} />
                </div>
             </div>

             {/* RÉFÉRENCES */}
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-indigo-600">Références</Label>
                {data.references.map((ref, i) => (
                    <div key={i} className="space-y-2 p-3 border rounded bg-white relative group">
                        <button onClick={() => removeItem("references", i)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3"/></button>
                        <input className="w-full text-xs font-bold outline-none" placeholder="Nom du référent" value={ref.name} onChange={(e) => updateItem("references", i, "name", e.target.value)} />
                        <input className="w-full text-[10px] outline-none text-gray-500" placeholder="Poste / Contact" value={ref.contact} onChange={(e) => updateItem("references", i, "contact", e.target.value)} />
                    </div>
                ))}
                <button onClick={() => addItem("references", { name: "", contact: "" })} className="text-[10px] font-bold text-indigo-600">+ Ajouter Référence</button>
             </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-6 border-t space-y-4">
        {!data.isOptimized ? (
          <Button onClick={() => navigate("/optimize")} className="w-full py-8 bg-[#00a99d] hover:bg-[#008c82] text-lg font-black shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95 text-white">
            ÉTAPE SUIVANTE : OPTIMISER <Sparkles className="w-5 h-5 fill-white" />
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-[10px] font-bold uppercase tracking-widest text-center">Optimisation effectuée</div>
            <Button onClick={handleExportPDF} disabled={isExporting} className="w-full py-8 bg-[#00a99d] hover:bg-[#008c82] font-black text-lg shadow-lg text-white">
                {isExporting ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" />} TÉLÉCHARGER LE CV (PDF)
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="w-full py-4 font-bold border-2 text-[#00a99d] border-[#00a99d] hover:bg-[#f0f7f7]"><Printer className="mr-2 h-4 w-4" /> IMPRIMER</Button>
            <button onClick={() => navigate("/optimize")} className="w-full text-[#00a99d] hover:underline text-[10px] font-black uppercase pt-2">Modifier l'offre d'emploi</button>
          </div>
        )}
      </div>
    </div>
  );
}
