import { Testimonial } from '../Models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    //console.log(req.body);  //La informacion del formulario

    //Validar el formulario

    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre esta vacio.' });
    }

    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo esta vacio.' });
    }

    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje esta vacio.' });
    }

    if (errores.length > 0) {
        //Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        //Mostrar la vista con errores
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales,
        });
    } else {
        //Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje,
            });
        } catch (error) {
            console.log(error);
        }
        res.redirect('/testimoniales');
    }
};

export { guardarTestimonial };
