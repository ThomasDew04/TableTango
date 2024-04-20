import express from 'express';
import * as favoritesController from '../controllers/favorites';

const router = express.Router();

router.get('/:id', favoritesController.getFavorites);
router.post('/', favoritesController.addFavorite);
router.delete('/:user_id/:restaurant_id', favoritesController.deleteFavorite);

export default router;