
const parametros = new URLSearchParams(window.location.search);
const idJugador = parametros.get("id");

// Obtener los elementos del HTML
const form = document.querySelector('#formulario_jugador');
const selecciones_campo = document.querySelector("#seleccion");
const id_campo = document.querySelector("#id");
const nombre_campo = document.querySelector("#nombre");
const posicion_campo = document.querySelector("#posicion");
const dorsal_campo = document.querySelector("#dorsal");
const imagen_campo = document.querySelector("#imagen");
const visualizacion_imagen_campo = document.querySelector("#visualizacion_imagen");
const mensaje_respuesta = document.querySelector('#mensaje_respuesta');

async function cargarDatos()
{
    const response_jugador = await fetch("/api/jugadores/"+idJugador);
    const jugador = await response_jugador.json();

    const response_selecciones = await fetch("/api/selecciones");
    const selecciones_datos = await response_selecciones.json();

    cargarOpciones(selecciones_datos);

    id_campo.value = idJugador;
    nombre_campo.value = jugador.nombre;
    selecciones_campo.value = jugador.seleccion;
    posicion_campo.value = jugador.posicion;
    dorsal_campo.value = jugador.dorsal;
    //imagen_campo.value = jugador.imagen;
    visualizacion_imagen_campo.src = jugador.imagen;
    visualizacion_imagen_campo.alt = jugador.nombre;
}

async function cargarOpciones(selecciones_datos)
{
    selecciones_datos.forEach(function(seleccion) {

        const opcion = document.createElement("option");
        opcion.value = seleccion.nombre;
        opcion.innerHTML = seleccion.nombre + " - " + seleccion.bandera;
        selecciones_campo.appendChild(opcion);
    });
}

cargarDatos();

async function postJugador(e)
{
    e.preventDefault();

    // Create a FormData container
    let formData = new FormData();

    formData.append('imagen_archivo', imagen_campo.files[0]);

    formData.append('id', id_campo.value);
    formData.append('nombre', nombre_campo.value);
    formData.append('seleccion', selecciones_campo.value);
    formData.append('posicion', posicion_campo.value);
    formData.append('dorsal', dorsal_campo.value);
    if(imagen_campo.files[0]){
        formData.append('imagen', "img/" + imagen_campo.files[0].name);
    } else {
        formData.append('imagen', jugador.imagen);
    }

    try {

        const response_jugador = await fetch('/api/jugadores/submit', {
            method: 'PUT',
            body: formData 
        });

        const data = await response_jugador.json();

        if(!response_jugador.ok)
        {
            mensaje_respuesta.innerHTML = data.mensaje || data.error || "Error, fallo de conexión con el servidor.";
            return;
        }


        const targetUrl = data.redirectUrl;
        window.location.href = targetUrl;
    } catch (error) {
        mensaje_respuesta.innerHTML = error.mensaje;
    };
}

form.addEventListener('submit', postJugador);