/**
 * Мидлваер для проверки ролей пользователя.
 * @param {string|string[]} roles - Разрешенные роли (например, 'admin' или ['admin', 'manager'])
 */
module.exports = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Доступ запрещен. Необходима авторизация.' });
        }

        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Доступ запрещен. У вас нет необходимых прав доступа.' });
        }

        next();
    };
};
