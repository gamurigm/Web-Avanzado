const botonTema = document.getElementById('theme-toggle');
const cuerpo = document.body;
const iconoSol = botonTema.querySelector('.fa-sun');
const iconoLuna = botonTema.querySelector('.fa-moon');

const aplicarTema = (tema) => {
    if (tema === 'oscuro') {
        cuerpo.classList.add('dark-mode');
        iconoSol.style.display = 'none';
        iconoLuna.style.display = 'inline';
    } else {
        cuerpo.classList.remove('dark-mode');
        iconoSol.style.display = 'inline';
        iconoLuna.style.display = 'none';
    }
};

const cambiarTema = () => {
    const temaActual = cuerpo.classList.contains('dark-mode') ? 'claro' : 'oscuro';
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
    }

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark'); // Aplicar tema oscuro si es la preferencia del sistema y no hay nada guardado
    } else {
        applyTheme('light'); // Por defecto, tema claro
    }

    // Scroll Animation Setup with Continuous Intersection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class everytime the section becomes visible
                entry.target.classList.add('animated-section');
                // Do not unobserve, allowing repeated animations
            } else {
                // Remove animation class when section is not in view
                entry.target.classList.remove('animated-section');
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    // Select all sections to animate
    const sectionsToAnimate = document.querySelectorAll('#about, #projects, #skills, #contact');
    sectionsToAnimate.forEach(section => {
        section.classList.add('pre-animate'); // Prepare for animation
        sectionObserver.observe(section);
    });
});

