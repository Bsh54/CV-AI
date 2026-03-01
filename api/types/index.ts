export interface CVData {
  fullName: string;
  title: string;
  color: string;
  profileImage?: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    linkedin?: string;
  };
  about: string;
  objective?: string;
  experiences: Array<{
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
  }>;
  tools: Array<{
    id: string;
    label: string;
    source: string;
    imageUrl?: string;
  }>;
  links: Array<{
    name: string;
    url: string;
  }>;
  languages: string[];
  hobbies: string[];
  references: Array<{
    name: string;
    contact: string;
  }>;
  strategicPitch?: string;
  isOptimized?: boolean;
}

export interface GeneratePDFRequest {
  cvData: CVData;
  jobOffer?: string;
  companyInfo?: string;
}
