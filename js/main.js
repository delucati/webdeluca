// js/main.js
// --- 3. LÓGICA DEL FORMULARIO, CAPTCHA Y REDIRECCIÓN ---
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswerInput = document.getElementById('captcha-answer');
const captchaRefresh = document.getElementById('captcha-refresh');
const captchaError = document.getElementById('captcha-error');

let expectedAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    expectedAnswer = num1 + num2;
    if (captchaQuestion) captchaQuestion.textContent = `${num1} + ${num2}`;
    if (captchaAnswerInput) captchaAnswerInput.value = '';
    if (captchaError) captchaError.style.display = 'none';
    if (captchaAnswerInput) captchaAnswerInput.classList.remove('border-red-500');
}

generateCaptcha();

if (captchaRefresh) {
    captchaRefresh.addEventListener('click', generateCaptcha);
}

if (form) {
    form.addEventListener('submit', function(e) {
        // 1. Evita cualquier comportamiento nativo
        e.preventDefault(); 
        
        const userAnswer = parseInt(captchaAnswerInput.value, 10);
        
        // 2. VALIDACIÓN DEL CAPTCHA MATEMÁTICO
        if (userAnswer !== expectedAnswer) {
            captchaError.style.display = 'block';
            captchaAnswerInput.classList.add('border-red-500');
            return; // Corta la ejecución, no envía el correo
        } 
        
        // 3. PREPARACIÓN DEL ENVÍO (Si el captcha es correcto)
        captchaError.style.display = 'none';
        captchaAnswerInput.classList.remove('border-red-500');

        const formData = new FormData(form);
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;

        // 4. ENVÍO SILENCIOSO A FORMSUBMIT
        // (AQUÍ ES DONDE DEBES PONER TU CORREO REAL)
        fetch("https://formsubmit.co/ajax/hola@dlmomentum.com.mx", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 5. REDIRECCIÓN A LA PÁGINA DE GRACIAS
                window.location.href = 'gracias.html';
            } else {
                throw new Error('Error en el envío');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.innerHTML = 'Error al enviar ❌';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA MÚLTIPLES REPRODUCTORES DE VIDEO ---
    // Buscamos todos los contenedores de video en la página
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('.js-video');
        const playPauseBtn = container.querySelector('.js-play-btn');
        const muteBtn = container.querySelector('.js-mute-btn');
        
        const iconPlay = container.querySelector('.js-icon-play');
        const iconPause = container.querySelector('.js-icon-pause');
        const iconMuted = container.querySelector('.js-icon-muted');
        const iconUnmuted = container.querySelector('.js-icon-unmuted');

        // Si por alguna razón no encuentra el video, saltamos al siguiente
        if (!video) return;

        // Función para alternar Play y Pausa de ESTE video en particular
        function togglePlay() {
            if (video.paused || video.ended) {
                if (video.ended) {
                    video.currentTime = 0; 
                }
                video.play();
            } else {
                video.pause();
            }
        }

        playPauseBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        // Eventos del video
        video.addEventListener('play', () => {
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        });

        video.addEventListener('pause', () => {
            iconPause.classList.add('hidden');
            iconPlay.classList.remove('hidden');
        });

        // Botón de mute
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                iconUnmuted.classList.add('hidden');
                iconMuted.classList.remove('hidden');
            } else {
                iconMuted.classList.add('hidden');
                iconUnmuted.classList.remove('hidden');
            }
        });
    });
    // ----------------------------------------------------

    // --- 2. LÓGICA DE MÁQUINA DE ESCRIBIR (SCROLL DINÁMICO) ---
    const typewriterElement = document.getElementById('typewriter-h2');
    const typewriterSection = document.getElementById('quienes-somos-section');

    if (typewriterElement && typewriterSection) {
        // Limpia saltos de línea y prepara los spans
        const text = typewriterElement.textContent.replace(/\s+/g, ' ').trim();
        typewriterElement.innerHTML = ''; 

        const spans = [];
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.color = '#cbd5e1'; // Gris apagado inicial
            span.style.transition = 'color 0.3s ease-out';
            typewriterElement.appendChild(span);
            spans.push(span);
        });

        const totalChars = spans.length;

        window.addEventListener('scroll', () => {
            const rect = typewriterSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Empieza a animarse cuando el 40% de la pantalla llega a la sección
            // Termina cuando llega al 10%
            const startPoint = windowHeight * 0.40; 
            const endPoint = windowHeight * 0.10;
            
            let progress = (startPoint - rect.top) / (startPoint - endPoint);
            progress = Math.max(0, Math.min(1, progress));
            
            const charsToColor = Math.floor(progress * (totalChars));

            spans.forEach((span, index) => {
                if (index < charsToColor) {
                    span.style.color = '#741399'; // Pintado: brand-dark
                } else {
                    span.style.color = '#cbd5e1'; // Despintado: Gris
                }
            });
        });
        
        // Forzamos un cálculo al iniciar por si el usuario recarga la página a mitad del scroll
        window.dispatchEvent(new Event('scroll'));
    }

});