import fs from 'fs';
import path from 'path';

// Definir el archivo de log
const logFilePath = path.join(__dirname, '../logs/app.log');

// Función para registrar los logs
export const log = (message) => {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

// Función para registrar errores
export const logError = (message) => {
    const logMessage = `${new Date().toISOString()} - ERROR: ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
};
