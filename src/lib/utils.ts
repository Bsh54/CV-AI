import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Tool } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateRange(startDate: string, endDate: string, isCurrent: boolean): string {
  if (!startDate) return "";

  // Helper to format "YYYY-MM" or "YYYY-MM-DD"
  const format = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    // Check if valid
    if (isNaN(date.getTime())) return dateStr;
    // Capitalize first letter of month
    const str = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const start = format(startDate);
  if (isCurrent) return `${start} - Présent`;
  if (!endDate) return start; // Open ended if no end date provided? Or just start.
  const end = format(endDate);
  return `${start} - ${end}`;
}

export function getToolIconUrl(tool: Tool, variant?: 'white'): string {
  if (tool.source === "custom" && tool.imageUrl) {
    return tool.imageUrl;
  }
  const baseUrl = `https://cdn.simpleicons.org/${tool.id}`;
  if (variant === 'white') {
    return `${baseUrl}/white`;
  }
  return baseUrl;
}
