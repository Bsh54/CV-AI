import type { CVData } from "../types";

const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

export async function optimizeCVWithAI({ jobOffer, currentData }: { jobOffer: string; currentData: CVData }): Promise<CVData> {
  const prompt = `
    Rôle : Expert en recrutement stratégique et honnêteté.
    Tâche : Optimise ce CV pour l'offre fournie SANS JAMAIS INVENTER NI MENTIR.

    RÈGLES STRICTES - À RESPECTER ABSOLUMENT :
    1. NE JAMAIS inventer d'expériences, de compétences ou de formations qui n'existent pas
    2. NE JAMAIS ajouter de fausses responsabilités ou réalisations
    3. UNIQUEMENT reformuler et adapter les données EXISTANTES aux mots-clés de l'offre
    4. Si une compétence n'existe pas dans le CV, NE PAS l'ajouter
    5. Rester FACTUEL et HONNÊTE - c'est plus important que de matcher l'offre
    6. Améliorer la formulation des descriptions existantes, pas les inventer

    DONNÉES ACTUELLES (À ADAPTER, PAS À INVENTER) :
    ${JSON.stringify({
      about: currentData.about,
      experiences: currentData.experiences,
      skills: currentData.skills
    })}

    OFFRE CIBLE : ${jobOffer.substring(0, 800)}

    INSTRUCTIONS D'OPTIMISATION :
    - Reformulez le profil (about) pour mettre en avant les points pertinents EXISTANTS
    - Pour chaque expérience : adaptez la description pour souligner les compétences demandées, SANS INVENTER
    - Pour les compétences : gardez UNIQUEMENT celles qui existent, améliorez leur formulation
    - Si une compétence clé manque, NE L'AJOUTEZ PAS - laissez le candidat honnête

    STRUCTURE JSON ATTENDUE :
    {
      "about": "...",
      "experiences": [{"role": "...", "company": "...", "startDate": "...", "endDate": "...", "isCurrent": boolean, "description": "..."}],
      "skills": [{"name": "...", "level": 90}]
    }

    Réponds UNIQUEMENT avec un objet JSON complet commençant par { et finissant par }.
  `;

  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${AI_API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Tu es un assistant qui répond exclusivement en JSON pur. Tu DOIS respecter les règles strictes d'honnêteté : JAMAIS inventer, JAMAIS mentir, JAMAIS halluciner. Adapter uniquement ce qui existe." },
          { role: "user", content: prompt }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) throw new Error(`Erreur API (${response.status})`);

    const result = await response.json();
    let rawContent = result.choices?.[0]?.message?.content || "";

    // Tentative de réparation du JSON si l'accolade manque (vu dans tes logs)
    if (rawContent.trim().startsWith('"about"') || rawContent.trim().startsWith('about')) {
        rawContent = "{" + rawContent;
    }
    if (rawContent.length > 0 && !rawContent.trim().endsWith('}')) {
        rawContent = rawContent + "}";
    }

    const match = rawContent.match(/(\{[\s\S]*\})/);
    if (!match) throw new Error("L'IA n'a pas renvoyé de données structurées.");

    const optimizedData = JSON.parse(match[1].trim());

    return {
      ...currentData,
      isOptimized: true,
      about: optimizedData.about || currentData.about,
      experiences: optimizedData.experiences || currentData.experiences,
      skills: optimizedData.skills || currentData.skills
    };
  } catch (error: any) {
    console.error("AI_OPTIMIZATION_ERROR:", error.message);
    // On propage l'erreur pour que le bouton de chargement s'arrête et qu'un message s'affiche
    throw new Error("Échec de l'optimisation. Vérifiez votre connexion ou l'offre saisie.");
  }
}
