
/*---traer el schema y model----*/
const { Schema, model } = require('mongoose');

const modeloUsuario = Schema({

    nombre: {
        type:String,
        require : true
    },
    correo: {
        type:String,
        require:true
    },
    pass1:{
        type:String,
        require:true
    },
    pass2:{
        type:String,
    }

})


module.exports = model("registroUsuario", modeloUsuario, "usuarioConjunto");
