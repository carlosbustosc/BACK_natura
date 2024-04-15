// hacer funcionar la ruta con express

/*---importamos express--*/
const express   = require('express');
const usarRuta  = express.Router();


/*----importamos el controlador---*/
const controladorPropietarios = require('../controladores/controladorPropietarios');


/*----creamos las rutas-------*/
usarRuta.post('/propietarios', controladorPropietarios.registroPropietarios);
usarRuta.get('/mostrarPropietarios', controladorPropietarios.mostrarPropietarios )
usarRuta.get('/unPropietario/:id', controladorPropietarios.mostrarUnPropietario);
usarRuta.put('/actualizarPropietario/:id', controladorPropietarios.actualizarPropietario);
usarRuta.delete('/borrarPropietario/:id', controladorPropietarios.borrarPropietario );
usarRuta.put('/actualizarDeuda/:id', controladorPropietarios.actualizarDeuda)


// Exportamos rutas

module.exports = usarRuta

