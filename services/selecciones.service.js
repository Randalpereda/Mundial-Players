const fs = require("fs");
const path = require("path");

// Ubicación del archivo JSON
const rutaSelecciones = path.join(__dirname, "../data/selecciones.json");

function obtenerSelecciones() {

    const contenido = fs.readFileSync(rutaSelecciones, "utf-8");

    return  JSON.parse(contenido);
}

function obtenerSeleccionPorNombre(nombre) {
    const selecciones = obtenerSelecciones();

    return selecciones.find(seleccion => seleccion.nombre === nombre);
}

// Exportar las funciones
module.exports = {
    obtenerSelecciones,
    obtenerSeleccionPorNombre
};