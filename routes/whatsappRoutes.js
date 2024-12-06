import express from 'express';
import { verifyWebhook, handleMessage } from '../controllers/whatsappController.js';

const router = express.Router();

// Ruta para verificar el webhook (verificación de Meta)
router.get('/', verifyWebhook);

// Ruta para manejar los mensajes entrantes de WhatsApp
router.post('/', handleMessage);

export default router;
