const botonTema = document.getElementById('theme-toggle');
const cuerpo = document.body;
const iconoSol = botonTema.querySelector('.fa-sun');
const iconoLuna = botonTema.querySelector('.fa-moon');

const aplicarTema = (tema) => {
    if (tema === 'oscuro') {
        cuerpo.classList.add('modo-oscuro');
        iconoSol.style.display = 'none';
        iconoLuna.style.display = 'inline';
        botonTema.setAttribute('aria-label', 'Cambiar a tema claro');
    } else {
        cuerpo.classList.remove('modo-oscuro');
        iconoSol.style.display = 'inline';
        iconoLuna.style.display = 'none';
        botonTema.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
};

const cambiarTema = () => {
    const temaActual = cuerpo.classList.contains('modo-oscuro') ? 'claro' : 'oscuro';
    aplicarTema(temaActual);
    localStorage.setItem('tema', temaActual);
};

botonTema.addEventListener('click', cambiarTema);

document.addEventListener('DOMContentLoaded', () => {
    // Tema
    const temaGuardado = localStorage.getItem('tema');
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (temaGuardado) {
        aplicarTema(temaGuardado);
    } else if (prefiereOscuro) {
        aplicarTema('oscuro');
    } else {
        aplicarTema('claro');
    }

    // Animaciones
    const opcionesObservador = {
        root: null,
        rootMargin: '-20% 0px',
        threshold: 0.1
    };

    const animarAlDesplazar = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                
                // Animar tarjetas si es la sección proyectos
                if (entrada.target.id === 'proyectos') {
                    const tarjetas = entrada.target.querySelectorAll('.tarjeta-proyecto');
                    tarjetas.forEach((tarjeta, index) => {
                        setTimeout(() => {
                            tarjeta.classList.add('visible');
                        }, index * 150);
                    });
                }
            }
        });
    };

    const observador = new IntersectionObserver(animarAlDesplazar, opcionesObservador);

    // Observar todas las secciones
    document.querySelectorAll('section').forEach(seccion => {
        observador.observe(seccion);
    });
});
