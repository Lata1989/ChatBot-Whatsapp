import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../config/environment.js';
import dotenv from 'dotenv';

dotenv.config();

// Crear la instancia de la API de Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

export const processGeminiMessage = async (message) => {
    try {
        // Obtener el modelo generativo
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Crear el prompt para el modelo
        const prompt = `Eres un asistente de inteligencia artificial. El usuario pregunta: "${message}". ¿Cómo responderías?`;

        // Enviar el mensaje al modelo
        const result = await model.generateContent(prompt);

        // Verificar si la respuesta fue exitosa
        if (result && result.response && result.response.text) {
            return result.response.text;  // Devolver la respuesta generada por el modelo
        } else {
            throw new Error('No se recibió una respuesta válida de Gemini.');
        }
    } catch (error) {
        console.error('Error al procesar el mensaje con Gemini:', error);
        throw new Error('Error al comunicarse con Gemini API');
    }
};

// Controlador para manejar el webhook de WhatsApp
export const handleMessage = async (req, res) => {
    const entry = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!entry) {
        console.log('No se recibió mensaje.');
        return res.sendStatus(400); // Error 400 si no se recibe un mensaje
    }

    const { from, text: { body: messageText } } = entry;
    console.log(`Mensaje recibido de ${from}: ${messageText}`);

    try {
        // Llamar a la función para procesar el mensaje con Gemini
        const reply = await processGeminiMessage(messageText);

        // Enviar la respuesta generada al número de WhatsApp
        await sendWhatsAppMessage(from, reply);

        // Confirmar que se procesó el mensaje correctamente
        return res.sendStatus(200);
    } catch (error) {
        console.error('Error al procesar el mensaje:', error);
        return res.sendStatus(500);  // Error 500 si ocurre un problema en el servidor
    }
};
