import express, { Router } from 'express';
import { validateUser } from '../middlewares/validateUser.ts';
import * as userController from '../controllers/userController.ts';
const router: Router = express.Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Récupère la liste des utilisateurs
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Succès
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Ajoute un utilisateur à la liste des utilisateurs
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Succès
 */
router.post('/', validateUser, userController.addUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Modifie un utilisateur à la liste des utilisateurs
 *    tags: [Users]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succès
 */
router.put("/:id", validateUser, userController.modifyUser);


/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Supprime un utilisateur à la liste des utilisateurs
 *    tags: [Users]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *  responses:
 *      200:
 *          description: Succès
 */
router.delete('/:id', userController.deleteUser);

export default router;