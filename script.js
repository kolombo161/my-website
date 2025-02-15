// Smooth scroll для ссылок
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Валидация формы
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function (event) {
        const nameInput = form.querySelector('input[type="text"]');
        const phoneInput = form.querySelector('input[type="tel"]');

        if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
            event.preventDefault(); // Предотвращаем отправку формы
            alert('Пожалуйста, заполните все поля!');
        } else {
            // Если форма валидна, можно добавить дополнительные действия (например, AJAX)
            console.log('Форма успешно отправлена!');
        }
    });
}

// Функция для проверки, прошло ли 3-4 секунды
let isTimeoutPassed = false;
setTimeout(() => {
    isTimeoutPassed = true;
}, 4000); // 4 секунды

// Обработка прокрутки для кнопки "Позвонить" (35%)
window.addEventListener('scroll', function() {
    const callButton = document.getElementById('callButton');
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Показывать кнопку только после 4 секунд и при прокрутке на 35%
    if (isTimeoutPassed && scrollPercentage > 35) {
        callButton.classList.add('visible');
    } else {
        callButton.classList.remove('visible');
    }
});

// Функция для скрытия кнопки
function hideCallButton() {
    const callButton = document.getElementById('callButton');
    callButton.classList.remove('visible');
}

// Кнопка "Наверх"
const scrollToTopButton = document.querySelector('.scroll-to-top');

// Показать/скрыть кнопку при прокрутке
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollPosition > pageHeight * 0.7) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Обработка клика на кнопку "Наверх"
scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Управление навигацией на мобильных устройствах
const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Закрываем навигацию при клике вне её области
document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
        nav.classList.remove('active');
    }
});

// Выбираем все карточки .service-card
const serviceCards = document.querySelectorAll('.service-card');

// Функция для изменения освещения
function updateLighting() {
    serviceCards.forEach(card => {
        const scrollTop = window.scrollY; // Текущая позиция скролла
        const cardPosition = card.getBoundingClientRect().top + scrollTop; // Позиция блока относительно верха страницы

        // Рассчитываем новую горизонтальную позицию света
        let lightPositionX = (scrollTop - cardPosition) / 5; // Коэффициент 5 для скорости движения
        lightPositionX = Math.min(Math.max(lightPositionX, 0), 100); // Ограничение от 0 до 100%

        // Обновляем CSS-переменную для каждого блока
        card.style.setProperty('--light-position-x', `${lightPositionX}%`);
    });
}

// Обновляем освещение при скролле
window.addEventListener('scroll', updateLighting);

// Инициализируем освещение при загрузке страницы
updateLighting();

// Чтобы кнопка "Вверх" работала при нажатии "Enter" или "Space"
// Обработчик клика
document.querySelector('.scroll-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Обработчик клавиш Enter и Space
document.querySelector('.scroll-to-top').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Предотвращаем стандартное поведение
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка наверх
    }
});
