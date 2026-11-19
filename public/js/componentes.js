
// Obtener la página actual
const pagina = document.body.dataset.pagina;

// Crear el encabezado
const encabezado = document.querySelector("#encabezado");

encabezado.innerHTML = `
    <header>
        <div class="logo">
            <img src="img/mp.jpg" alt="Logo de Mundial Players">
            <h1>Mundial Players</h1>
        </div>

        <nav aria-label="Navegación principal">
            <a href="principal.html"
               ${pagina === "inicio" ? 'class="seleccionado" aria-current="page"' : ""}>
                Inicio
            </a>

            <a href="jugadores.html"
               ${pagina === "jugadores" || pagina === "detalle" ? 'class="seleccionado" aria-current="page"' : ""}>
                Jugadores
            </a>

            <a href="alineacion.html"
   ${pagina === "alineacion" ? 'class="seleccionado" aria-current="page"' : ""}>
    Armá tu 11
            </a>

            <a href="formulario_jugador.html"
               ${pagina === "formulario_jugador" ? 'class="seleccionado" aria-current="page"' : ""}>
                Agregar Jugador
            </a>
        </nav>
    </header>
`;

// Crear el pie de página
const piePagina = document.querySelector("#pie-pagina");

piePagina.innerHTML = `
    <footer>
        <p>Mundial Players - Trabajo Práctico</p>
    </footer>
`;
