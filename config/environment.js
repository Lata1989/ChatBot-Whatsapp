import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 5000,
    VERIFY_TOKEN: process.env.VERIFY_TOKEN,
    GEMINI_API_URL: process.env.GEMINI_API_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    PHONE_NUMBER_ID: process.env.PHONE_NUMBER_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};
