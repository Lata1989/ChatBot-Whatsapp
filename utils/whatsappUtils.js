import axios from 'axios';
import { ENV } from '../config/environment.js';

export const sendWhatsAppMessage = async (to, message) => {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v13.0/${ENV.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: to,
                text: { body: message }
            },
            {
                headers: {
                    Authorization: `Bearer ${ENV.ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log('Mensaje enviado con éxito:', response.data);
    } catch (error) {
        console.error('Error al enviar mensaje por WhatsApp:', error.response?.data || error.message);
        throw new Error('Error al enviar mensaje por WhatsApp');
    }
};
