import express from "express";
import cors from "cors";
import router from "../routes/user.js";


export class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

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
    routes() {
        const usarRoutes = router;

        this.app.use( this.usuariosPath, usarRoutes);
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${ this.port }`);
        });
    }
}