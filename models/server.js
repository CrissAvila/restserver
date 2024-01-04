import express from "express";
import cors from "cors";

import router from "../routes/user.js";
import routerAuth from "../routes/auth.js";

import { dbConection } from "../database/config.js";
import dotenv from 'dotenv';

dotenv.config();

export class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        //Paths
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }

    // Middlewares
    middlewares() {

        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use( express.static('public') );
    }

    // METODOS
    async conectarDB() {
        await dbConection();
    }

    routes() {
        const usarRoutes = router;
        const usarRoutesAuth = routerAuth;
        
        this.app.use( this.authPath, usarRoutesAuth);
        this.app.use( this.usuariosPath, usarRoutes);

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${ this.port }`);
        });
    }
}