import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useNavigate } from "react-router-dom";
import { cvModels } from "@/data/cvModels";
import type { CVData } from "@/types";
import PreviewWrapper from "@/components/cv/PreviewWrapper";

const templateDescriptions: Record<string, string> = {
  "1": "Design moderne et stratégique, optimisé pour les recruteurs et ATS.",
  "2": "Élégant et professionnel, idéal pour les cadres supérieurs et dirigeants.",
  "3": "Style tech minimaliste avec layout code-like pour les développeurs.",
  "4": "Design créatif et coloré pour les designers et professionnels créatifs.",
  "5": "Timeline dynamique et moderne pour les entrepreneurs et innovateurs.",
  "6": "Format académique avec citations italiques pour chercheurs et doctorants.",
  "7": "Design épuré et minimaliste pour un impact maximal.",
  "8": "Gradients modernes et design contemporain avec sidebar élégante.",
  "9": "Format corporate professionnel pour les grandes entreprises et cadres.",
};

const demoData: CVData = {
  fullName: "NOEL TAYLOR",
  title: "GRAPHIC & WEB DESIGNER",
  color: "#00a99d",
  contact: {
    phone: "+1-718-310-5588",
    email: "noel.taylor@example.com",
    address: "789 Prudence Lincoln Park, MI",
  },
  about: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  experiences: [
    {
      role: "SENIOR WEB DESIGNER",
      company: "Creative Agency / Chicago",
      startDate: "2020",
      endDate: "Present",
      isCurrent: true,
      description: "Lorem Ipsum has been the industry's standard dummy text.",
    },
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
  ],
  languages: ["ENGLISH", "FRENCH"],
  hobbies: ["READING BOOKS", "TRAVELING"],
  references: [],
  links: [],
  certifications: [],
  tools: [],
  objective: "",
  strategicPitch: "",
};

export default function Modeles() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto pt-32 px-6 pb-20 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Choisissez Votre Template</h1>
          <p className="text-gray-600 text-lg">9 designs professionnels adaptés à votre profil</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(cvModels).map(([id, model]) => {
            const Template = model.component;
            return (
              <div
                key={id}
                onClick={() => navigate(`/modeles/${id}`)}
                className="group bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-opacity-100 cursor-pointer transition-all hover:shadow-2xl overflow-hidden"
                style={{ borderColor: model.defaultColor }}
              >
                {/* Template Preview */}
                <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
                  <div className="scale-[0.25] origin-top-left w-[400%] h-[400%]">
                    <PreviewWrapper>
                      <Template data={demoData} />
                    </PreviewWrapper>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{model.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{templateDescriptions[id]}</p>
                  <button
                    className="w-full text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all uppercase text-sm"
                    style={{ backgroundColor: model.defaultColor }}
                  >
                    Sélectionner
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
