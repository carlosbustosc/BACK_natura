/*----importamos el modelo----*/
const modeloPropietarios = require('../modelos/registroPropietarios');

// importar token
const archivoToken = require('../Token_jwt/propietariosToken')



const registroPropietarios = (req, resp) => {

    //obenter informacion del FRONT
    const datosFront = req.body;


    //validar campos requeridos
    if( !datosFront.nombre || !datosFront.cedula || !datosFront.correo || !datosFront.torre || !datosFront.apartamento ||  !datosFront.deuda){
        return resp.status(200).json({
            status:"400",
            mensaje: "falta alguna dato requerido"
        })
    }


    //validar si existe en la base de datos para registrar
    modeloPropietarios.find({
        $or: [
            { correo: datosFront.correo },
            { cedula: datosFront.cedula }
        ]
    }).then( (usuarioDB) => {

        if( usuarioDB.length >= 1 ){
            return resp.status(400).json({
                mensaje:"El usuario ya existe"
            })
        }


        //guardar usuario
        const ModeloListo = modeloPropietarios( datosFront )

        ModeloListo.save()
                .then( ( usuarioGuardadoDB ) => {

                    //generar token
                     const Token = archivoToken.tokenPropietarios( usuarioGuardadoDB )

                    return resp.status(200).json({
                        status:"success",
                        mensaje: "el usuario se ha guardado correctamente",
                        usuarioGuardadoDB: usuarioGuardadoDB,
                        token : Token
                    })
                })
    }).catch()
    
   
}



const mostrarPropietarios = (req, resp) => {

    //usamos el modelo para consultar base datos
    modeloPropietarios.find()
        .then( ( todosLosPropietarios ) => {

            if( todosLosPropietarios.length == 0  ){
                
               return resp.status(400).json({
                status:"error",
                mensaje:"no hay registros"
               })
            
            } 


            return resp.status(200).json({
                status  :"success",
                mensaje : "Se han encontrado registros para propietarios",
                todosLosPropietarios
            })

             
        }).catch()

}


const mostrarUnPropietario = (req, resp) => {

    //obtener id que viene por url
    const idPropietario = req.params.id
    
    
    //buscar en la base de datos el propietario con ese id
    modeloPropietarios.find( { _id : idPropietario } )
                .then( ( todoElUsuario ) => {
                    
                    if(todoElUsuario){

                        return resp.status(200).json({
                            status:"success",
                            mensaje:"Existe el propietario",
                            todoElUsuario
                        })
                    }
                   

                }).catch( (err ) => {

                    return resp.status(400).json({
                        status:"400",
                        mensaje :" no existe el propietario"
                    })
                })



    

}



const actualizarPropietario = (req, resp) => {

    //obtener id del propietario
    const idFront = req.params.id

    //obtener registros enviado por el FRONTEND
    const datosFrontend = req.body;

    //verificar si ese usuario si existe
    modeloPropietarios.findOneAndUpdate( { _id : idFront}, datosFrontend )
        .then( (usuarioActualizado) => {

            return resp.status(200).json({
                status: "success",
                mensaje: "El propietario se ha actualizado con exito",
                usuarioActualizado

            })
        
        }).catch( (error) => {

            return resp.status(404).json({
                status:"error",
                mensaje:"El usuario que desea actualizar no existe"
            })
        })



}



const borrarPropietario = (req, resp) => {

    //obtener id por parametro que viene del FRONT
    const idFront = req.params.id
    //console.log(idFront);
    
    
    //verificar que el dato propietario exista y borrar
    modeloPropietarios.findOneAndDelete( { _id : idFront } )
                .then( (erro, usuarioBorrado) => {
                    
                    if(usuarioBorrado == undefined){
                        
                        return resp.status(400).json({
                            status:"error",
                            mensaje:"el usuario que desea borrar no existe"
                        })
                    }

                    return resp.status(200).json({
                        status:"success",
                        mensaje:"el usuario se ha borrado correctamente"
                    })
                    

                }).catch( () => {

                   
                })


}



const actualizarDeuda = (req, resp) => {

    //recibir id url
    const idFRONT = req.params.id

    if(! idFRONT ){
        return resp.status(400).json({ mensaje:"el ID no llego correctamente" })
    }

    //recibir body
    const infoFRONT = req.body


    //actualizar en la base de datos
    
    modeloPropietarios.findOneAndUpdate( { _id: idFRONT }, { deuda : infoFRONT.deuda } )
                .then( (registroActualizado) => {

                    return resp.status(200).json({
                        status:"success",
                        mensaje: "la deuda se ha ACTUALIZADO",
                        registroActualizado
                    })
                
                }).catch( (error) => {

                    return resp.status(200).json({
                        status:"error",
                        mensaje: "No se pudo actualizar la informacion",
                        error
                    })

                } )



}

module.exports = {

    registroPropietarios,
    mostrarPropietarios,
    mostrarUnPropietario,
    actualizarPropietario,
    borrarPropietario,
    actualizarDeuda

}