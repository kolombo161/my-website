// Smooth scroll для ссылок
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
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

// Функция для проверки, прошло ли 5 секунд
let isTimeoutPassed = false;
setTimeout(() => {
  isTimeoutPassed = true;
}, 5000); // 5 секунд

// Обработка прокрутки для кнопки "Позвонить" (35%)
window.addEventListener('scroll', function () {
  const callButton = document.getElementById('callButton');
  const scrollPercentage =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;

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
    behavior: 'smooth',
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

// Чтобы кнопка "Вверх" работала при нажатии "Enter" или "Space"
document.querySelector('.scroll-to-top').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); // Предотвращаем стандартное поведение
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка наверх
  }
});

// Динамическое позиционирование подсказок
document.querySelectorAll('.tooltip').forEach((tooltip) => {
  const tooltipText = tooltip.querySelector('.tooltiptext');

  tooltip.addEventListener('mouseenter', () => {
    const rect = tooltipText.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Сброс классов позиционирования
    tooltipText.classList.remove(
      'top-out',
      'left-out',
      'right-out',
      'bottom-out'
    );

    // Проверка, выходит ли подсказка за пределы экрана
    if (rect.top < 0) {
      tooltipText.classList.add('bottom-out'); // Показываем подсказку снизу
    }

    if (rect.left < 0) {
      tooltipText.classList.add('left-out'); // Смещаем подсказку вправо
    }

    if (rect.right > viewportWidth) {
      tooltipText.classList.add('right-out'); // Смещаем подсказку влево
    }

    // Если подсказка снизу тоже выходит за пределы экрана, возвращаем её наверх
    if (tooltipText.classList.contains('bottom-out')) {
      const bottomRect = tooltipText.getBoundingClientRect();
      if (bottomRect.bottom > viewportHeight) {
        tooltipText.classList.remove('bottom-out');
        tooltipText.classList.add('top-out'); // Возвращаем подсказку наверх
      }
    }

    // Автоматически подстраиваем ширину подсказки под текст
    tooltipText.style.whiteSpace = 'nowrap'; // Сначала проверяем без переноса
    const textWidth = tooltipText.scrollWidth;

    if (textWidth > viewportWidth * 0.8) {
      tooltipText.style.whiteSpace = 'normal'; // Переносим текст на новую строку
      tooltipText.style.maxWidth = '200px'; // Уменьшаем ширину
    } else {
      tooltipText.style.maxWidth = 'none'; // Восстанавливаем стандартную ширину
    }
  });

  // Скрываем подсказку при уходе курсора
  tooltip.addEventListener('mouseleave', () => {
    tooltipText.style.whiteSpace = 'nowrap'; // Восстанавливаем стандартное поведение
    tooltipText.style.maxWidth = 'none'; // Восстанавливаем стандартную ширину
  });
});

// Функционал полноэкранного просмотра изображений
const overlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.querySelector('.fullscreen-image');
const imageTitle = document.querySelector('.image-title');
const closeBtn = document.querySelector('.close-btn');
const serviceCards = document.querySelectorAll('.service-card');
const imageContainer = document.querySelector('.image-container');

let currentImageIndex = 0;
let currentImages = [];
let currentTitles = [];

let autoSlideInterval;

// Открытие полноэкранного просмотра
serviceCards.forEach((card) => {
  const mainImage = card.querySelector('.service-image img.main-image');
  const additionalImages = card.querySelectorAll(
    '.service-image .additional-images img'
  );

  mainImage.addEventListener('click', () => {
    // Собираем все изображения из текущей карточки
    currentImages = [
      mainImage.src,
      ...Array.from(additionalImages).map((img) => img.src),
    ];
    currentTitles = [card.querySelector('.service-title h3').textContent];
    currentImageIndex = 0;

    updateFullscreenImage();
    overlay.style.display = 'flex';
    startAutoSlide(); // Запускаем автоматическое переключение
  });
});

// Закрытие полноэкранного просмотра
function closeOverlay() {
  overlay.style.display = 'none';
  stopAutoSlide(); // Останавливаем автоматическое переключение
}

// Закрытие при клике на пустое место (рамку) вокруг изображения
imageContainer.addEventListener('click', (e) => {
  if (e.target === imageContainer || e.target === fullscreenImage) {
    closeOverlay();
  }
});

// Закрытие при клике на крестик или вне окна
overlay.addEventListener('click', (e) => {
  if (e.target === overlay || e.target === closeBtn) {
    closeOverlay();
  }
});

// Закрытие при нажатии на Esc, Enter или пробел
document.addEventListener('keydown', (e) => {
  if (
    overlay.style.display === 'flex' &&
    (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')
  ) {
    closeOverlay();
  }
});

// Переключение изображений
function updateFullscreenImage() {
  fullscreenImage.src = currentImages[currentImageIndex];
  imageTitle.textContent = currentTitles[0]; // Используем заголовок карточки
}

// Навигация по изображениям с помощью стрелок клавиатуры
document.addEventListener('keydown', (e) => {
  if (overlay.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  }
});

// Переключение на следующее изображение
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  updateFullscreenImage();
}

// Переключение на предыдущее изображение
function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  updateFullscreenImage();
}

// Автоматическое переключение изображений
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextImage();
  }, 3000); // Переключение каждые 3 секунды
}

// Остановка автоматического переключения
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Обработка жестов на мобильных устройствах
let touchStartX = 0;
let touchEndX = 0;

imageContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

imageContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Минимальная дистанция для срабатывания жеста
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    prevImage(); // Свайп вправо
  } else if (swipeDistance < -swipeThreshold) {
    nextImage(); // Свайп влево
  }
}
