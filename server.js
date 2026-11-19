
const express = require("express");
const path = require("path");
const fs = require('fs');
const jugadoresRoutes = require("./routes/jugadores.routes");
const seleccionesRoutes = require("./routes/selecciones.routes");
const app = express();
const PORT = 3000;
const alineacionesRoutes = require("./routes/alineaciones.routes");
// Permite recibir datos en formato JSON

app.use(express.json());

app.use(express.urlencoded({
extended: true
}))

// Usar las rutas de jugadores
app.use("/api/jugadores", jugadoresRoutes);

// Usar las rutas de alineaciones
app.use("/api/alineaciones", alineacionesRoutes);
// Usar las rutas de jugadores
app.use("/api/selecciones", seleccionesRoutes);

// Permite mostrar los archivos de nuestra página web
app.use(express.static(path.join(__dirname, "public")));

// Primera ruta de prueba de nuestra API
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "principal.html"));
});
// Primera ruta de prueba de nuestra API
app.get("/api", function(req, res) {
    res.json({
        mensaje: "API de Mundial Players funcionando correctamente"
    });
});

// Iniciar el servidor
app.listen(PORT, function() {
    console.log("Servidor funcionando en http://localhost:" + PORT);
});
