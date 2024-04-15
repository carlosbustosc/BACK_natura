/*--importamos moongose para conectar---*/
const mongoose = require('mongoose');


/*----hacemos la conexion a la base de datos---*/
const conectar = async() => {
    
    try{

        await mongoose.connect("mongodb+srv://CABUSTOSC09:Ecoutores09@haltfone.to2o8np.mongodb.net/natura?retryWrites=true&w=majority&appName=haltfone")

        console.log("Se ha conectado correctamente a la base de datos")

    }catch(err){

        console.log(" ha fallado la conexion a la base de datos: " + err);

    }
}




    
      
module.exports = { conectar }