const db = require('../config/db');
const { logActivity } = require('../utils/logger');

// Создать бронирование
exports.createBooking = async (req, res) => {
    try {
        const { room_id, booking_date, start_time, end_time } = req.body;
        const user_id = req.user.id; // Достаем ID авторизованного юзера из токена

        // Проверка существования помещения
        const [room] = await db.query('SELECT * FROM rooms WHERE id = ?', [room_id]);
        if (room.length === 0) {
            return res.status(404).json({ message: 'Помещение не найдено' });
        }

        // Умная проверка занятости (БЕЗ алиасов 'b.', чтобы MySQL не ругался)
        const checkQuery = `
            SELECT * FROM bookings 
            WHERE room_id = ? 
              AND booking_date = ? 
              AND NOT (end_time <= ? OR start_time >= ?)
        `;
        
        const [conflicts] = await db.query(checkQuery, [room_id, booking_date, start_time, end_time]);
        
        if (conflicts.length > 0) {
            return res.status(400).json({ message: 'Это время в выбранной комнате уже занято!' });
        }

        // Если всё свободно — создаем бронь
        const [result] = await db.query(
            'INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
            [user_id, room_id, booking_date, start_time, end_time]
        );

        logActivity('BOOKING_CREATE', { 
            bookingId: result.insertId, 
            user_id, 
            room_id, 
            booking_date, 
            start_time, 
            end_time 
        });

        res.status(201).json({ message: 'Бронирование успешно оформлено!', bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить все бронирования текущего пользователя
exports.getUserBookings = async (req, res) => {
    try {
        const user_id = req.user.id;
        
        // Объединяем таблицы, чтобы отдать клиенту не просто ID комнаты, а её название и описание
        const query = `
            SELECT b.\`id\`, b.\`booking_date\`, b.\`start_time\`, b.\`end_time\`, r.\`name\` AS room_name, r.\`description\` 
            FROM bookings b
            JOIN rooms r ON b.\`room_id\` = r.\`id\`
            WHERE b.\`user_id\` = ?
            ORDER BY b.\`booking_date\` DESC, b.\`start_time\` ASC
        `;
        
        const [bookings] = await db.query(query, [user_id]);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Отменить (удалить) бронирование
exports.cancelBooking = async (req, res) => {
    try {
        const booking_id = req.params.id;
        const user_id = req.user.id;
        const user_role = req.user.role;

        let booking;
        if (user_role === 'admin') {
            // Администратор может удалить любое бронирование
            const [rows] = await db.query('SELECT * FROM bookings WHERE `id` = ?', [booking_id]);
            booking = rows;
        } else {
            // Обычный пользователь может удалить только свое бронирование
            const [rows] = await db.query('SELECT * FROM bookings WHERE `id` = ? AND `user_id` = ?', [booking_id, user_id]);
            booking = rows;
        }
        
        if (booking.length === 0) {
            return res.status(404).json({ message: 'Бронирование не найдено или у вас нет прав на его удаление' });
        }

        await db.query('DELETE FROM bookings WHERE `id` = ?', [booking_id]);

        logActivity('BOOKING_CANCEL', { 
            bookingId: booking_id, 
            cancelledBy: user_id, 
            role: user_role 
        });

        res.json({ message: 'Бронирование успешно отменено' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить ВСЕ бронирования (для администратора)
exports.getAllBookings = async (req, res) => {
    try {
        // Проверяем роль админа
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора.' });
        }
        
        const query = `
            SELECT b.\`id\`, b.\`user_id\`, b.\`room_id\`, b.\`booking_date\`, b.\`start_time\`, b.\`end_time\`, r.\`name\` AS room_name, r.\`description\` 
            FROM bookings b
            JOIN rooms r ON b.\`room_id\` = r.\`id\`
            ORDER BY b.\`booking_date\` DESC, b.\`start_time\` ASC
        `;
        
        const [bookings] = await db.query(query);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};