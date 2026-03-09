import type { CVData } from "../types";

const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

export async function optimizeCVWithAI({ jobOffer, currentData }: { jobOffer: string; currentData: CVData }): Promise<CVData> {
  const prompt = `
    Rôle : Expert en recrutement stratégique.
    Tâche : Optimise intégralement ce CV pour l'offre fournie.
    Réponds UNIQUEMENT avec un objet JSON complet commençant par { et finissant par }.

    IMPORTANT : Optimise le profil (about), TOUTES les expériences (descriptions) et les compétences (skills) pour correspondre aux mots-clés de l'offre.

    DONNÉES ACTUELLES :
    ${JSON.stringify({
      about: currentData.about,
      experiences: currentData.experiences,
      skills: currentData.skills
    })}

    OFFRE CIBLE : ${jobOffer.substring(0, 800)}

    STRUCTURE JSON ATTENDUE :
    {
      "about": "...",
      "experiences": [{"role": "...", "company": "...", "startDate": "...", "endDate": "...", "isCurrent": boolean, "description": "..."}],
      "skills": [{"name": "...", "level": 90}]
    }
  `;

  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${AI_API_KEY}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Tu es un assistant qui répond exclusivement en JSON pur." },
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
