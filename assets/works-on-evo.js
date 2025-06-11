
// Работает на Эво

// Фильтры
function initFilters() {
  document.querySelectorAll('.filter').forEach(filter => {
    const filterName = filter.querySelector('.filter-name');
    const textEl = filter.querySelector('p');
    const options = filter.querySelectorAll('.filter-option');
    const resetBtn = filter.querySelector('.reset-filter');

    const defaultText = textEl.textContent;

    // Клик по заголовку
    filterName.addEventListener('click', (e) => {
      // Игнорировать клик по кресту
      if (e.target === resetBtn) return;

      const isOpen = filter.classList.contains('open');

      // Закрыть все фильтры
      document.querySelectorAll('.filter.open').forEach(f => f.classList.remove('open'));

      if (!isOpen) {
        filter.classList.add('open');
      }
    });

    // Клик по опции
    options.forEach(option => {
      option.addEventListener('click', () => {
        textEl.textContent = option.textContent;
        filter.classList.remove('open');
        filter.classList.add('selected'); 
      });
    });

    // Клик по крестику
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      textEl.textContent = defaultText;
      filter.classList.remove('selected');
    });
  });

  // Клик из вне фильтров закрывает их
  
  document.addEventListener('click', function (event) {
    const isClickInsideFilter = event.target.closest('.filter');

    if (!isClickInsideFilter) {
      // Закрываем все открытые фильтры
      document.querySelectorAll('.filter.open').forEach(f => {
        f.classList.remove('open');
      });
    }
  });
}

function initBanners() {
    document.querySelectorAll('.case-banners-wrapper').forEach(wrapper => {
    const banners = wrapper.querySelector('.case-banners');
    const toggle  = wrapper.querySelector('.case-banner-toggle');

    let isExpanded = false;

    // Функция для получения высоты свернутого состояния
    function getCollapsedHeight() {
        const firstBanner = banners.querySelector('.case-banner');
        return firstBanner ? firstBanner.offsetHeight : 30;
    }

    // Установка высоты в зависимости от состояния
    function updateMaxHeight() {
        const collapsedHeight = getCollapsedHeight();

        if (isExpanded) {
        banners.style.maxHeight = banners.scrollHeight + 'px';
        } else {
        banners.style.maxHeight = collapsedHeight + 'px';
        }

        if (banners.scrollHeight > collapsedHeight) {
        toggle.style.display = 'block';
        } else {
        toggle.style.display = 'none';
        }
    }

    updateMaxHeight();

    // Обработка клика
    toggle.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();

        isExpanded = !isExpanded;
        toggle.classList.toggle('active', isExpanded);
        updateMaxHeight();
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        clearTimeout(wrapper._resizeTimeout);
        wrapper._resizeTimeout = setTimeout(() => {
        updateMaxHeight();
        }, 100);
    });
    });
}


// Вызовы функций

initFilters(); 
initBanners(); 