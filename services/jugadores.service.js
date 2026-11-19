const fs = require("fs");
const path = require("path");
// Ubicación del archivo JSON
const rutaJugadores = path.join(__dirname, "../data/jugadores.json");

// Obtener todos los jugadores
function obtenerJugadores() {
    const contenido = fs.readFileSync(rutaJugadores, "utf-8");

    return JSON.parse(contenido);
}

function crearImagen(nombre, file)
{
    if(!file){
        throw new Error('Please upload an image file.');
    }

    return {
      nombre,
      imageUrl: `/img/${file.filename}`
    };
}

// Obtener los jugadores dado un inicio y una cantidad, comenzando en 0
function obtenerJugadoresRango(inicio, cantidad, seleccion = "") {

    if(cantidad < 0)
    {
        return [];
    }

    const contenido = fs.readFileSync(rutaJugadores, "utf-8");
    let content = JSON.parse(contenido);

    if(seleccion != "")
    {
        content = content.filter((jugador) => jugador.seleccion === seleccion);
    }
    
    return content.slice(inicio, Number(inicio) + Number(cantidad));
}

// Obtener los jugadores de X pagina, comenzando de 1
function obtenerJugadoresPagina(num_pagina, seleccion = "") {

    if(num_pagina < 0)
    {
        return [];
    }

    const contenido = fs.readFileSync(rutaJugadores, "utf-8");
    const tamanio_pagina = 5;
    let content = JSON.parse(contenido);
    const inicio = (num_pagina - 1) * tamanio_pagina;

    if(seleccion != "")
    {
        content = content.filter((jugador) => jugador.seleccion === seleccion);
    }

    return content.slice(inicio, inicio + tamanio_pagina);
}

// Obtener un jugador por su ID
function obtenerJugadorPorId(id) {
    const jugadores = obtenerJugadores();

    return jugadores.find(jugador => jugador.id === id);
}

// Obtener un jugador por su ID
function obtenerJugadorPorNombre(nombre) {
    const jugadores = obtenerJugadores();

    return jugadores.find(jugador => jugador.nombre === nombre);
}

// Crea nuevo jugador
function insertarJugador(body) {
    const contenido = fs.readFileSync(rutaJugadores, "utf-8");
    let content = JSON.parse(contenido);
    const new_id = String(Number(content[content.length-1].id) + 1);

    let new_body = JSON.stringify(body);

    // Agrega el id, al principio del elemento
    new_body = new_body.substring(0,1) + "\"id\": \"" + new_id + "\"," + new_body.substring(1);

    content[content.length] = JSON.parse(new_body);

    fs.writeFileSync(rutaJugadores, JSON.stringify(content, 0 , 4), "utf-8");
}

function modificarJugador(body) {
    const contenido = fs.readFileSync(rutaJugadores, "utf-8");
    let content = JSON.parse(contenido);
    
    content.forEach(modificaJugadorAux, body);

    
    function modificaJugadorAux(item, index, arr)
    {
        if(item.id === this.id)
        {
            arr[index] = this;
        }
    }
    fs.writeFileSync(rutaJugadores, JSON.stringify(content, 0 , 4), "utf-8");
}




// Exportar las funciones
module.exports = {
    obtenerJugadores,
    crearImagen,
    obtenerJugadoresRango,
    obtenerJugadoresPagina,
    obtenerJugadorPorId,
    obtenerJugadorPorNombre,
    insertarJugador,
    modificarJugador
};