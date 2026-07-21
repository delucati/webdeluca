// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Deluca frontend inicializado correctamente.');

    const captchaQuestion = document.getElementById('captcha-question');
    const captchaAnswer = document.getElementById('captcha-answer');
    const captchaRefresh = document.getElementById('captcha-refresh');
    const captchaError = document.getElementById('captcha-error');
    const form = document.querySelector('form');

    if (captchaQuestion && form) {
        let a, b, answer;

        function generateCaptcha() {
            a = Math.floor(Math.random() * 20) + 1;
            b = Math.floor(Math.random() * 20) + 1;
            answer = a + b;
            captchaQuestion.textContent = a + ' + ' + b;
            captchaAnswer.value = '';
            captchaError.style.display = 'none';
        }

        generateCaptcha();

        captchaRefresh.addEventListener('click', generateCaptcha);

        form.addEventListener('submit', function (e) {
            const input = parseInt(captchaAnswer.value, 10);
            if (input !== answer) {
                e.preventDefault();
                generateCaptcha();
                captchaError.style.display = 'block';
            } else {
                captchaError.style.display = 'none';
            }
        });
    }
});