const express = require("express");
const router = express.Router();

const seleccionesController = require("../controllers/selecciones.controller");

router.get("/", seleccionesController.obtenerSelecciones);

router.get("/:nombre", seleccionesController.obtenerSeleccionPorNombre);

/*
router.get("/agregar", jugadoresController.insertarJugador(req))
*/

module.exports = router;