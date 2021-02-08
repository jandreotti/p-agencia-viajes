import express from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
} from '../controllers/paginasController.js';

import { guardarTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

//! Defino las rutas.
//* ESTA FORMA ES SIN SEPARAR ROUTER CONTROLLER
/*
router.get('/', (request, response) => {
    //! request -> lo que enviamos del cliente al servidor de express  /// response -> lo que el servidor de express devuelve al cliente
    //* Retorno un texto a la pantalla
    //response.send(`<h1>Inicio</h1>`);
    //* Retorno un json a la pantalla
    // response.json({
    //     id: 1,
    //     nombre: 'Televisor',
    // });
    //* Se usa para mostrar una vista
    response.render('inicio', {
        pagina: 'Inicio',
    });
});

router.get('/nosotros', (req, res) => {
    res.render(`nosotros`, {
        pagina: 'Nosotros',
    }); //Renderizo hacia un template engine. He habilitado el Template Engine de PUG, asi que al poner esto, va a escanear buscando la vista nosotros.pug
});

router.get('/viajes', (req, res) => {
    res.render(`viajes`, {
        pagina: 'Viajes',
    });
});

router.get('/testimoniales', (req, res) => {
    res.render(`testimoniales`, {
        pagina: 'Testimoniales',
    });
});
*/

//* ESTA FORMA ES DIFERENCIANDO LAS RESPONSABILIDADES Y USANDO ROUTE aca y CONTROLLER con el import
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);
router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;
