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