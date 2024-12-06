import { sendWhatsAppMessage } from '../utils/whatsappUtils.js';
import { processGeminiMessage } from './geminiController.js';
import { ENV } from '../config/environment.js';

export const verifyWebhook = (req, res) => {
    const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;

    console.log("Parámetros recibidos:", req.query);  // Ver todos los parámetros recibidos

    // Verificar el token enviado por Meta
    if (mode === 'subscribe' && token === ENV.VERIFY_TOKEN) {
        // Si el token es correcto, responder con el challenge para verificar la conexión
        console.log("Token válido, enviando challenge:", challenge);  // Log para ver el challenge
        res.status(200).send(challenge);
    } else {
        // Si el token no coincide, devolver un error 403
        console.log("Token no coincide, rechazando solicitud.");  // Depuración
        res.sendStatus(403);
    }
};


export const handleMessage = async (req, res) => {
    // Obtener el mensaje entrante
    const entry = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    
    if (!entry) {
        // Si no se recibe ningún mensaje, devolver un error 400
        console.log('No se recibió mensaje.');
        return res.sendStatus(400);
    }

    const { from, text: { body: messageText } } = entry;

    console.log(`Mensaje recibido de ${from}: ${messageText}`);

    try {
        // Procesar el mensaje con la API de Gemini
        const reply = await processGeminiMessage(messageText);
        // Enviar la respuesta de Gemini al número de WhatsApp
        await sendWhatsAppMessage(from, reply);
        return res.sendStatus(200);  // Confirmar que se procesó el mensaje correctamente
    } catch (error) {
        console.error('Error al procesar el mensaje:', error);
        return res.sendStatus(500);  // Error al procesar el mensaje
    }
};
