#!/bin/bash

echo "🔄 Sauvegarde en cours..."

git add .
echo "✅ Fichiers ajoutés à l'index Git."

read -p "📝 Message de commit : " msg

git commit -m "$msg"
echo "✅ Commit effectué."

git push origin main
echo "✅ Code poussé sur la branche 'main'."
chmod +x deploy.sh
