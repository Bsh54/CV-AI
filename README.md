# 📄 CV-AI | Optimisation Stratégique de CV

<p align="center">
  <img src="public/favicon.svg" width="80" alt="CV-AI Logo" />
</p>

<p align="center">
  <strong>Transformez votre parcours professionnel en une candidature irrésistible grâce à la puissance de l'IA.</strong>
</p>

<p align="center">
  <a href="https://cv-ai-neon.vercel.app/"><strong>🌐 Voir la Démo en Ligne</strong></a>
</p>

---

## 🚀 À propos du Projet

**CV-AI** est une application web moderne conçue pour les candidats exigeants. Elle ne se contente pas de mettre en page votre CV ; elle l'**optimise stratégiquement** pour correspondre parfaitement aux attentes des recruteurs et aux algorithmes de tri (ATS).

En analysant une offre d'emploi spécifique, notre moteur d'IA ajuste votre résumé et vos expériences pour mettre en avant les compétences les plus pertinentes, tout en garantissant un export PDF haute fidélité au format A4.

---

## ✨ Fonctions Principales

*   **🎯 Adaptation Intelligente** : Analyse sémantique de l'offre d'emploi pour suggérer des modifications ciblées sur votre profil et vos missions.
*   **📄 Export PDF Haute Fidélité** : Moteur de rendu optimisé pour garantir que ce que vous voyez à l'écran est exactement ce que vous obtenez en PDF (Format A4 standard).
*   **🛡️ Confidentialité Totale (Privacy by Design)** : Vos données personnelles restent **uniquement dans votre navigateur**. Aucun stockage sur serveur, aucune base de données externe.
*   **⚡ Performance Moderne** : Développé avec les dernières technologies (React 19, Tailwind 4) pour une fluidité exceptionnelle sur PC et mobile.

---

## 🛠️ Installation et Configuration

### 1. Cloner le projet
```bash
git clone https://github.com/Bsh54/CV-AI.git
cd CV-AI
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'IA
Créez un fichier `.env` à la racine du projet et configurez vos accès API :
```env
VITE_AI_API_URL=https://votre-point-de-terminaison-ia.com/v1/chat/completions
VITE_AI_API_KEY=votre_cle_api_secrete

# API Configuration (pour l'API REST)
PORT=4000
API_KEY=your_secret_api_key_here
```

### 4. Lancer l'application

**Interface Web** :
```bash
npm run dev
```

**API REST** :
```bash
npm run api:dev
```

---

## 🔌 API REST

L'application dispose également d'une API REST pour générer des CV en PDF de manière programmatique.

### Endpoint Principal

**POST** `/api/generate-pdf`

**Headers** :
```
X-API-Key: your_secret_api_key
Content-Type: application/json
```

**Body** :
```json
{
  "cvData": {
    "fullName": "John Doe",
    "title": "Développeur Full Stack",
    "color": "#00a99d",
    "contact": {
      "phone": "+33 6 12 34 56 78",
      "email": "john@example.com",
      "address": "Paris, France"
    },
    "about": "Développeur passionné...",
    "experiences": [],
    "education": [],
    "skills": [],
    "languages": [],
    "hobbies": [],
    "references": []
  },
  "jobOffer": "Nous recherchons un développeur...",
  "companyInfo": "Startup innovante..."
}
```

**Response** : PDF binary (application/pdf)

### Exemple avec cURL

```bash
curl -X POST http://localhost:4000/api/generate-pdf \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d @cv-data.json \
  --output cv.pdf
```

### Démarrage de l'API

```bash
# Développement
npm run api:dev

# Production
npm run api:build
npm run api:start
```

---

## 🏗️ Technologies Utilisées

*   **Framework** : [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **Style** : [Tailwind CSS 4](https://tailwindcss.com/) (Le futur du CSS utilitaire)
*   **Icônes** : [Lucide React](https://lucide.dev/)
*   **PDF** : [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) & [html2canvas](https://html2canvas.hertzen.com/)
*   **Animations** : [Framer Motion](https://www.framer.com/motion/)

---

## 📜 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, de le modifier et de le distribuer pour vos propres besoins.

---

**🎉 Merci d'utiliser CV-AI !**
Si ce projet vous aide dans votre recherche d'emploi, n'hésitez pas à lui donner une ⭐ **Star** sur GitHub ! Votre soutien est notre plus grande motivation. 💖

*(Projet maintenu par Bsh54)*

---
*Dernière mise à jour : 1er Mars 2026*
