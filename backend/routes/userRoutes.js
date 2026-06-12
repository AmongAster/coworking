const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Получить список всех пользователей (только для администратора)
router.get('/', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, email, role FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
