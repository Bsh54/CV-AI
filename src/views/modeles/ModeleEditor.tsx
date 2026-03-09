import { useParams } from "react-router-dom";
import { useEffect } from "react";
import type { CVData } from "@/types";
import Navbar from "@/components/navbar";
import { cvModels } from "@/data/cvModels";
import EditorPanel from "@/components/cv/EditorPanel";
import PreviewWrapper from "@/components/cv/PreviewWrapper";
import { getDemoData, setDemoData } from "@/lib/store";
import { Download, Printer, Loader2 } from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";

export default function ModeleEditor() {
  const { modelId } = useParams();
  const model = modelId ? cvModels[modelId] : null;

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-black">
      <style>{`
        .editor-scroll::-webkit-scrollbar {
          width: 12px;
        }
        .editor-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .editor-scroll::-webkit-scrollbar-thumb {
          background: #00a99d;
          border-radius: 6px;
        }
        .editor-scroll::-webkit-scrollbar-thumb:hover {
          background: #008c82;
        }
      `}</style>
      <Navbar />
      <main className="flex-1 pt-20 flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Panneau d'édition avec scroll visible */}
        <div className="editor-scroll w-full lg:w-[450px] bg-white border-r shadow-lg overflow-y-auto p-6">
          <EditorPanel data={cvData} onChange={setCvData} />
        </div>

        {/* Prévisualisation Desktop FIXE */}
        <div className="hidden lg:flex flex-1 bg-gray-200 p-4 md:p-12 justify-center overflow-hidden">
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
