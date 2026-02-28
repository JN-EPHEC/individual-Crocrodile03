import type { Request, Response } from 'express';
import User from '../models/User';


// GET: Fetch all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// ADD: add a User
export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nom, prenom } = req.body;
    const newUser: User = await User.create({ nom, prenom });

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Modify a User
export const modifyUser =  async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // @ts-ignore
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: 'Utilisateur non trouvé',
      });
    }

    await user.update(req.body);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Delete a User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
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
};
