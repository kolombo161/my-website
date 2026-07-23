// ============================================
// 1. АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ ДАТЫ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('update-date');
    if (dateElement) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        dateElement.textContent = `${day}.${month}.${year}`;
    }
});

// ============================================
// 2. ФУНКЦИЯ ПОИСКА ПО ТАБЛИЦАМ
// ============================================
function searchTables() {
    // Создаем поле ввода, если его ещё нет
    let searchInput = document.getElementById('table-search');
    if (!searchInput) {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            margin: 20px 0 30px;
            text-align: center;
        `;
        
        searchInput = document.createElement('input');
        searchInput.id = 'table-search';
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Поиск по таблицам...';
        searchInput.style.cssText = `
            padding: 12px 20px;
            width: 100%;
            max-width: 500px;
            font-size: 1rem;
            border: 2px solid #4ecdc4;
            border-radius: 8px;
            background: #fff;
            transition: all 0.3s ease;
        `;
        
        // Адаптация под темную тему
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) {
            searchInput.style.background = '#1e1e2e';
            searchInput.style.color = '#e9ecef';
        }
        
        searchContainer.appendChild(searchInput);
        
        // Вставляем после вступления, перед первой таблицей
        const intro = document.querySelector('.intro');
        if (intro && intro.nextSibling) {
            intro.parentNode.insertBefore(searchContainer, intro.nextSibling);
        } else {
            document.querySelector('main').prepend(searchContainer);
        }
        
        // Событие ввода
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const allRows = document.querySelectorAll('.python-table tbody tr');
            let visibleCount = 0;
            
            allRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Показываем/скрываем подписи к таблицам
            document.querySelectorAll('.table-section').forEach(section => {
                const visibleRows = section.querySelectorAll('.python-table tbody tr[style*="display: none"]');
                const totalRows = section.querySelectorAll('.python-table tbody tr').length;
                const hasVisible = visibleRows.length < totalRows;
                
                // Скрываем всю секцию, если в ней нет видимых строк
                if (query !== '' && !hasVisible) {
                    section.style.display = 'none';
                } else {
                    section.style.display = '';
                }
            });
        });
    }
}

// ============================================
// 3. ФУНКЦИЯ ДЛЯ КОПИРОВАНИЯ ПРИМЕРОВ (опционально)
// ============================================
function addCopyButtons() {
    document.querySelectorAll('.python-table td code').forEach(codeBlock => {
        // Добавляем кнопку копирования только для длинных примеров
        if (codeBlock.textContent.length > 20) {
            const td = codeBlock.closest('td');
            if (td && !td.querySelector('.copy-btn')) {
                const btn = document.createElement('button');
                btn.textContent = '📋';
                btn.className = 'copy-btn';
                btn.style.cssText = `
                    margin-left: 8px;
                    padding: 2px 6px;
                    font-size: 0.7rem;
                    background: #4ecdc4;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.2s;
                `;
                btn.title = 'Копировать пример';
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const text = codeBlock.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        btn.textContent = '✅';
                        setTimeout(() => { btn.textContent = '📋'; }, 1500);
                    }).catch(() => {
                        // fallback
                        const range = document.createRange();
                        range.selectNode(codeBlock);
                        window.getSelection().removeAllRanges();
                        window.getSelection().addRange(range);
                        document.execCommand('copy');
                        btn.textContent = '✅';
                        setTimeout(() => { btn.textContent = '📋'; }, 1500);
                    });
                });
                td.appendChild(btn);
            }
        }
    });
}

// ============================================
// 4. ЗАПУСК ВСЕГО ПРИ ЗАГРУЗКЕ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    searchTables();
    addCopyButtons();
    
    console.log('🐍 Python шпаргалка загружена!');
    console.log('📊 Таблицы готовы к использованию.');
});

// ============================================
// 5. ПЕРЕСОЗДАНИЕ КНОПОК ПРИ ДИНАМИЧЕСКИХ ИЗМЕНЕНИЯХ
// ============================================
// На случай, если таблицы будут обновляться через JS
const observer = new MutationObserver(function() {
    addCopyButtons();
});
observer.observe(document.body, { childList: true, subtree: true });