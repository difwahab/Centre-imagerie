#!/bin/bash

# 1. Afficher les fichiers non commités
echo "🔍 Fichiers modifiés/non suivis :"
git status --short

# 2. Demander confirmation
read -p "Souhaites-tu ajouter et commit tous ces fichiers ? (o/n) " confirm
if [[ $confirm != "o" ]]; then
  echo "❌ Déploiement annulé."
  exit 1
fi

# 3. Ajouter tous les fichiers
git add .

# 4. Demander le message de commit
read -p "💬 Message du commit : " message

# 5. Commit
git commit -m "$message"

# 6. Build le projet
echo "🔨 Construction du projet..."
npm run build

# 7. Push vers la branche principale
echo "🚀 Envoi vers GitHub (origin main)..."
git push origin main

echo "✅ Déploiement terminé avec succès."
