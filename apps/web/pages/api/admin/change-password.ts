import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  // Auth: get current admin user (adapt as needed for your auth system)
  // Example: using session
  const session = await getSession({ req });
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(401).json({ message: 'Non autorisé' });
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return res.status(400).json({ message: 'Mot de passe actuel incorrect' });
  }

  const hash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: hash } });
  return res.status(200).json({ message: 'Mot de passe changé avec succès' });
}
