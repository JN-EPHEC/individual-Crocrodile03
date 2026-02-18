import express, { Router, Request, Response } from 'express';
import User from '../models/User';
const router: Router = express.Router();

// GET: Fetch all users
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const users: User[] = await User.findAll();
  res.json(users);
});

// POST: Add new User
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { nom, prenom } = req.body;

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/;

    if (!nom || !prenom) {
      res.status(400).json({ error: 'Nom et prénom requis' });
      return;
    }

    if (!nameRegex.test(nom) || !nameRegex.test(prenom)) {
      res.status(400).json({ error: 'Nom et prénom invalides' });
      return;
    }

    const newUser: User = await User.create({ nom, prenom });

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    // @ts-ignore
    const user: User = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    await user.destroy();

    res.json({ message: "Utilisateur supprimé" });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;