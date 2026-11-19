
const contenedor = document.querySelector("#detalle-jugador");

const parametros = new URLSearchParams(window.location.search);
const idJugador = parametros.get("id");

async function cargarDatosJugador()
{
    const response_jugador = await fetch("/api/jugadores/"+idJugador);
    const jugador = await response_jugador.json();

    if (response_jugador.status != 404) {

        contenedor.innerHTML = `
            <div class="detalle-imagen">
                <img src="${jugador.imagen}" 
                    alt="${jugador.nombre}">
            </div>

            <div class="detalle-info">
                <h2>${jugador.nombre}</h2>

                <p><strong>Selección:</strong> ${jugador.seleccion}</p>

                <p><strong>Posición:</strong> ${jugador.posicion}</p>

                <p><strong>Dorsal:</strong> ${jugador.dorsal}</p>

                <a href="jugadores.html">Volver a jugadores</a>

                <a href="formulario_jugador_put.html?id=${jugador.id}">
                    Editar jugador
                </a>
            </div>
        
        `;

    } else {
        contenedor.textContent = "No se encontró el jugador.";
    }
}

cargarDatosJugador();