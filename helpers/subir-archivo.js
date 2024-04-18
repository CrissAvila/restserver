import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export const subirArchivo = ( files, extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ], carpeta = '' ) => {

    return new Promise(( resolve, reject ) => {
        
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[ nombreCortado.length -1 ];

        // validar la extension 
    
        if ( !extensionesValidas.includes( extension ) ) {
            return reject( `El archivo no contine ninguna extension valida: ${extensionesValidas}.` )
        }

        const nombreTemporalDelArchivo = uuidv4() + '.' + extension;
        const uploadPath = path.join( '__dirname', '../uploads', carpeta, nombreTemporalDelArchivo );

        // Use the mv() method to place the file somewhere on your server
        archivo.mv( uploadPath, (err) => {
            if (err) {
                reject(err);
            }
        
            resolve( nombreTemporalDelArchivo );
        }); 
    })
    
}