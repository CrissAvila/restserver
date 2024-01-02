import mongoose from "mongoose";
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno desde .env
dotenv.config();

// URL de nuestra base de datos
const url = process.env.MONGOD_ATLAS_CNN;

export const dbConection = async () => {
    try {
        await mongoose.connect(url);

        console.log('Base de datos online');
    } catch (error) {
        // Para visualizar qué error se está disparando
        console.log(error);
        // Error controlado 
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};
