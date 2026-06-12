const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = async (req, res, next) => {
    // Токен обычно передается в заголовке Authorization: Bearer <TOKEN>
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Доступ запрещен. Токен отсутствует.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Получаем актуальную роль из базы данных
        const [users] = await db.query('SELECT role FROM users WHERE id = ?', [decoded.id]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Пользователь не найден.' });
        }
        
        req.user = { id: decoded.id, role: users[0].role }; // Добавляем актуальные данные в объект запроса
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Невалидный или просроченный токен.' });
    }
};