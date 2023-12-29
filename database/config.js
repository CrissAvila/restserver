import mongoose from "mongoose"
import 'dotenv';

//URL de nuestra base de datos
const url = process.env.MONGOD_ATLAS_CNN; 

export const dbConection = async() => {

    try {
        
        await mongoose.connect( url );

        console.log('Base de datos online');


    } catch (error) {
        //para visualizar que error se esta disparando
        console.log(error);
        //error controlado 
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}