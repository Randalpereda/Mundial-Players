const express = require("express");
const router = express.Router();

const jugadoresController = require("../controllers/jugadores.controller");

const uploader_images = require('../middlewares/upload.middleware');

router.get("/", jugadoresController.obtenerJugadores);

router.get("/:id", jugadoresController.obtenerJugadorPorId);

router.get("/rango/:inicio/:cantidad", jugadoresController.obtenerJugadoresRango);
router.get("/rango/:inicio/:cantidad/:seleccion", jugadoresController.obtenerJugadoresRango);

router.get("/pagina/:num_pagina", jugadoresController.obtenerJugadoresPagina);
router.get("/pagina/:num_pagina/:seleccion", jugadoresController.obtenerJugadoresPagina);

router.post("/submit", uploader_images.uploadSingleImage, jugadoresController.insertarJugador);
router.put("/submit", uploader_images.uploadSingleImage, jugadoresController.modificarJugador);

router.post("/submit_put", jugadoresController.modificarJugador);

module.exports = router;