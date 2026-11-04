
/* =========================================
   NAVAJA STUDIO - FUNCIONES JAVASCRIPT
   ========================================= */

/* 1. Selección de elementos HTML */

const navbar = document.getElementById("mainNavbar");

const backToTop = document.getElementById("backToTop");

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


/* 2. Evento de desplazamiento (Scroll) */

window.addEventListener("scroll", function () {

    const scrollPosition = window.scrollY;

    // Modificar la apariencia del navbar
    if (scrollPosition > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Mostrar u ocultar el botón volver arriba
    if (scrollPosition > 350) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


/* 3. Botón volver arriba */

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* 4. Cerrar menú móvil después de seleccionar una sección */

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

const navbarMenu = document.getElementById("navbarMenu");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbarMenu.classList.contains("show")) {

            const menu = bootstrap.Collapse.getOrCreateInstance(navbarMenu);

            menu.hide();

        }

    });

});


/* 5. Validación del formulario de contacto */

contactForm.addEventListener("submit", function (event) {

    // Evitar el envío tradicional del formulario
    event.preventDefault();

    // Comprobar los campos obligatorios
    if (!contactForm.checkValidity()) {

        contactForm.classList.add("was-validated");

        formMessage.textContent =
            "Por favor, completa correctamente todos los campos.";

        formMessage.className = "mt-3 text-danger";

        return;

    }

    // Obtener los datos ingresados
    const name = document.getElementById("name").value.trim();

    // Mostrar mensaje dinámico
    formMessage.textContent =
        `¡Gracias, ${name}! Tu formulario fue validado correctamente.`;

    formMessage.className = "mt-3 text-success";

    // Limpiar formulario
    contactForm.reset();

    contactForm.classList.remove("was-validated");

});
