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
    const temaGuardado = localStorage.getItem('tema');
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (temaGuardado) {
        aplicarTema(temaGuardado);
    } else if (prefiereOscuro) {
        aplicarTema('oscuro');
    } else {
        aplicarTema('claro');
    }

    // Scroll Animation Setup with Continuous Intersection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-section');
            } else {
                entry.target.classList.remove('animated-section');
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    const sectionsToAnimate = document.querySelectorAll('#about, #projects, #skills, #contact');
    sectionsToAnimate.forEach(section => {
        section.classList.add('pre-animate');
        sectionObserver.observe(section);
    });
});
