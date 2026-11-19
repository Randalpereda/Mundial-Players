const seleccionesService = require("../services/selecciones.service");

// Obtener todas las selecciones
function obtenerSelecciones(req, res) {
    const selecciones = seleccionesService.obtenerSelecciones();

    res.json(selecciones);
}
// Obtener una seleccion por su nombre
function obtenerSeleccionPorNombre(req, res) {
    const nombre = req.params.nombre;

    const seleccion = seleccionesService.obtenerSeleccionPorNombre(nombre);

    if (!seleccion) {
        return res.status(404).json({
            mensaje: "No se encontró la seleccion solicitado"
        });
    }

    res.json(seleccion);
}

module.exports = {
    obtenerSelecciones,
    obtenerSeleccionPorNombre
};