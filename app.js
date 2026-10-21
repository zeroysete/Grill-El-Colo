// JavaScript para Gril El Colo

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar iconos Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Control de menú móvil
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Cerrar menú móvil al hacer click
  window.closeMenu = function() {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
  };

  // 3. Filtro interactivo de la carta (MUESTRA ÚNICAMENTE LA CATEGORÍA SELECCIONADA)
  const filterButtons = document.querySelectorAll('.menu-tab-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 3.1. Cambiar aspecto visual de las pestañas
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-brand-red', 'text-white', 'shadow-sm');
        b.classList.add('bg-stone-200', 'text-stone-700');
      });

      btn.classList.add('active', 'bg-brand-red', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-stone-200', 'text-stone-700');

      // 3.2. Filtrar items: Muestra SOLO la categoría seleccionada
      const selectedCategory = btn.getAttribute('data-category');

      menuItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');

        if (selectedCategory === 'todos' || itemCat === selectedCategory) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          item.classList.add('hidden');
        }
      });
    });
  });

  // 4. Indicador dinámico de estado en tiempo real
  function evaluateOpenStatus() {
    const now = new Date();
    const day = now.getDay(); // 0: Dom, 1: Lun, 2: Mar, 3: Mie, 4: Jue, 5: Vie, 6: Sab
    const minutes = now.getHours() * 60 + now.getMinutes();

    let isOpen = false;
    let label = "";

    if (day === 1 && minutes < 60) {
      isOpen = true;
      label = "Abierto ahora (cierra 01:00 a.m.)";
    } else if (day >= 3 && day <= 6 && minutes < 30) {
      isOpen = true;
      label = "Abierto ahora (cierra 00:30 a.m.)";
    } else if (day === 0 && minutes < 60) {
      isOpen = true;
      label = "Abierto ahora (cierra 01:00 a.m.)";
    } else if (day === 1) {
      isOpen = false;
      label = "Cerrado hoy lunes (abre martes 06:30 a.m.)";
    } else if (day >= 2 && day <= 5) {
      if (minutes >= 390) {
        isOpen = true;
        label = "Abierto ahora (cierra 00:30 a.m.)";
      } else {
        isOpen = false;
        label = "Cerrado ahora (abre hoy 06:30 a.m.)";
      }
    } else if (day === 6 || day === 0) {
      if (minutes >= 420) {
        isOpen = true;
        label = "Abierto ahora (cierra 01:00 a.m.)";
      } else {
        isOpen = false;
        label = "Cerrado ahora (abre hoy 07:00 a.m.)";
      }
    }

    const statusPill = document.getElementById('live-status-pill');
    if (statusPill) {
      if (isOpen) {
        statusPill.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ${label}`;
        statusPill.className = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800";
      } else {
        statusPill.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span> ${label}`;
        statusPill.className = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-900 text-amber-300 border border-stone-700";
      }
    }

    const scheduleCardBadge = document.getElementById('schedule-card-badge');
    if (scheduleCardBadge) {
      if (isOpen) {
        scheduleCardBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Abierto ahora`;
        scheduleCardBadge.className = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300";
      } else {
        scheduleCardBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500"></span> Cerrado ahora`;
        scheduleCardBadge.className = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300";
      }
    }
  }

  evaluateOpenStatus();
});