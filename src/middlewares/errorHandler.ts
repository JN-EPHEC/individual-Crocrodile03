import { Request, Response, NextFunction } from 'express';
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`Une erreur est survenue: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || "Erreur serveur"});
};