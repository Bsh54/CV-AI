import type { CVData } from "../types";

// Stockage uniquement en mémoire vive (RAM)
// S'efface au rechargement de la page (F5)
let currentDemoData: CVData | null = null;

export const getDemoData = () => currentDemoData;
export const setDemoData = (data: CVData) => {
  currentDemoData = data;
};
