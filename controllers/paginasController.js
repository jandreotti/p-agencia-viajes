//! EL CONTROLADOR ES EL QUE DICE QUE ES LO QUE SE TIENE QUE MOSTRAR

import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../Models/Testimoniales.js';

const paginaInicio = async (request, response) => {
    //! request -> lo que enviamos del cliente al servidor de express  /// response -> lo que el servidor de express devuelve al cliente
    //* Retorno un texto a la pantalla
    //response.send(`<h1>Inicio</h1>`);
    //* Retorno un json a la pantalla
    // response.json({
    //     id: 1,
    //     nombre: 'Televisor',
    // });

    try {
        //Consultar 3 viajes y testimoniales del modelo de viajes para pasarlo a la vista de Inicio
        //*De esta manera se ejecuta primero una, y luego se ejecuta la otra
        //const viajes = await Viaje.findAll({ limit: 3 });
        //const testimoniales = await Testimonial.findAll({ limit: 3 });

        //* De esta manera se ejecutan las dos al mismo tiempo
        const respuesta = await Promise.all([
            Viaje.findAll({ limit: 3 }),
            Testimonial.findAll({ limit: 3 }),
        ]);
        const viajes = respuesta[0];
        const testimoniales = respuesta[1];

        //* Se usa para mostrar una vista
        response.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes,
            testimoniales,
        });
    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (req, res) => {
    res.render(`nosotros`, {
        pagina: 'Nosotros',
    }); //Renderizo hacia un template engine. He habilitado el Template Engine de PUG, asi que al poner esto, va a escanear buscando la vista nosotros.pug
};

const paginaViajes = async (req, res) => {
    //Consulto la base de datos de viajes
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render(`viajes`, {
        pagina: 'Proximos Viajes',
        viajes,
    });
};

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render(`testimoniales`, {
            pagina: 'Testimoniales',
            testimoniales,
        });
    } catch (error) {
        console.log(error);
    }
};

//Muestra un viaje por su slug
//router.get('/viajes/:viaje', paginaDetalleViaje);
const paginaDetalleViaje = async (req, res) => {
    console.log(req.params); //! Este params muestra el parametro pasado: ej: { viaje: 'viaje-italia' }
    console.log(req.params.slug); //! Esta clave hace referencia a lo que sigue despues de los dos puntos :viaje o :slug

    const { slug } = req.params;

    try {
        //const resultado = await Viaje.findOne({ where: { slug: slug } }); //where slug=slug
        const viaje = await Viaje.findOne({ where: { slug } }); //! puedo ahorrarme el slug:slug y simplificarlo en slug
        console.log(viaje);
        res.render(`viaje`, {
            pagina: 'Informacion Viaje',
            viaje,
        });
    } catch (error) {}
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
};
