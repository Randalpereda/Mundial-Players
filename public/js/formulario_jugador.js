
// Obtener los elementos del HTML
const selecciones_campo = document.querySelector("#seleccion");
const form = document.querySelector('#formulario_jugador');
const nombre_campo = document.querySelector("#nombre");
const posicion_campo = document.querySelector("#posicion");
const dorsal_campo = document.querySelector("#dorsal");
const imagen_campo = document.querySelector("#imagen");
const mensaje_respuesta = document.querySelector('#mensaje_respuesta');

async function cargarOpciones()
{
    const response = await fetch("/api/selecciones");
    const selecciones_datos = await response.json();

    selecciones_datos.forEach(function(seleccion) {

        const opcion = document.createElement("option");
        opcion.value = seleccion.nombre;
        opcion.innerHTML = seleccion.nombre + " - " + seleccion.bandera;
        selecciones_campo.appendChild(opcion);
    });
}

cargarOpciones();

async function postJugador(e)
{
    e.preventDefault();

    // Create a FormData container
    let formData = new FormData();

    formData.append('imagen_archivo', imagen_campo.files[0]);

    formData.append('nombre', nombre_campo.value);
    formData.append('seleccion', selecciones_campo.value);
    formData.append('posicion', posicion_campo.value);
    formData.append('dorsal', dorsal_campo.value);

    if(imagen_campo.files[0]){
        formData.append('imagen', "img/" + imagen_campo.files[0].name);
    }

    try {
        const response_jugador = await fetch('/api/jugadores/submit', {
            method: 'POST',
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