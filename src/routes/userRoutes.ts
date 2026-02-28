import express, { Router } from 'express';
import { validateUser } from '../middleware/validateUser.ts';
import * as userController from '../controllers/userController.ts';
const router: Router = express.Router();

router.get("/", userController.getAllUsers);

router.post('/', validateUser, userController.addUser);

router.put("/:id", validateUser, userController.modifyUser);

router.delete('/:id', userController.deleteUser);

export default router;