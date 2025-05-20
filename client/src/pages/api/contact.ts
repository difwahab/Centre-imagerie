import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success?: boolean;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name, email, message } = req.body;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    name.length < 2 ||
    message.length < 10
  ) {
    return res.status(400).json({ error: 'Données invalides.' });
  }

  // Juste afficher les données dans la console (backend)
  console.log('Message reçu :', { name, email, message });

  // Répondre succès sans rien enregistrer ni envoyer
  return res.status(200).json({ success: true });
}
