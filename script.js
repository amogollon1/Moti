// 1. CONFIGURACIÓN DE FECHAS (Año, Mes-1, Día)
const fechaInicio = new Date(2025, 4, 3, 0, 0, 0); // 3 de mayo de 2025

// Cumpleaños de Natalia
const MES_CUMPLE = 6;  // Junio
const DIA_CUMPLE = 18; // Cambia a 16 o 17 para pruebas

// 2. CONTROL DEL CAMBIO DE PANTALLA TOTAL
function evaluarPantallaCumpleanios() {
    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1; // JS cuenta de 0 a 11
    const diaActual = hoy.getDate();

    const pantallaCumple = document.getElementById("pantalla-cumpleanios");
    const pantallaAniversario = document.getElementById("main-wrapper");

    if (mesActual === MES_CUMPLE && diaActual === DIA_CUMPLE) {
        // ACTIVAR MODO CUMPLEAÑOS TOTAL
        pantallaCumple.classList.remove("ocultar-pantalla");
        pantallaAniversario.classList.add("ocultar-pantalla");
        document.body.style.backgroundColor = "#fff5f5"; 

        // Ráfaga automática de confeti al entrar
        setTimeout(() => {
            lanzarConfettiExplosivo();
            setTimeout(lanzarConfettiExplosivo, 800);
        }, 500);

        // INICIAR LA LLUVIA DE FOTOS
        crearLluviaDeFotos();

    } else {
        // MODO ANIVERSARIO NORMAL
        pantallaCumple.classList.add("ocultar-pantalla");
        pantallaAniversario.classList.remove("ocultar-pantalla");
    }
}

function crearLluviaDeFotos() {
    const pantallaCumple = document.getElementById("pantalla-cumpleanios");
    
    // BANCO DE FOTOS EXCLUSIVO CORREGIDO (Se añadieron las comas faltantes)
    const fotosCumpleanios = [
        { src: 'img/abrazoJaviJuli.jpg', cap: '¡Te amamos mi amor!' },
        { src: 'img/abrazoJMBR.jpg', cap: 'Nada se compara con tus abrazos baby.' },
        { src: 'img/cumple17.jpg', cap: 'Que emocionante es celebrar tu vida mi amor ❤️.' },
        { src: 'img/estampasVR.jpg', cap: '¡Muchas gracias por formar parte de estos momentos tan importantes para mi!' },
        { src: 'img/muertoMascarilla.jpg', cap: 'Eres mi lugar seguro, gracias por dejarme entrar en tu corazón.' },
        { src: 'img/piscina.jpg', cap: 'Haces los días especiales mucho más especiales ❤️.' }
    ];

    // Generar una foto flotante cada 2.5 segundos
    setInterval(() => {
        if (pantallaCumple.classList.contains("ocultar-pantalla")) return;

        const fotoAleatoria = fotosCumpleanios[Math.floor(Math.random() * fotosCumpleanios.length)];

        const elementoFoto = document.createElement("div");
        elementoFoto.classList.add("foto-cayendo");
        
        const posicionX = Math.random() * 80 + 5;
        elementoFoto.style.left = `${posicionX}%`;

        const duracion = Math.random() * 4 + 6;
        elementoFoto.style.animationDuration = `${duracion}s`;

        const rotacion = Math.random() * 30 - 15;
        elementoFoto.style.transform = `rotate(${rotacion}deg)`;

        elementoFoto.innerHTML = `
            <img src="${fotoAleatoria.src}" alt="Foto flotante de cumpleaños">
            <span class="caption-oculto" style="display:none;">${fotoAleatoria.cap}</span>
        `;

        elementoFoto.addEventListener("click", function() {
            const lightbox = document.getElementById("lightbox");
            const imgAmpliada = document.getElementById("img-ampliada");
            const captionAmpliado = document.getElementById("caption-ampliado");
            
            imgAmpliada.src = fotoAleatoria.src;
            captionAmpliado.innerText = fotoAleatoria.cap;
            lightbox.style.display = "flex";
        });

        pantallaCumple.appendChild(elementoFoto);

        setTimeout(() => {
            elementoFoto.remove();
        }, duracion * 1000);

    }, 2500); 
}

// 3. RENDERIZADO DEL CONTADOR EN TIEMPO REAL
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

    const contadorDiv = document.getElementById("contador");
    if (contadorDiv) {
        contadorDiv.innerHTML = `
            <div class="tiempo-bloque"><span>${años}</span> Años</div>
            <div class="tiempo-bloque"><span>${meses}</span> Meses</div>
            <div class="tiempo-bloque"><span>${dias}</span> Días</div>
            <div class="tiempo-bloque"><span>${horas}</span> Horas</div>
            <div class="tiempo-bloque"><span>${minutos}</span> Min</div>
            <div class="tiempo-bloque"><span>${segundos}</span> Seg</div>
        `;
    }
    
    return (años * 12) + meses;
}

// 4. LÓGICA MENSUAL AUTOMÁTICA
function cargarContenidoMensual(mesesTotales) {
    const contenedor = document.getElementById("contenido-mensual");
    if (!contenedor) return;
    
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
                <p>¡Hola mi amor! Esta vez mi carta es un poco diferente, ya que no es física, pero es la primera que te daré por acá. 
                Mi amor este es nuestro décimo tercer mes como pareja y estoy muy feliz de poder decirlo mi amor, muchas "parejas" apenas y llegan a amarse, 
                mientras nosotros llevamos desde el día 1 haciendolo, demostrando y luchando por lo nuestro. Un mes más no suena tan impresionante luego de cumplir un año, 
                pero sí que lo es porque un mes se dice muy rápido, pero son 4 semanas, 31 días y muchas historias y momentos inolvidables a tu lado, 
                son experiencias que por más que pasen los meses, semnas y días, siguen siendo tan genuinos y especiales como la primera vez. 
                Natalia, fuiste mi primera vez en muchas cosas, cosas que para mí son tan valiosas y únicas y de las que estoy muy agradecido con Dios 
                por darme la oportunidad de vivir con nadie más que contigo. Te amo mucho mi amor, felices 13 meses.</p>
            `;
            break;
        default:
            contenedor.innerHTML = `
                <h3>Un día más a tu lado 💕</h3>
                <p>Cada segundo contigo cuenta de una manera única.</p>
            `;
    }
}

// 5. CARTAS CORREGIDAS (Texto en una sola línea)
const misCartas = {
    1: "Hola mi amor, espero te guste mucho esta pequeña página donde podremos poner algunas de las fotos y llevar un contador de cuanto tiempo llevamos siendo pareja. TE AMOS SIXSEVEN MILLONES MÁS.",
    2: "Hola mi amor, hoy la pasé muy bien, fue como dar un gran suspiro luego de unos días llenos de emociones un poco agridulces, extrañaba tanto sentarme contigo a platicar (comer jiji) y disfrutar de lindos momentos juntos. Hoy estabas muy guapa, me encantó como te veías en tu outfit, te queda perfecto. Muchas gracias por este lindo día amor. Te amo.",
    3: "Cooming Soon! Te amo pequitas."
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

// 6. EVENTOS DE CUMPLEAÑOS
function soplarVelas() {
    const fuego = document.getElementById("fuego-vela");
    if (fuego && fuego.style.display !== "none") {
        fuego.style.display = "none";
        for(let i=0; i<3; i++) {
            setTimeout(lanzarConfettiExplosivo, i * 300);
        }
    }
}

function lanzarConfettiExplosivo() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.55 }
        });
    }
}

function controlarMusica() {
    const audio = document.getElementById("musica-cumple");
    const btn = document.getElementById("btn-musica");
    if (audio && btn) {
        if (audio.paused) {
            audio.play().catch(e => console.log("Interacción requerida primero"));
            btn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>Pausar Música</span>';
        } else {
            audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-music"></i> <span>Reproducir Música</span>';
        }
    }
}

// 7. LIGHTBOX FOTOS
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

window.onclick = function(event) {
    const modalCarta = document.getElementById("modal-carta");
    if (event.target == modalCarta) {
        modalCarta.style.display = "none";
    }
}

// INICIALIZACIÓN GENERAL
document.addEventListener("DOMContentLoaded", () => {
    evaluarPantallaCumpleanios();
    const mesesCumplidos = actualizarContador();
    cargarContenidoMensual(mesesCumplidos);
    setInterval(actualizarContador, 1000);
});


function actualizarCuentaRegresivaCumple() {
    const ahora = new Date();
    const añoActual = ahora.getFullYear();
    // El mes de Junio es el índice 5 en JavaScript (0 = Enero, 11 = Diciembre)
    let fechaCumple = new Date(añoActual, 5, 28, 0, 0, 0);

    // Si el cumpleaños de este año ya pasó, calcula para el próximo año
    if (ahora > fechaCumple) {
        fechaCumple.setFullYear(añoActual + 1);
    }

    const diferencia = fechaCumple - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('cumple-dias').innerText = dias.toString().padStart(2, '0');
    document.getElementById('cumple-horas').innerText = horas.toString().padStart(2, '0');
    document.getElementById('cumple-min').innerText = minutos.toString().padStart(2, '0');
    document.getElementById('cumple-seg').innerText = segundos.toString().padStart(2, '0');
}

// Ejecutar cada segundo
setInterval(actualizarCuentaRegresivaCumple, 1000);
// Ejecutar inmediatamente al cargar la página
actualizarCuentaRegresivaCumple();
