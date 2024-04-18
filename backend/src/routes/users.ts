import express from 'express';
import * as usersController from '../controllers/users';

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:name', usersController.getUserByName);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);


export default router;