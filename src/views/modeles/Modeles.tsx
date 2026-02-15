import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useNavigate } from "react-router-dom";
import moderne01 from "@/assets/images/cv-templates/Moderne/moderne-1.jpg";

export default function Modeles() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto pt-32 px-6 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Prêt à commencer ?</h1>
        <p className="text-gray-600 mb-12 text-lg">Choisissez ce modèle professionnel pour générer votre CV optimisé par l'IA.</p>

        <div className="flex justify-center">
          <div
            onClick={() => navigate("/modeles/1")}
            className="group bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#00a99d] cursor-pointer transition-all max-w-sm"
          >
            <div className="overflow-hidden rounded-xl mb-6">
               <img src={moderne01} alt="Modèle Pro" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-bold text-xl text-gray-800">Modèle Classique & Efficace</h3>
            <p className="text-gray-500 text-sm mt-2 mb-6">Un design propre validé par les recruteurs.</p>
            <button className="w-full bg-[#00a99d] text-white py-4 rounded-xl font-bold shadow-md hover:bg-[#008c82] transition-colors uppercase">
              SÉLECTIONNER CE MODÈLE
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
