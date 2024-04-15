/*---importamos la conexion---*/
const { conectar } = require('./baseDatos/conexion');
conectar();

/*---importamos express para crear el servidor-----*/
const express = require('express');
const cors    = require('cors');

/*----inicializamos express---*/
const ejecutarExpress = express();



/*----------------configuracion de datos--------------*/
ejecutarExpress.use( cors() );
ejecutarExpress.use( express.json() )
ejecutarExpress.use( express.urlencoded( { extended:true } ) )



/*---creamos el servidor---*/
ejecutarExpress.listen(5000, (req, resp) => {

    console.log("conectado al servidor")

})



/*----------importamos las rutas-----------*/
const rutaUsuario       = require('./rutas/rutaUsuarios');
const rutaPropietarios  = require('./rutas/rutaPropietarios')

ejecutarExpress.use(rutaUsuario);
ejecutarExpress.use(rutaPropietarios)







