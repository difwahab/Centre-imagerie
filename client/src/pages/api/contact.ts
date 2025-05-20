import type { NextApiRequest, NextApiResponse } from 'next';

// Vous pouvez ici connecter un service d'email comme SendGrid, Nodemailer, etc.
// Pour l'exemple, on se contente de valider les données et de simuler un envoi.

type Data = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name, email, message } = req.body;

  // Validation basique côté serveur
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    name.length < 2 ||
    message.length < 10
  ) {
    return res.status(400).json({ error: 'Données invalides.' });
  }

  try {
    // Simuler un traitement (ex. : envoi d’email, stockage, etc.)
    console.log('Message reçu :', { name, email, message });

    // Réponse réussie
    return res.status(200).json({
      success: true,
      message: 'Message reçu. Nous vous contacterons sous peu.',
    });
  } catch (error) {
    console.error('Erreur serveur contact :', error);
    return res
      .status(500)
      .json({ error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' });
  }
}
