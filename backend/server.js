const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Импортируем файлы роутов (убедись, что папки и файлы созданы)
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, swaggerDocument } = require('./config/swagger');

const app = express();

// Мидлваеры
app.use(cors());
app.use(express.json()); // Позволяет Express читать JSON в req.body

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 2. Регистрируем роуты в приложении (привязываем префиксы URL)
app.use('/api/auth', authRoutes);       // Теперь /api/auth/register и /api/auth/login будут работать!
app.use('/api/rooms', roomRoutes);      // Для комнат
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);


// Базовый тестовый роут
app.get('/', (req, res) => {
    res.send('Сервер коворкинга работает!');
});

// Глобальный обработчик ошибок (Global Error Handler)
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR:', err.stack || err.message || err);
    res.status(err.status || 500).json({
        message: err.message || 'Внутренняя ошибка сервера'
    });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер успешно запущен на порту ${PORT}`);
});