// ==========================================
// NAVAJA STUDIO - AUTENTICACIÓN
// ==========================================

const supabaseClient = window.supabaseClient;

// Mostrar mensajes en los formularios
function showAuthMessage(elementId, message, type) {
    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = message;
    element.className = `auth-message ${type}`;
    element.style.display = "block";
}

// ==========================================
// REGISTRO DE USUARIOS
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const acceptTerms = document.getElementById("acceptTerms").checked;

        if (!nombre || !email || !password || !confirmPassword) {
            showAuthMessage("registerMessage", "Completa todos los campos.", "error");
            return;
        }

        if (password.length < 8) {
            showAuthMessage("registerMessage", "La contraseña debe tener al menos 8 caracteres.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showAuthMessage("registerMessage", "Las contraseñas no coinciden.", "error");
            return;
        }

        if (!acceptTerms) {
            showAuthMessage("registerMessage", "Debes aceptar los términos y condiciones.", "error");
            return;
        }

        const button = registerForm.querySelector('button[type="submit"]');
        if (button) button.disabled = true;

        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        nombre: nombre
                    }
                }
            });

            if (error) throw error;

            if (data.session) {
                showAuthMessage(
                    "registerMessage",
                    "¡Cuenta creada correctamente! Ya puedes iniciar sesión.",
                    "success"
                );
            } else {
                showAuthMessage(
                    "registerMessage",
                    "Cuenta creada. Revisa tu correo para confirmar el registro.",
                    "success"
                );
            }

            registerForm.reset();

        } catch (error) {
            showAuthMessage("registerMessage", error.message, "error");
        } finally {
            if (button) button.disabled = false;
        }
    });
}

// ==========================================
// INICIO DE SESIÓN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            showAuthMessage("loginMessage", "Ingresa tu correo y contraseña.", "error");
            return;
        }

        const button = loginForm.querySelector('button[type="submit"]');
        if (button) button.disabled = true;

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            showAuthMessage(
                "loginMessage",
                "¡Inicio de sesión correcto!",
                "success"
            );

            console.log("Usuario autenticado:", data.user.id);

        } catch (error) {
            showAuthMessage("loginMessage", error.message, "error");
        } finally {
            if (button) button.disabled = false;
        }
    });
}

// ==========================================
// MOSTRAR Y OCULTAR CONTRASEÑAS
// ==========================================

document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
        const input = button.parentElement.querySelector("input");

        if (!input) return;

        input.type = input.type === "password" ? "text" : "password";
    });
});

console.log("Navaja Studio: autenticación preparada.");