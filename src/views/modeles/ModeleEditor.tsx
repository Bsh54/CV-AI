import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import type { CVData } from "@/types";
import Navbar from "@/components/navbar";
import { cvModels } from "@/data/cvModels";
import EditorPanel from "@/components/cv/EditorPanel";
import PreviewWrapper from "@/components/cv/PreviewWrapper";
import { getDemoData, setDemoData } from "@/lib/store";
import { Download, Sparkles, Printer, Loader2 } from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";

export default function ModeleEditor() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const model = modelId ? cvModels[modelId] : null;
  const [isExporting, setIsExporting] = useState(false);

  const getDefaultData = (): CVData => ({
    fullName: "NOEL TAYLOR",
    title: "GRAPHIC & WEB DESIGNER",
    color: "#00a99d",
    contact: {
      phone: "+1-718-310-5588",
      email: "noel.taylor@example.com",
      address: "789 Prudence Lincoln Park, MI",
    },
    about: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    experiences: [
      {
        role: "SENIOR WEB DESIGNER",
        company: "Creative Agency / Chicago",
        startDate: "2020",
        endDate: "Present",
        isCurrent: true,
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley of type.",
      },
      {
        role: "GRAPHIC DESIGNER",
        company: "Creative Market / Chicago",
        startDate: "2015",
        endDate: "2020",
        isCurrent: false,
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley of type.",
      }
    ],
    education: [
      {
        degree: "STANFORD UNIVERSITY",
        school: "MASTER DEGREE GRADUATE",
        startDate: "2011",
        endDate: "2013",
        isCurrent: false,
      }
    ],
    skills: [
      { name: "Adobe Photoshop", level: 85 },
      { name: "Adobe Illustrator", level: 75 },
      { name: "Microsoft Word", level: 90 },
      { name: "Microsoft Powerpoint", level: 80 },
      { name: "HTML-5/CSS-3", level: 65 },
    ],
    languages: ["ENGLISH", "FRENCH", "SPANISH", "GERMAN"],
    hobbies: ["READING BOOKS", "TRAVELING", "PLAYING CHESS"],
    references: [
      { name: "DARWIN B. MAGANA", contact: "Tel: +1-970-533-3393" },
      { name: "ROBERT J. BELVIN", contact: "Tel: +1-908-987-5103" }
    ],
    links: [],
    certifications: [],
    tools: [],
    objective: "",
    strategicPitch: "",
  });

  // Utilisation uniquement du store en mémoire (RAM)
  const [cvData, setCvData] = useState<CVData>(getDemoData() || getDefaultData());

  useEffect(() => {
    setDemoData(cvData);
  }, [cvData]);

  if (!model) return <div className="py-32 text-center text-black font-bold uppercase">Modèle introuvable</div>;

  const Template = model.component;

  const handleExportPDF = async () => {
    const element = document.querySelector("#cv-preview > div") as HTMLElement;
    if (!element) return;

    setIsExporting(true);
    const toastId = toast.loading("Génération du PDF haute fidélité...");

    try {
      const opt = {
        margin: 0,
        filename: `CV_${cvData.fullName.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: {
          scale: 4,
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc: Document) => {
            try {
              const styles = clonedDoc.querySelectorAll("style");
              styles.forEach(s => {
                s.innerHTML = s.innerHTML.replace(/oklch\([^)]+\)/g, "#1e293b");
              });

              clonedDoc.querySelectorAll("*").forEach(el => {
                const element = el as HTMLElement;
                if (element.style) {
                  const computedStyle = window.getComputedStyle(element);
                  if (computedStyle.color.includes("oklch")) element.style.color = "#1e293b";
                  if (computedStyle.backgroundColor.includes("oklch")) element.style.backgroundColor = "#ffffff";
                  if (computedStyle.borderColor.includes("oklch")) element.style.borderColor = "#1e293b";
                }
              });
            } catch (err) {
              console.warn("Style cleanup warning:", err);
            }

            const clonedElement = clonedDoc.querySelector(".pdf-export-mode") as HTMLElement;
            if (clonedElement) {
              clonedElement.style.width = "794px";
              clonedElement.style.height = "1122px";
              clonedElement.style.minHeight = "1122px";
              clonedElement.style.maxHeight = "1122px";
              clonedElement.style.overflow = "hidden";
              clonedElement.style.position = "relative";

              clonedElement.querySelectorAll("svg").forEach(svg => {
                const color = window.getComputedStyle(svg).color;
                svg.setAttribute("stroke", color);
                svg.style.stroke = color;
                svg.querySelectorAll("path, circle, line, polyline, rect").forEach(path => {
                  const p = path as SVGElement;
                  p.setAttribute("stroke", color);
                  p.style.stroke = color;
                });
              });

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
    <div className="min-h-screen bg-gray-50 flex flex-col text-black">
      <Navbar />
      <main className="flex-1 pt-20 flex flex-col lg:flex-row">
        <div className="w-full lg:w-[450px] bg-white border-r shadow-lg overflow-y-auto p-6 scrollbar-hide">
          <EditorPanel data={cvData} onChange={setCvData} />
        </div>

        {/* Prévisualisation Desktop */}
        <div className="hidden lg:flex flex-1 bg-gray-200 overflow-y-auto p-4 md:p-12 justify-center">
          <div className="w-full max-w-[850px]">
            <PreviewWrapper>
              <Template data={cvData} />
            </PreviewWrapper>
          </div>
        </div>
      </main>
    </div>
  );
}
