
/*----importar jwt----*/
const jwt = require('jwt-simple');
/*----importar moment para el tiempo---*/
const moment = require('moment')




/*----generar clave secreta-----*/
const claveSecreta = "Ecoutores09**"


/*--generar token----*/
const generarToken = (usuario) => {

    const carga = {
        id: usuario._id,
        nombre : usuario.nombre,
        pass1 : usuario.pass1,
        pass2 : usuario.pass2,
        creacion : moment().unix(),
        terminacion : moment().add(30, "days").unix
    }

    //devolver token codificado
    return jwt.encode( carga, claveSecreta)

}

module.exports = {

    generarToken
}
