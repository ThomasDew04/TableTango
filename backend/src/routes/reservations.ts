import express from 'express';
import * as reservationsController from '../controllers/reservations';

const router = express.Router();

router.get('/user/:id', reservationsController.getReservationsByUser);
router.get('/restaurant/:restaurant_id/:date', reservationsController.getReservationsByRestaurantByDate);
router.post('/', reservationsController.createReservation);
router.delete('/:id', reservationsController.deleteReservation);

export default router;