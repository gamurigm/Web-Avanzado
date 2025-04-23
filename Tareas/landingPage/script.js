const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');

// Función para aplicar el tema
const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
        themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
    } else {
        body.classList.remove('dark-mode');
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
        themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
};

// Función para cambiar el tema y guardarlo
const toggleTheme = () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme); // Guardar preferencia
};

// Event Listener para el botón
themeToggle.addEventListener('click', toggleTheme);

// Cargar el tema guardado al iniciar o detectar preferencia del sistema
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

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

// (Opcional) Escuchar cambios en la preferencia del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    // Solo cambiar si no hay preferencia guardada explícitamente por el usuario
    if (!localStorage.getItem('theme')) {
        applyTheme(event.matches ? 'dark' : 'light');
    }
});