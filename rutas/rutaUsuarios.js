
/*---importamos express-----*/
const express = require('express');
const usarRuta = express.Router();


/*---importamos los controladores----*/
const controladorUsuario = require("../controladores/controladorUsuario")



/*----creamos rutas-----*/
usarRuta.post('/registro', controladorUsuario.registroUsuario)
usarRuta.post('/login',    controladorUsuario.loginUsuario)





/*---------exportamos el router-------*/
module.exports = usarRuta;