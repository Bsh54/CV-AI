# CV-AI

CV-AI est un outil de création de CV qui aide à adapter son profil à des offres d'emploi précises. L'application utilise l'intelligence artificielle pour suggérer des ajustements de contenu et propose un export PDF au format A4.

## Fonctions principales

- **Adaptation du contenu** : Analyse une offre d'emploi pour proposer des modifications sur le résumé et les expériences.
- **Export PDF** : Génère un document prêt à l'emploi qui respecte la mise en page affichée à l'écran.
- **Page unique** : Le système est configuré pour que le CV tienne sur une seule page A4.
- **Respect de la vie privée** : Les données sont gérées localement dans le navigateur et ne sont pas enregistrées sur un serveur.

## Installation

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/Bsh54/CV-AI.git
   cd CV-AI
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Variables d'environnement** :
   Créez un fichier `.env` à la racine et ajoutez vos accès API :
   ```env
   VITE_AI_API_URL=votre_url
   VITE_AI_API_KEY=votre_cle
   ```

4. **Lancer le projet** :
   ```bash
   npm run dev
   ```

## Technologies utilisées

- React 19 et TypeScript
- Tailwind CSS 4
- Lucide React (icônes)
- html2pdf.js
