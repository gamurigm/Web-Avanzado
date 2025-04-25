const botonTema = document.getElementById('theme-toggle');
const cuerpo = document.body;
const iconoSol = botonTema.querySelector('.fa-sun');
const iconoLuna = botonTema.querySelector('.fa-moon');

const aplicarTema = (tema) => {
    if (tema === 'oscuro') {
        cuerpo.classList.add('modo-oscuro');
        iconoSol.style.display = 'none';
        iconoLuna.style.display = 'inline';
       
    } else {
        cuerpo.classList.remove('modo-oscuro');
        iconoSol.style.display = 'inline';
        iconoLuna.style.display = 'none';

    }
};

const cambiarTema = () => {
    const temaActual = cuerpo.classList.contains('modo-oscuro') ? 'claro' : 'oscuro';
    aplicarTema(temaActual);
    localStorage.setItem('tema', temaActual);
};

botonTema.addEventListener('click', cambiarTema);

document.addEventListener('DOMContentLoaded', () => {
    const opcionesObservador = {
        root: null,           // Viewport como raíz
        rootMargin: '-20% 0px', // Margen de activación
        threshold: 0.1        // Porcentaje visibilidad
    };

    const animarAlDesplazar = (entradas, observador) => {
        entradas.forEach(entrada => {
            // Añadir o remover clase según visibilidad
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
            } else {
                // Remover clase cuando no está visible
                entrada.target.classList.remove('visible');
                
                // Remover clase de las tarjetas si es la sección proyectos
                if (entrada.target.id === 'proyectos') {
                    const tarjetas = entrada.target.querySelectorAll('.tarjeta-proyecto');
                    tarjetas.forEach(tarjeta => {
                        tarjeta.classList.remove('visible');
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
