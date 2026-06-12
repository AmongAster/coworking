const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;

// Валидация регистрации
exports.validateRegister = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Введите корректный email адрес' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Пароль должен состоять как минимум из 6 символов' });
    }
    next();
};

// Валидация логина
exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email и пароль обязательны' });
    }
    next();
};

// Валидация помещений
exports.validateRoom = (req, res, next) => {
    const { name, capacity, description, image_url } = req.body;
    if (!name || name.trim().length < 2) {
        return res.status(400).json({ message: 'Название комнаты должно содержать не менее 2 символов' });
    }
    const cap = Number(capacity);
    if (isNaN(cap) || cap <= 0) {
        return res.status(400).json({ message: 'Вместимость должна быть числом больше 0' });
    }
    if (!description || description.trim().length < 5) {
        return res.status(400).json({ message: 'Описание должно содержать не менее 5 символов' });
    }
    if (image_url && image_url.trim() !== '') {
        const isBase64 = image_url.startsWith('data:image/');
        if (!isBase64) {
            try {
                new URL(image_url);
            } catch (_) {
                return res.status(400).json({ message: 'Введите корректный URL или Base64 для изображения' });
            }
        }
    }
    next();
};

// Валидация бронирования
exports.validateBooking = (req, res, next) => {
    const { room_id, booking_date, start_time, end_time } = req.body;
    if (!room_id || isNaN(Number(room_id))) {
        return res.status(400).json({ message: 'Некорректный ID помещения' });
    }
    if (!booking_date || !dateRegex.test(booking_date)) {
        return res.status(400).json({ message: 'Дата должна быть в формате ГГГГ-ММ-ДД' });
    }
    if (!start_time || !timeRegex.test(start_time)) {
        return res.status(400).json({ message: 'Некорректное время начала' });
    }
    if (!end_time || !timeRegex.test(end_time)) {
        return res.status(400).json({ message: 'Некорректное время окончания' });
    }
    if (start_time >= end_time) {
        return res.status(400).json({ message: 'Время окончания должно быть позже времени начала' });
    }
    next();
};
