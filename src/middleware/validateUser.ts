import { Request, Response, NextFunction } from 'express';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { nom, prenom } = req.body;

  // Regex lettres + accents + tiret + espace
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/;

  // Vérification présence
  if (!nom || !prenom) {
    return res.status(400).json({
      error: 'Nom et prénom sont requis',
    });
  }

  // Vérification type string
  if (typeof nom !== 'string' || typeof prenom !== 'string') {
    return res.status(400).json({
      error: 'Nom et prénom doivent être des chaînes de caractères',
    });
  }

  // Vérification lettres uniquement
  if (!nameRegex.test(nom) || !nameRegex.test(prenom)) {
    return res.status(400).json({
      error: 'Nom et prénom doivent contenir uniquement des lettres',
    });
  }

  // Nettoyage (optionnel mais propre)
  req.body.nom = nom.trim();
  req.body.prenom = prenom.trim();

  // Si tout est OK → on passe à la route suivante
  next();
};
