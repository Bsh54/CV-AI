import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 pt-32">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Optimisez votre CV avec l'IA
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Remplissez vos informations, collez une offre d'emploi, et laissez l'IA adapter votre profil pour maximiser vos chances de recrutement.
        </p>
        <Link to="/modeles">
          <button className="px-10 py-5 bg-[#00a99d] text-white font-bold rounded-xl hover:bg-[#008c82] transition-all text-xl shadow-lg">
            CRÉER MON CV
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
