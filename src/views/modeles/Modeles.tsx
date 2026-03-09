import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useNavigate } from "react-router-dom";
import { cvModels } from "@/data/cvModels";

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

export default function Modeles() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto pt-32 px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Choisissez Votre Template</h1>
          <p className="text-gray-600 text-lg">9 designs professionnels adaptés à votre profil</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(cvModels).map(([id, model]) => (
            <div
              key={id}
              onClick={() => navigate(`/modeles/${id}`)}
              className="group bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-opacity-100 cursor-pointer transition-all hover:shadow-2xl"
              style={{ borderColor: model.defaultColor }}
            >
              <div className="mb-6">
                <div
                  className="w-full h-48 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md"
                  style={{ backgroundColor: model.defaultColor }}
                >
                  {model.name}
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{model.name}</h3>
              <p className="text-gray-500 text-sm mb-6">{templateDescriptions[id]}</p>
              <button
                className="w-full text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all uppercase text-sm"
                style={{ backgroundColor: model.defaultColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Sélectionner
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
