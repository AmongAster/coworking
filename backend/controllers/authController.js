const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { logActivity } = require('../utils/logger');

// Регистрация нового пользователя
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' });
        }

        // Проверяем, существует ли уже такой email
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Этот email уже занят' });
        }

        // Хэшируем пароль
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Сохраняем в базу данных
        const userRole = role || 'user';
        const [result] = await db.query(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, hashedPassword, userRole]
        );

        logActivity('REGISTER', { email, role: userRole, userId: result.insertId });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Вход в систему (Логин)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const user = users[0];

        // Проверка соответствия хэша пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        // Создаем JWT токен (срок действия — 24 часа)
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        logActivity('LOGIN', { email: user.email, userId: user.id, role: user.role });

        res.json({
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение текущего авторизованного пользователя
exports.getCurrentUser = async (req, res) => {
    try {
        const user_id = req.user.id;
        const [users] = await db.query('SELECT id, email, role FROM users WHERE id = ?', [user_id]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};