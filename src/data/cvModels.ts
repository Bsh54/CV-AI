import Moderne01 from "@/templates/moderne/Moderne01";
import Executive01 from "@/templates/executive/Executive01";
import Tech01 from "@/templates/tech/Tech01";
import Creative01 from "@/templates/creative/Creative01";

export const cvModels: Record<string, any> = {
  "1": { name: "Moderne Strategique", component: Moderne01, defaultColor: "#00a99d" },
  "2": { name: "Executive", component: Executive01, defaultColor: "#d97706" },
  "3": { name: "Tech Developer", component: Tech01, defaultColor: "#10b981" },
  "4": { name: "Creative", component: Creative01, defaultColor: "#7c3aed" },
};
