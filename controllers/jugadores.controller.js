const jugadoresService = require("../services/jugadores.service");
const seleccionesService = require("../services/selecciones.service");

// Obtener todos los jugadores
function obtenerJugadores(_req, res) {
    const jugadores = jugadoresService.obtenerJugadores();

    res.json(jugadores);
}

// Obtener todos los jugadores
function obtenerJugadoresRango(req, res) {

    let seleccion = "";

    if(req.params.seleccion)
    {
        seleccion = req.params.seleccion;
    } 

    const jugadores = jugadoresService.obtenerJugadoresRango(req.params.inicio, req.params.cantidad, seleccion);

    res.json(jugadores);
}

// Obtener todos los jugadores
function obtenerJugadoresPagina(req, res) {
    
    let seleccion = "";

    if(req.params.seleccion)
    {
        seleccion = req.params.seleccion;
    } 

    const jugadores = jugadoresService.obtenerJugadoresPagina(req.params.num_pagina, seleccion);

    res.json(jugadores);
}


// Obtener un jugador por su ID
function obtenerJugadorPorId(req, res) {
    const id = req.params.id;

    const jugador = jugadoresService.obtenerJugadorPorId(id);

    if (!jugador) {
        return res.status(404).json({
            mensaje: "No se encontró el jugador solicitado"
        });
    }

    res.json(jugador);
}

// Agregar un jugador
async function insertarJugador(req, res) {

    try{

        const nombre = req.body.nombre;

        // Revisar que no exista ya el jugador
        const jugador = jugadoresService.obtenerJugadorPorNombre(nombre);

        if(jugador)
        {
            return res.status(400).json({
                mensaje: "Ya existe un jugador con ese nombre"
            });
        }

        // Luego revisa que todos los datos sean correctos
        mensaje_error = checkearDatos(req.body);

        if(mensaje_error)
        {
            return res.status(400).json({
                mensaje: mensaje_error
            });
        }

        const imagen = req.body.imagen;
        const file = req.file;

        const savedItem = await jugadoresService.crearImagen(imagen, file);
        let new_body = req.body;
        new_body.imagen = savedItem.imageUrl;

        await jugadoresService.insertarJugador(new_body);

        const id_jugador = jugadoresService.obtenerJugadorPorNombre(req.body.nombre);

        return res.status(201).json({
                menasje: 'Jugador creado correctamente!',
                // For example, a frontend detail page route:
                redirectUrl: `/detalle.html?id=${id_jugador.id}`
            });
    } 
    catch(error)
    {
        return res.status(400).json({
            mensaje: error.message
        });
    }
}

async function modificarJugador(req, res) {

    const id = req.body.id;

        // Revisar que no exista ya el jugador
    const jugador = jugadoresService.obtenerJugadorPorId(id);

    if(!jugador)
    {
        return res.status(400).json({
            mensaje: "No se encontró el jugador solicitado"
        });
    }

    // Luego revisa que todos los datos sean correctos
    mensaje_error = checkearDatos(req.body);


    if(mensaje_error)
    {
        return res.status(400).json({
            mensaje: mensaje_error
        });
    }


    try{
        if(req.body.imagen != jugador.imagen)
        {
            const file = req.file;
            const savedItem = await jugadoresService.crearImagen(req.body.imagen, file);
        }
    } catch(e)
    {

    }

    jugadoresService.modificarJugador(req.body);

    return res.status(201).json({
            mensaje: 'Jugador modificado con exito!',
            // For example, a frontend detail page route:
            redirectUrl: `/detalle.html?id=${id}`
        });
}

function checkearDatos(body)
{
    const nombre = body.nombre;
    const seleccion = body.seleccion;
    const posicion = body.posicion;
    const dorsal = body.dorsal;
    //const imagen = body.imagen;

    const patron_nombre = /^[A-Z]/

    // Checkeando nombre
    if(nombre.search(patron_nombre) != 0)
    {
        return "El nombre no es válido, debe empezar con una letra mayúscula";
    }

    arreglo_patron_nombre = nombre.match(/[A-Za-záéíóúñÑ\s]/g);
    // Checkeando nombre
    if(arreglo_patron_nombre === null || arreglo_patron_nombre.length != nombre.length)
    {
        return "El nombre no es válido, debe usar solo letras y espacios";
    }

    const seleccion_obj =  seleccionesService.obtenerSeleccionPorNombre(seleccion);

    if(!seleccion_obj)
    {
        return "La selección no es válida, debe seleccionar una selección válida.";
    }

    const posiciones_posibles = Array("Arquero", "Defensor", "Mediocampista", "Delantero");

    if(!posiciones_posibles.includes(posicion))
    {
        return "La posición no es válida, debe seleccionar una posición válida.";
    }

    const numero_dorsal = Number(dorsal);
    if(!Number.isInteger(numero_dorsal))
    {
        return "El dorsal no es válido, no es un número.";
    }

    if(numero_dorsal < 1 || numero_dorsal > 26)
    {
        return "El dorsal no es válido, debe estar en el rango de 1 a 26.";
    }

    /*

    if(!imagen)
    {
        return "La imagen no es válida.";
    }
    */

    return null;
}

module.exports = {
    obtenerJugadores,
    obtenerJugadoresRango,
    obtenerJugadoresPagina,
    obtenerJugadorPorId,
    insertarJugador,
    modificarJugador
};