const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { validateRoom } = require('../middlewares/validationMiddleware');

// Публичные роуты (посмотреть список могут все)
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);

// Защищенные роуты (добавление/изменение/удаление — только для администратора)
router.post('/', authMiddleware, roleMiddleware('admin'), validateRoom, roomController.createRoom);
router.put('/:id', authMiddleware, roleMiddleware('admin'), validateRoom, roomController.updateRoom);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), roomController.deleteRoom);

module.exports = router;