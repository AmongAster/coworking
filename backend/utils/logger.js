const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'activity.log');

// Убедимся, что папка logs существует
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Логирует активность в консоль и файл logs/activity.log
 * @param {string} action - Название действия (например, 'REGISTER', 'LOGIN', 'BOOKING_CREATE', 'BOOKING_CANCEL')
 * @param {object} details - Детали лога
 */
exports.logActivity = (action, details) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ACTION: ${action} | DETAILS: ${JSON.stringify(details)}\n`;
    console.log(logMessage.trim());
    try {
        fs.appendFileSync(logFile, logMessage, 'utf8');
    } catch (err) {
        console.error('Ошибка записи лога:', err);
    }
};
