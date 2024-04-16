import express from 'express';
import * as restaurantsController from '../controllers/restaurants';

const router = express.Router();

router.get('/', restaurantsController.getRestaurants);
router.get('/:id', restaurantsController.getRestaurantById);
router.post('/', restaurantsController.createRestaurant);
router.put('/:id', restaurantsController.updateRestaurant);
router.delete('/:id', restaurantsController.deleteRestaurant);


export default router;