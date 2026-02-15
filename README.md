# CV-AI : Générateur de CV Stratégique Propulsé par l'IA

CV-AI est une application moderne conçue pour transformer la création de CV. Contrairement aux éditeurs classiques, il utilise l'intelligence artificielle pour adapter dynamiquement votre profil à des offres d'emploi spécifiques, tout en garantissant un rendu PDF professionnel "Pixel Perfect" sur une seule page.

## 🚀 Fonctionnalités Clés

- **Optimisation Stratégique par IA** : Intégration de l'API DeepSeek pour réécrire votre résumé, vos expériences et vos compétences en fonction des mots-clés d'une offre d'emploi.
- **Rendu Haute Fidélité** : Moteur d'exportation PDF personnalisé garantissant que le document téléchargé est le miroir exact de la prévisualisation web.
- **Zéro Débordement** : Algorithme de verrouillage A4 garantissant un CV sur une seule page, sans sauts de page parasites.
- **Confidentialité Totale** : Gestion des données en RAM (mémoire vive). Aucune information personnelle n'est stockée de manière persistante sur un serveur.
- **Design Moderne** : Construit avec Tailwind CSS 4 et Radix UI pour une interface fluide, réactive et élégante.

## 🛠️ Stack Technique

- **Frontend** : React 19, TypeScript, Vite
- **Style** : Tailwind CSS 4, Framer Motion (animations)
- **UI Components** : Radix UI, Lucide React
- **IA** : DeepSeek API (via Hugging Face)
- **Export** : html2pdf.js avec moteur de conversion OKLCH vers HEX haute définition

## 📦 Installation et Lancement

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/Bsh54/CV-AI.git
   cd CV-AI
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer en mode développement** :
   ```bash
   npm run dev
   ```

4. **Compiler pour la production** :
   ```bash
   npm run build
   ```

## 💡 Utilisation

1. **Édition** : Remplissez vos informations de base dans l'éditeur intuitif.
2. **Ciblage** : Collez l'offre d'emploi que vous visez dans la section "Optimiser".
3. **Magie** : L'IA adapte votre profil pour maximiser vos chances de passer les filtres ATS.
4. **Export** : Téléchargez votre CV en PDF haute définition d'un simple clic.

---
Développé avec une exigence de précision visuelle et stratégique.
