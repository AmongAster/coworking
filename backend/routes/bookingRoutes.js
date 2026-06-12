const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { validateBooking } = require('../middlewares/validationMiddleware');

// Все роуты бронирования защищены авторизацией
router.post('/', authMiddleware, validateBooking, bookingController.createBooking);
router.get('/my', authMiddleware, bookingController.getUserBookings);
router.get('/', authMiddleware, roleMiddleware('admin'), bookingController.getAllBookings);
router.delete('/:id', authMiddleware, bookingController.cancelBooking);

module.exports = router;