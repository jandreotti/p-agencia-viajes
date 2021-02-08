console.log('Iniciando...2');
//! 1º importo express
// Versiones Anteriores de JS -> SINTAXIS DE Common JS (ANTES NO HABIA MODULOS Y POR ESO SE USABA ESTO EN SU MOMENTO)
//const express = require('express');

// Version actual de JS -> Utiliza Modulos.  => Se debe agregar en el package.json       "type": "module",
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

//! Conectar a la base de datos
db.authenticate()
  .then(() => console.log('Base de datos autenticada'))
  .catch((error) => console.log(error));

//! 2º Creo la variable de servidor.
const app = express();

//! 3º Habilito un TEMPLATE ENGINE
//Template Engines:
//PUG/EJS/HBS/REACT
//Se instala con: npm install pug
//se habilita con: app.set("view engine","pug");
app.set('view engine', 'pug');

//! 4º OPCIONAL -> Agregar un Middleware propio para calcular el año actual en el footer
app.use((req, res, next) => {
  //Creo la variable año y se la asigno a los locals de express. Esta variables que estan en locals estan disponible edesde las vistas de pug
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = 'Agencia de Viajes';

  //* Esta linea de abajo es importante para que se ejecute el siguiente middleware (Osea el de definir la carpeta publica.) Sino se clava ahi.
  next();
  // return next();
});

//! 5º Agregar el middleware BODDY PARSER para leer los datos de un formulario
app.use(express.urlencoded({ extended: true }));

//! 6º Definir la carpeta publica
app.use(express.static('public'));

//! 7º Defino las rutas manualmente o agrego un router
app.use('/', router);

//! 8aº Defino el puerto. (process.env.PORT se usa esta variable en produccion (heroku))
const port = process.env.PORT || 4000;

//! 8bº Hago lo mismo con el host
const host = process.env.HOST || '0.0.0.0';

//! 9º Arranco el servidor en el puerto tanto. Y si arranca bien larga el mensaje.
app.listen(port, host, () => {
  console.log(`El servidor esta funcionando ${host}  --->  ${port}`);
});
