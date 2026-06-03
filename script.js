// 1. CONFIGURA TU FECHA DE ANIVERSARIO AQUÍ (Año, Mes - 1, Día, Hora, Minuto)
// Ejemplo actual: 3 de mayo de 2025 (Mes 4 = Mayo en JS)
const fechaInicio = new Date(2025, 4, 3, 0, 0, 0); 

function actualizarContador() {
    const ahora = new Date();
    const diferenciaMilisegundos = ahora - fechaInicio;

    const segundosTotales = Math.floor(diferenciaMilisegundos / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const diasTotales = Math.floor(horasTotales / 24);

    let años = ahora.getFullYear() - fechaInicio.getFullYear();
    let meses = ahora.getMonth() - fechaInicio.getMonth();
    let dias = ahora.getDate() - fechaInicio.getDate();

    if (dias < 0) {
        meses--;
        const mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
        dias += mesAnterior.getDate();
    }
    if (meses < 0) {
        años--;
        meses += 12;
    }

    const horas = horasTotales % 24;
    const minutos = minutosTotales % 60;
    const segundos = segundosTotales % 60;

    document.getElementById("contador").innerHTML = `
        <div class="tiempo-bloque"><span>${años}</span> Años</div>
        <div class="tiempo-bloque"><span>${meses}</span> Meses</div>
        <div class="tiempo-bloque"><span>${dias}</span> Días</div>
        <div class="tiempo-bloque"><span>${horas}</span> Horas</div>
        <div class="tiempo-bloque"><span>${minutos}</span> Min</div>
        <div class="tiempo-bloque"><span>${segundos}</span> Seg</div>
    `;
    
    return (años * 12) + meses;
}

// 2. LOGICA MENSUAL AUTOMÁTICA
function cargarContenidoMensual(mesesTotales) {
    const contenedor = document.getElementById("contenido-mensual");
    
    switch(mesesTotales) {
        case 12:
            contenedor.innerHTML = `
                <h3>¡Feliz 1 Año Juntos!</h3>
                <p>Es increíble pensar en todo el tiempo que un año significa mi amor, es algo que jamás imaginé vivir con alguien y que ahora no puedo imaginar si no es contigo.</p>
            `;
            break;
        case 13:
            contenedor.innerHTML = `
                <h3>¡Felices 13 meses mi amor! 🥰</h3>
                <p>Un mes más sumando recuerdos hermosos a tu lado. ¡Por millones más!</p>
            `;
            break;
        default:
            contenedor.innerHTML = `
                <h3>Un día más a tu lado 💕</h3>
                <p>Cada segundo contigo cuenta de una manera única.</p>
            `;
    }
}

// 3. BASE DE DATOS DE LAS CARTAS
const misCartas = {
    1: "¡Hola mi amor! Escribo esta primera cartita para recordarte lo mucho que significas para mí. Desde el primer día supe que serías alguien especial en mi vida...",
    2: "Nuestra segunda carta... Me encanta mirar atrás y ver todo lo que hemos construido juntos en estos meses. Gracias por cada risa, cada abrazo y por ser mi lugar seguro. Te amo.",
    3: "Si estás leyendo esto, es porque quería recordarte que eres la persona más hermosa de este planeta. ¡Gracias por hacerme tan feliz!"
};

function abrirCarta(numeroCarta) {
    const modal = document.getElementById("modal-carta");
    const texto = document.getElementById("texto-carta");
    texto.innerText = misCartas[numeroCarta];
    modal.style.display = "flex";
}

function cerrarCarta() {
    document.getElementById("modal-carta").style.display = "none";
}

// 4. LÓGICA DEL LIGHTBOX (IMAGEN EN GRANDE)
function ampliarFoto(elementoPolaroid) {
    const lightbox = document.getElementById("lightbox");
    const imgAmpliada = document.getElementById("img-ampliada");
    const captionAmpliado = document.getElementById("caption-ampliado");
    
    const imgOriginal = elementoPolaroid.querySelector("img");
    const captionOriginal = elementoPolaroid.querySelector(".caption");
    
    imgAmpliada.src = imgOriginal.src;
    captionAmpliado.innerText = captionOriginal.innerText;
    lightbox.style.display = "flex";
}

function cerrarLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Cerrar modales si se hace clic fuera del contenido
window.onclick = function(event) {
    const modalCarta = document.getElementById("modal-carta");
    if (event.target == modalCarta) {
        modalCarta.style.display = "none";
    }
}

// Inicialización de ciclos
const mesesCumplidos = actualizarContador();
cargarContenidoMensual(mesesCumplidos);
setInterval(actualizarContador, 1000);