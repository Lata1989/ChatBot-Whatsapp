import express from 'express';
import dotenv from 'dotenv';
import whatsappRoutes from './routes/whatsappRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';
import { ENV } from './config/environment.js';

dotenv.config();

const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para formularios o datos codificados en URL

app.get("/", (req,res) => {
    res.send("El server anda papu.");
})

// Registrar rutas
app.use('/webhook', whatsappRoutes);
app.use('/gemini', geminiRoutes);

// Iniciar servidor
app.listen(ENV.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${ENV.PORT}`);
});
