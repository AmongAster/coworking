const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function seed() {
    console.log('Начало сидирования базы данных...');
    try {
        // Отключаем внешние ключи для очистки
        await db.query('SET FOREIGN_KEY_CHECKS = 0');
        await db.query('TRUNCATE TABLE bookings');
        await db.query('TRUNCATE TABLE rooms');
        await db.query('TRUNCATE TABLE users');
        await db.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Таблицы очищены.');

        // 1. Создаем пользователей
        const users = [];
        
        // 1 Администратор
        const adminHash = await bcrypt.hash('adminpasswd123', 10);
        const [adminResult] = await db.query(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            ['admin@cowork.space', adminHash, 'admin']
        );
        console.log(`Администратор добавлен с ID: ${adminResult.insertId}`);

        // 10 Пользователей
        const userPasswordHash = await bcrypt.hash('userpasswd123', 10);
        for (let i = 1; i <= 10; i++) {
            const email = `user${i}@cowork.space`;
            const [userResult] = await db.query(
                'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
                [email, userPasswordHash, 'user']
            );
            users.push(userResult.insertId);
        }
        console.log(`Создано ${users.length} обычных пользователей.`);

        // 2. Создаем 5 помещений (rooms)
        const roomsData = [
            {
                name: 'Переговорная "Альфа"',
                capacity: 6,
                description: 'Современная переговорная с маркерной доской, проектором и высокоскоростным Wi-Fi. Отлично подходит для командных встреч.',
                image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
            },
            {
                name: 'Переговорная "Бета"',
                capacity: 12,
                description: 'Большой конференц-зал с панорамными окнами, видеоконференцсвязью и круглым столом для важных переговоров.',
                image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80'
            },
            {
                name: 'Зона "Опенспейс"',
                capacity: 30,
                description: 'Просторное рабочее пространство с комфортными креслами, розетками у каждого стола и мягким освещением.',
                image_url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80'
            },
            {
                name: 'Фокус-кабина "Гамма"',
                capacity: 1,
                description: 'Небольшая звукоизолированная кабина для индивидуальной сосредоточенной работы или конфиденциальных звонков.',
                image_url: 'https://images.unsplash.com/photo-1517502884422-41eaacad0168?auto=format&fit=crop&w=600&q=80'
            },
            {
                name: 'Креативная студия "Дельта"',
                capacity: 8,
                description: 'Помещение для брейнштормов с пуфиками, интерактивной панелью и кофемашиной. Пространство для генерации идей.',
                image_url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=600&q=80'
            }
        ];

        const rooms = [];
        for (const room of roomsData) {
            const [roomResult] = await db.query(
                'INSERT INTO rooms (name, capacity, description, image_url) VALUES (?, ?, ?, ?)',
                [room.name, room.capacity, room.description, room.image_url]
            );
            rooms.push(roomResult.insertId);
        }
        console.log(`Создано ${rooms.length} помещений.`);

        // 3. Создаем 20 бронирований (bookings) без наложений по времени
        // Будем использовать следующие 5 дней
        const dates = [
            '2026-06-09',
            '2026-06-10',
            '2026-06-11',
            '2026-06-12',
            '2026-06-13'
        ];

        let bookingCount = 0;
        // На каждый день по 4 бронирования в разные комнаты разными пользователями
        for (const date of dates) {
            // Бронирование 1: Комната 1, Пользователь 1, 09:00 - 11:00
            await db.query(
                'INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
                [users[0], rooms[0], date, '09:00:00', '11:00:00']
            );
            bookingCount++;

            // Бронирование 2: Комната 1, Пользователь 2, 12:00 - 14:00 (без пересечения с бронированием 1)
            await db.query(
                'INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
                [users[1], rooms[0], date, '12:00:00', '14:00:00']
            );
            bookingCount++;

            // Бронирование 3: Комната 2, Пользователь 3, 10:00 - 12:00
            await db.query(
                'INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
                [users[2], rooms[1], date, '10:00:00', '12:00:00']
            );
            bookingCount++;

            // Бронирование 4: Комната 3, Пользователь 4, 14:00 - 17:00
            await db.query(
                'INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
                [users[3], rooms[2], date, '14:00:00', '17:00:00']
            );
            bookingCount++;
        }

        console.log(`Создано ${bookingCount} бронирований.`);
        console.log('Сидирование успешно завершено!');
        process.exit(0);
    } catch (error) {
        console.error('Ошибка во время сидирования базы данных:', error);
        process.exit(1);
    }
}

seed();
