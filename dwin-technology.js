// Кнопка "Наверх"- улучшенная версия
const scrollToTopBtn = document.getElementById('scrollToTop');
// Показываем/скрываем кнопку при скролле
function toggleScrollButton() {
  // Используем window.scrollY вместо pageYOffset для лучшей совместимости
  if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
}

// Слушаем события скролла
window.addEventListener('scroll', toggleScrollButton);

// Также проверяем при загрузке страницы
document.addEventListener('DOMContentLoaded', toggleScrollButton);

// Плавный скролл наверх при клике
scrollToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Добавляем поддержку touch событий для мобильных
scrollToTopBtn.addEventListener('touchstart', function (e) {
  e.preventDefault(); // Предотвращаем двойное срабатывание
  this.style.transform = 'translateY(-1px)';
});

scrollToTopBtn.addEventListener('touchend', function () {
  this.style.transform = '';
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
