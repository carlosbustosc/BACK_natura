
/*----importar schema y model-----*/
const { Schema, model } = require('mongoose');


/*---create modelo con schema----*/
const modeloPropietarios = Schema({

    nombre: {
        type:String,
        require: true
    },
    edad: String,
    cedula: {
        type:Number,
        require:true
    },
    correo:{
        type:String,
        require:true
    },
    celular:String,
    torre: {
        type:String,
        require:true
    },
    apartamento:{
        type: String,
        require:true
    },
    parqueadero:String,
    deuda:{
        type:String,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now

    }

})


/*---exportamos modelo---*/
module.exports = model('registroPropietarios', modeloPropietarios, "propietarios");