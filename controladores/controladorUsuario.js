/*----importamos el modelo de usuarios-----*/
const modeloUsuarios = require('../modelos/registroUsuarios');

/*-----importar bcrytp para cifrarContraseña-----*/
const bcrypt = require('bcrypt');


/*-------archivo token-------*/
const archivoToken = require('../Token_jwt/loginToken');





const registroUsuario = (req, resp) => {

    //obtener datos del FRONT
    const datosFront = req.body
   
    //validar que esten todos los datos
    if( !datosFront.nombre || !datosFront.correo || !datosFront.pass1){

        return resp.status(400).json({
            status:"error 404",
            mensaje: "no se pudo registrar los datos no estan Imcompletos"
        })

    }


    //comprobar que esos datos enviados por el FRONT no esten en la base de datos
    modeloUsuarios.find( {
        $or:[
            { nombre:  datosFront.nombre },
            { correo:  datosFront.correo }
        ]
    })
    .then( (respUsuario) => {
        
        if( respUsuario.length == 0 ){
            
            //cifrar contraseña
            bcrypt.hash( datosFront.pass1, 10, (error, resultadoCifrado)  => {

                datosFront.pass1 = resultadoCifrado
          

                //llenamos el modelo con la informacion del FRONT
                const datosAguardar = modeloUsuarios(datosFront)

                //guardamos los datos
                datosAguardar.save()
                    .then( (usuario) => {
                        
                        return resp.status(200).json({
                            status : "200",
                            mensaje: "Se ha registrado correctamente",
                            usuario
                        })
                    })
          
            })


        }else{

            return resp.status(400).json({
                status  : "400",
                mensaje : "El usuario ya existe"
            })
        }
      
    })

}




const loginUsuario = (req, resp) => {
    
    //traemos datos Enviamos desde FRONTEND
    const datosFrontend = req.body;
    
    
    //comprobamos que vengan los 2 datos
    if( !datosFrontend.correo || !datosFrontend.pass1 ){
        
        return resp.status(400).json({
            error:"404",
            mensaje:"faltan alguno de los campos"
        })
    }


    //comprobamos que exista el email y la contraseña en la base de datos
    modeloUsuarios.findOne({ correo : datosFrontend.correo })
                .then( ( respuestaBaseDatos ) => {

                    if( !respuestaBaseDatos ){
                        
                        return resp.status(400).json({ mensaje:"el correo no existe" })
                    
                    }

                    //el correo existe ahora comprobar contraseña
                    const password = bcrypt.compareSync( datosFrontend.pass1,  respuestaBaseDatos.pass1 )
                    if( !password ){
                        
                        return resp.status(400).json({ mensaje:"la contraseña es incorrecta" })
                    }


                    //generar token
                    const Token = archivoToken.generarToken( respuestaBaseDatos )
                    

                    //retornamos el usuario    
                    return resp.status(200).json({
                        status:"sucess",
                        mensaje: "Bienvenido usuario",
                        respuestaBaseDatos: {
                            id : respuestaBaseDatos._id,
                            nombre : respuestaBaseDatos.nombre,
                            correo : respuestaBaseDatos.correo
                        },
                        Token
                    })
                       

                }).catch( )
 
}




module.exports = {
    
    registroUsuario,
    loginUsuario
}