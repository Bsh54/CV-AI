import type { CVData } from '../types';

export function validateCVData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data) {
    errors.push('cvData is required');
    return { valid: false, errors };
  }

  // Champs obligatoires
  if (!data.fullName || typeof data.fullName !== 'string') {
    errors.push('fullName is required and must be a string');
  }

  if (!data.title || typeof data.title !== 'string') {
    errors.push('title is required and must be a string');
  }

  if (!data.contact || typeof data.contact !== 'object') {
    errors.push('contact is required and must be an object');
  } else {
    if (!data.contact.email || typeof data.contact.email !== 'string') {
      errors.push('contact.email is required and must be a string');
    }
    if (!data.contact.phone || typeof data.contact.phone !== 'string') {
      errors.push('contact.phone is required and must be a string');
    }
  }

  if (!data.about || typeof data.about !== 'string') {
    errors.push('about is required and must be a string');
  }

  // Validation des tableaux
  if (!Array.isArray(data.experiences)) {
    errors.push('experiences must be an array');
  }

  if (!Array.isArray(data.skills)) {
    errors.push('skills must be an array');
  }

  if (!Array.isArray(data.languages)) {
    errors.push('languages must be an array');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
