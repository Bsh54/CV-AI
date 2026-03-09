import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Sparkles, Zap, Target, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Votre CV <span className="text-[#00a99d]">Optimisé par l'IA</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Créez un CV professionnel adapté à chaque offre d'emploi. Laissez l'IA analyser l'offre et optimiser votre profil pour maximiser vos chances.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/modeles">
                <button className="px-8 py-4 bg-[#00a99d] text-white font-bold rounded-xl hover:bg-[#008c82] transition-all text-lg shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Sparkles className="w-5 h-5" /> CRÉER MON CV
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-xl hover:border-[#00a99d] hover:text-[#00a99d] transition-all text-lg">
                En savoir plus
              </button>
            </div>

            <div className="flex gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00a99d]" />
                <span>9 templates professionnels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00a99d]" />
                <span>Export PDF haute qualité</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-[#00a99d]/10 to-[#00a99d]/5 rounded-2xl p-8 border border-[#00a99d]/20">
              <div className="space-y-4">
                <div className="h-3 bg-[#00a99d]/20 rounded w-3/4"></div>
                <div className="h-3 bg-[#00a99d]/20 rounded w-full"></div>
                <div className="h-3 bg-[#00a99d]/20 rounded w-5/6"></div>
                <div className="mt-8 space-y-3">
                  <div className="h-2 bg-[#00a99d]/10 rounded w-full"></div>
                  <div className="h-2 bg-[#00a99d]/10 rounded w-4/5"></div>
                  <div className="h-2 bg-[#00a99d]/10 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Pourquoi CV-AI ?</h2>
            <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour un CV gagnant</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#00a99d] hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#00a99d]/10 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#00a99d]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Optimisation IA</h3>
              <p className="text-gray-600">L'IA analyse l'offre d'emploi et adapte votre CV pour correspondre parfaitement aux attentes du recruteur.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#00a99d] hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#00a99d]/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#00a99d]" />
              </div>
              <h3 className="text-xl font-bold mb-3">9 Templates Distincts</h3>
              <p className="text-gray-600">Choisissez parmi 9 designs professionnels adaptés à votre secteur et votre profil.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#00a99d] hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#00a99d]/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#00a99d]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Export Instantané</h3>
              <p className="text-gray-600">Générez un PDF haute qualité en quelques secondes, prêt à envoyer aux recruteurs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600">3 étapes simples pour un CV optimisé</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a99d] text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-3">Choisir un template</h3>
              <p className="text-gray-600">Sélectionnez le design qui vous correspond parmi nos 9 templates professionnels.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a99d] text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-3">Remplir vos infos</h3>
              <p className="text-gray-600">Complétez vos informations personnelles, expériences et compétences.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a99d] text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Optimiser & Exporter</h3>
              <p className="text-gray-600">Collez une offre d'emploi et laissez l'IA optimiser votre CV, puis exportez en PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#00a99d] to-[#008c82]">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-4xl md:text-5xl font-black">Prêt à transformer votre CV ?</h2>
          <p className="text-xl opacity-90">Commencez maintenant et augmentez vos chances de décrocher le job de vos rêves.</p>
          <Link to="/modeles">
            <button className="px-10 py-4 bg-white text-[#00a99d] font-bold rounded-xl hover:bg-gray-100 transition-all text-lg shadow-lg flex items-center gap-2 mx-auto">
              CRÉER MON CV <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
