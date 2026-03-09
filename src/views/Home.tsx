import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Sparkles, Zap, Target, CheckCircle, ArrowRight, Wand2, FileText, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col text-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-indigo-600">
                  ✨ Powered by AI
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Votre CV Parfait en Secondes
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Créez un CV professionnel adapté à chaque offre d'emploi. L'IA analyse l'offre et optimise votre profil pour maximiser vos chances.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/modeles">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 text-lg flex items-center gap-2 w-full sm:w-auto justify-center group">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" /> CRÉER MON CV
                </button>
              </Link>
              <button className="px-8 py-4 bg-white/40 backdrop-blur-md border border-white/60 text-slate-900 font-bold rounded-xl hover:bg-white/60 transition-all duration-300 text-lg hover:shadow-lg">
                En savoir plus
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-600 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>9 templates uniques</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Export PDF haute qualité</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Optimisation IA gratuite</span>
              </div>
            </div>
          </div>

          {/* Glassmorphism Card */}
          <div className="hidden md:block relative z-10">
            <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/40">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg"></div>
                  <div className="h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded w-32"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-indigo-100 rounded w-full"></div>
                  <div className="h-2 bg-indigo-100 rounded w-5/6"></div>
                  <div className="h-2 bg-indigo-100 rounded w-4/5"></div>
                </div>
                <div className="pt-4 border-t border-white/20 space-y-3">
                  <div className="h-2 bg-emerald-100 rounded w-full"></div>
                  <div className="h-2 bg-emerald-100 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">Pourquoi CV-AI ?</h2>
            <p className="text-xl text-slate-600">Tout ce dont vous avez besoin pour un CV gagnant</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white/40 backdrop-blur-md border border-white/40 p-8 rounded-2xl hover:bg-white/60 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Optimisation IA</h3>
              <p className="text-slate-600 leading-relaxed">L'IA analyse l'offre d'emploi et adapte votre CV pour correspondre parfaitement aux attentes du recruteur.</p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/40 backdrop-blur-md border border-white/40 p-8 rounded-2xl hover:bg-white/60 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">9 Templates Distincts</h3>
              <p className="text-slate-600 leading-relaxed">Choisissez parmi 9 designs professionnels adaptés à votre secteur et votre profil.</p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/40 backdrop-blur-md border border-white/40 p-8 rounded-2xl hover:bg-white/60 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Export Instantané</h3>
              <p className="text-slate-600 leading-relaxed">Générez un PDF haute qualité en quelques secondes, prêt à envoyer aux recruteurs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">Comment ça marche ?</h2>
            <p className="text-xl text-slate-600">3 étapes simples pour un CV optimisé</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-emerald-500/50">
                  {step}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  {step === 1 && "Choisir un template"}
                  {step === 2 && "Remplir vos infos"}
                  {step === 3 && "Optimiser & Exporter"}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step === 1 && "Sélectionnez le design qui vous correspond parmi nos 9 templates professionnels."}
                  {step === 2 && "Complétez vos informations personnelles, expériences et compétences."}
                  {step === 3 && "Collez une offre d'emploi et laissez l'IA optimiser votre CV, puis exportez en PDF."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-4">Prêt à transformer votre CV ?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">Commencez maintenant et augmentez vos chances de décrocher le job de vos rêves.</p>
              <Link to="/modeles">
                <button className="mt-8 px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-emerald-50 transition-all text-lg shadow-lg flex items-center gap-2 mx-auto group hover:shadow-2xl">
                  CRÉER MON CV <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
