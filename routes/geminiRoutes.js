import express from 'express';
import { processGeminiMessage } from '../controllers/geminiController.js';

const router = express.Router();

router.post('/query', async (req, res) => {
    const { query } = req.body;
    try {
        const response = await processGeminiMessage(query);
        res.status(200).json({ reply: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
