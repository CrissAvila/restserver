import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { cargarArchivo } from "../controllers/uploads.js";


const routerUploads = Router();

routerUploads.post('/', cargarArchivo);



export default routerUploads;



