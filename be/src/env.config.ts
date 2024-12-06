import dotenv from "dotenv";
dotenv.config();

export const api_key = process.env.GEMINI_API_KEY;
export const port = process.env.PORT || 3000;