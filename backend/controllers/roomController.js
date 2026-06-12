const db = require('../config/db');

// Получить список всех комнат
exports.getAllRooms = async (req, res) => {
    try {
        const [rooms] = await db.query('SELECT * FROM rooms');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить одну комнату по ID
exports.getRoomById = async (req, res) => {
    try {
        const [rooms] = await db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
        if (rooms.length === 0) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }
        res.json(rooms[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Добавить новую комнату
exports.createRoom = async (req, res) => {
    try {
        const { name, capacity, description, image_url } = req.body;
        const [result] = await db.query(
            'INSERT INTO rooms (name, capacity, description, image_url) VALUES (?, ?, ?, ?)',
            [name, capacity, description, image_url]
        );
        res.status(201).json({ message: 'Комната добавлена', roomId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Удалить комнату
exports.deleteRoom = async (req, res) => {
    try {
        await db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
        await db.query('DELETE FROM rooms WHERE id = ?', [req.params.id]);
        res.json({ message: 'Комната успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Изменить комнату (PUT)
exports.updateRoom = async (req, res) => {
    try {
        const { name, capacity, description, image_url } = req.body;
        const [rooms] = await db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
        if (rooms.length === 0) {
            return res.status(404).json({ message: 'Комната не найдена' });
        }
        await db.query(
            'UPDATE rooms SET name = ?, capacity = ?, description = ?, image_url = ? WHERE id = ?',
            [name, capacity, description, image_url, req.params.id]
        );
        res.json({ message: 'Комната успешно обновлена' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};