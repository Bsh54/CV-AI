import Moderne01 from "@/templates/moderne/Moderne01";
import Executive01 from "@/templates/executive/Executive01";
import Tech01 from "@/templates/tech/Tech01";
import Creative01 from "@/templates/creative/Creative01";
import Startup01 from "@/templates/startup/Startup01";
import Academic01 from "@/templates/academic/Academic01";
import Minimal01 from "@/templates/minimal/Minimal01";
import Modern01 from "@/templates/modern/Modern01";
import Corporate01 from "@/templates/corporate/Corporate01";

export const cvModels: Record<string, any> = {
  "1": { name: "Moderne Strategique", component: Moderne01, defaultColor: "#00a99d" },
  "2": { name: "Executive", component: Executive01, defaultColor: "#d97706" },
  "3": { name: "Tech Developer", component: Tech01, defaultColor: "#10b981" },
  "4": { name: "Creative", component: Creative01, defaultColor: "#7c3aed" },
  "5": { name: "Startup", component: Startup01, defaultColor: "#f59e0b" },
  "6": { name: "Academic", component: Academic01, defaultColor: "#059669" },
  "7": { name: "Minimal", component: Minimal01, defaultColor: "#3b82f6" },
  "8": { name: "Modern Gradient", component: Modern01, defaultColor: "#6366f1" },
  "9": { name: "Corporate", component: Corporate01, defaultColor: "#1e40af" },
};
