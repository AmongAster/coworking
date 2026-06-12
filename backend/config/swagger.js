const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'CoWork Space API',
        version: '1.0.0',
        description: 'Документация API для платформы бронирования коворкингов и переговорных комнат (Coworking Booking App)',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Локальный сервер разработки',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    email: { type: 'string' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                },
            },
            Room: {
                type: 'object',
                required: ['name', 'capacity', 'description'],
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    capacity: { type: 'integer' },
                    description: { type: 'string' },
                    image_url: { type: 'string' },
                },
            },
            Booking: {
                type: 'object',
                required: ['room_id', 'booking_date', 'start_time', 'end_time'],
                properties: {
                    id: { type: 'integer' },
                    user_id: { type: 'integer' },
                    room_id: { type: 'integer' },
                    booking_date: { type: 'string', format: 'date' },
                    start_time: { type: 'string', pattern: '^\\d{2}:\\d{2}$' },
                    end_time: { type: 'string', pattern: '^\\d{2}:\\d{2}$' },
                },
            },
        },
    },
    paths: {
        '/api/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Регистрация нового пользователя',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', example: 'newuser@example.com' },
                                    password: { type: 'string', example: 'secret123' },
                                    role: { type: 'string', example: 'user' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Пользователь успешно зарегистрирован' },
                    400: { description: 'Неверные входные данные или email уже занят' },
                },
            },
        },
        '/api/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'Вход в систему (получение JWT токена)',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', example: 'admin@cowork.space' },
                                    password: { type: 'string', example: 'adminpasswd123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Успешный вход',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string' },
                                        user: { $ref: '#/components/schemas/User' },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: 'Неверный email или пароль' },
                },
            },
        },
        '/api/auth/me': {
            get: {
                tags: ['Auth'],
                summary: 'Получить данные о текущем авторизованном пользователе',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Данные пользователя',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/User' },
                            },
                        },
                    },
                    401: { description: 'Не авторизован' },
                },
            },
        },
        '/api/rooms': {
            get: {
                tags: ['Rooms'],
                summary: 'Получить список всех помещений',
                responses: {
                    200: {
                        description: 'Список помещений',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Room' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Rooms'],
                summary: 'Создать новое помещение (Только для администратора)',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Room' },
                        },
                    },
                },
                responses: {
                    201: { description: 'Помещение добавлено' },
                    401: { description: 'Не авторизован' },
                    403: { description: 'Нет прав администратора' },
                },
            },
        },
        '/api/rooms/{id}': {
            get: {
                tags: ['Rooms'],
                summary: 'Получить описание помещения по ID',
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                responses: {
                    200: {
                        description: 'Данные о помещении',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Room' },
                            },
                        },
                    },
                    404: { description: 'Помещение не найдено' },
                },
            },
            put: {
                tags: ['Rooms'],
                summary: 'Обновить данные помещения (Только для администратора)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Room' },
                        },
                    },
                },
                responses: {
                    200: { description: 'Помещение успешно обновлено' },
                    401: { description: 'Не авторизован' },
                    403: { description: 'Нет прав администратора' },
                    404: { description: 'Помещение не найдено' },
                },
            },
            delete: {
                tags: ['Rooms'],
                summary: 'Удалить помещение (Только для администратора)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                responses: {
                    200: { description: 'Помещение успешно удалено' },
                    401: { description: 'Не авторизован' },
                    403: { description: 'Нет прав администратора' },
                },
            },
        },
        '/api/bookings': {
            get: {
                tags: ['Bookings'],
                summary: 'Получить список всех бронирований (Только для администратора)',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Список всех бронирований',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Booking' },
                                },
                            },
                        },
                    },
                    401: { description: 'Не авторизован' },
                    403: { description: 'Нет прав администратора' },
                },
            },
            post: {
                tags: ['Bookings'],
                summary: 'Создать бронирование помещения',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Booking' },
                        },
                    },
                },
                responses: {
                    201: { description: 'Бронирование успешно оформлено' },
                    400: { description: 'Время в выбранной комнате уже занято или некорректные параметры' },
                    401: { description: 'Не авторизован' },
                },
            },
        },
        '/api/bookings/my': {
            get: {
                tags: ['Bookings'],
                summary: 'Получить список бронирований текущего пользователя',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Список личных бронирований',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            booking_date: { type: 'string', format: 'date' },
                                            start_time: { type: 'string' },
                                            end_time: { type: 'string' },
                                            room_name: { type: 'string' },
                                            description: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: { description: 'Не авторизован' },
                },
            },
        },
        '/api/bookings/{id}': {
            delete: {
                tags: ['Bookings'],
                summary: 'Отменить бронирование (Удалить)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
                ],
                responses: {
                    200: { description: 'Бронирование успешно отменено' },
                    401: { description: 'Не авторизован' },
                    403: { description: 'Нет прав на удаление этого бронирования' },
                    404: { description: 'Бронирование не найдено' },
                },
            },
        },
        '/api/users': {
            get: {
                tags: ['Users'],
                summary: 'Получить список всех пользователей (Только для администратора)',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Список пользователей',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/User' },
                                },
                            },
                        },
                    },
                    401: { description: 'Не авторизован' },
                    403: { description: 'Нет прав администратора' },
                },
            },
        },
    },
};

module.exports = { swaggerUi, swaggerDocument };
