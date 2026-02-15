import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Send, Sparkles } from "lucide-react";
import { optimizeCVWithAI } from "@/lib/aiService";
import type { CVData } from "@/types";
import { toast } from "react-toastify";
import Navbar from "@/components/navbar";
import { getDemoData, setDemoData } from "@/lib/store";

export default function Optimize() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jobOffer, setJobOffer] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");
  const [cvData, setCvData] = useState<CVData | null>(null);

  useEffect(() => {
    // Utilisation de la RAM uniquement
    const data = getDemoData();
    if (data) {
      setCvData(data);
    } else {
      toast.error("Données introuvables.");
      navigate("/modeles");
    }
  }, [navigate]);

  const handleOptimize = async () => {
    if (!cvData || !jobOffer.trim()) {
      toast.warn("Veuillez coller une offre d'emploi.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("L'IA adapte votre profil...");

    try {
      const optimized = await optimizeCVWithAI({
        jobOffer,
        companyInfo,
        currentData: cvData
      });

      // Stockage uniquement en RAM
      setDemoData(optimized);

      toast.update(toastId, { render: "CV Optimisé !", type: "success", isLoading: false, autoClose: 2000 });
      navigate(`/modeles/1`);
    } catch (error) {
      toast.update(toastId, { render: "❌ Erreur d'optimisation", type: "error", isLoading: false, autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-black">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto pt-32 px-6 pb-20 w-full text-black">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-white text-[#00a99d]">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'édition
        </Button>

        <div className="bg-white p-8 rounded-xl shadow-md border space-y-8">
          <div className="text-center space-y-2 text-black">
            <h1 className="text-2xl font-bold">Optimisation par IA</h1>
            <p className="text-gray-500">Adaptez votre CV à votre cible.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-bold">Description de l'offre d'emploi</Label>
              <textarea
                className="w-full min-h-[150px] p-3 border rounded-lg focus:ring-2 focus:ring-[#00a99d] outline-none"
                placeholder="Copiez l'annonce ici..."
                value={jobOffer}
                onChange={(e) => setJobOffer(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold">Infos sur l'entreprise (Optionnel)</Label>
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00a99d] outline-none"
                placeholder="Valeurs, culture..."
                value={companyInfo}
                onChange={(e) => setCompanyInfo(e.target.value)}
              />
            </div>

            <Button
              className="w-full py-6 bg-[#00a99d] hover:bg-[#008c82] text-white text-lg font-bold shadow-lg"
              onClick={handleOptimize}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 h-5 w-5" />}
              LANCER L'IA
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
