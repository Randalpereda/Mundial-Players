
const listaJugadores = document.querySelector("#lista-jugadores");
const filtroSeleccion = document.querySelector("#filtro-seleccion");
const mensaje = document.querySelector("#mensaje");
const flechaIzquierda = document.querySelector("#flecha-izquierda");
const flechaDerecha = document.querySelector("#flecha-derecha");

let num_pagina = 1;
let jugadoresMostrados = [];
let estaCargando = false;
let hayMas = true;

// Mostrar los jugadores
async function mostrarJugadores() {

    if (estaCargando || !hayMas) return;

    estaCargando = true;

    const seleccionElegida = filtroSeleccion.value;

    let jugadoresNuevos = [];


    // Optional: Add a temporary loading indicator
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.textContent = 'Cargando...';
    listaJugadores.appendChild(loader);

    try {
        const response_jugadores = await fetch("/api/jugadores/pagina/" + num_pagina + "/" + seleccionElegida);
        jugadoresNuevos = await response_jugadores.json();

        loader.remove();

        if (jugadoresNuevos.length === 0) {
            hayMas = false;
            if (num_pagina === 1)
            {
                if(seleccionElegida == "")
                {
                    mensaje.textContent =
                        "No se encontraron jugadores.";
                } 
                else 
                {
                    mensaje.textContent =
                        "No se encontraron jugadores de esta selección.";
                }
            } 
            else
            {
                if(seleccionElegida == "")
                {
                    mensaje.textContent =
                        "No hay más jugadores para cargar.";
                } 
                else
                {
                    mensaje.textContent =
                        "No hay más jugadores para cargar de esta seleccion.";
                }
            }
            return;
        }

        if(jugadoresMostrados.length === 0)
        {
            listaJugadores.innerHTML = "";
            mensaje.textContent = "";
        }
    
        jugadoresMostrados = jugadoresMostrados.concat(jugadoresNuevos);

        jugadoresNuevos.forEach(function(jugador) {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("jugador");

            const imagen = document.createElement("img");
            imagen.src = jugador.imagen;
            imagen.alt = jugador.nombre;

            const nombre = document.createElement("h3");
            nombre.textContent = jugador.nombre;

            const seleccion = document.createElement("p");
            seleccion.textContent = jugador.seleccion;

            const posicion = document.createElement("p");
            posicion.textContent = jugador.posicion;

            const dorsal = document.createElement("p");
            dorsal.textContent = "Dorsal: " + jugador.dorsal;

            const enlace = document.createElement("a");
            enlace.href = "detalle.html?id=" + jugador.id;
            enlace.textContent = "Ver detalle";

            tarjeta.appendChild(imagen);
            tarjeta.appendChild(nombre);
            tarjeta.appendChild(seleccion);
            tarjeta.appendChild(posicion);
            tarjeta.appendChild(dorsal);
            tarjeta.appendChild(enlace);

            listaJugadores.appendChild(tarjeta);
        });

        num_pagina = num_pagina + 1;
        
        observarUltimoItem();

        } catch (error) {
            console.error('Error buscando datos de jugadores:', error);
            loader.textContent = 'Error';
        } finally {
            estaCargando = false;
        }

}

function recargarJugadores()
{
    num_pagina = 1;
    jugadoresMostrados = [];
    estaCargando = false;
    hayMas = true;
    listaJugadores.scrollTo({ left: 0, behavior: 'instant' });
    mostrarJugadores();
}

async function cargarOpcionesSelecciones()
{
    const response = await fetch("/api/selecciones");
    const selecciones_datos = await response.json();

    selecciones_datos.forEach(function(seleccion) {

        const opcion = document.createElement("option");
        opcion.value = seleccion.nombre;
        opcion.innerHTML = seleccion.nombre + " - " + seleccion.bandera;
        filtroSeleccion.appendChild(opcion);
    });
}

// Observador para saber cuando cargar datos
const observer = new IntersectionObserver((jugadores) => {
  const ultimoJugador = jugadores[0];
  
  if (ultimoJugador.isIntersecting && !estaCargando) {
    observer.unobserve(ultimoJugador.target); // Stop watching the current last item
    mostrarJugadores(); // Fetch the next 5
  }
}, {
  root: listaJugadores, // Watch scrolling specifically inside the carousel container
  threshold: 0.5 // Trigger when 50% of the last item is visible
});

function observarUltimoItem() {
  const items = listaJugadores.querySelectorAll('.jugador');
  if (items.length > 0) {
    const lastItem = items[items.length - 1];
    observer.observe(lastItem);
  }
}

// Funcion para scorllear el carrusel
function scrollCarrusel(direction) {
  const itemWidth = listaJugadores.querySelector('.jugador')?.offsetWidth || 250;
  const gap = 16; // Matches the CSS gap
  const scrollAmount = (itemWidth + gap) * direction;

  listaJugadores.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

flechaIzquierda.addEventListener('click', () => scrollCarrusel(-1));
flechaDerecha.addEventListener('click', () => scrollCarrusel(1));
filtroSeleccion.addEventListener('change', () => recargarJugadores());

cargarOpcionesSelecciones();
// Mostrar los jugadores iniciales
mostrarJugadores();