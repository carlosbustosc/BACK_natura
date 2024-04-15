/*---importar jwt---*/
const jwt = require('jwt-simple');

//moment para controlar tiempo del token
const moment = require('moment') 


/*----clave segura----*/
const claveSegura = "Ecoutores09**"


const tokenPropietarios = (usuario) => {

    const datosPropietario = {

            _id : usuario._id,
            nombre : usuario.nombre,
            edad : usuario.edad,
            cedula : usuario.cedula,
            correo : usuario.correo,
            celular : usuario.celular,
            torre : usuario.torre,
            apartamento : usuario.apartamento,
            parqueadero : usuario.parqueadero,
            deuda : usuario.deuda,
            fecha : usuario.fecha,
            creacion : moment().unix(),
            finalizacion : moment().add(30, 'days').unix
    }

    return jwt.encode( datosPropietario, claveSegura)
}


module.exports = {
    tokenPropietarios
}