document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "#ffffff";
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      header.style.background = "rgba(255,255,255,0.95)";
      header.style.boxShadow = "var(--shadow-light)";
    }
  });

  // Mobile nav toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Dropdown filter
  const filterBar = document.getElementById('filterBar');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const selectedFilter = document.getElementById('selectedFilter');
  const cardCount = document.getElementById('cardCount');
  const cards = document.querySelectorAll('.nurse-card');

  filterBar.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
    filterBar.classList.toggle('active');
  });

  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedFilter.textContent = item.textContent.trim();
      dropdownMenu.classList.remove('show');

      const filter = item.getAttribute('data-filter');
      let visibleCount = 0;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.specialty === filter) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      cardCount.textContent = visibleCount;
    });
  });

  // Horizontal scroll buttons
  const scrollLeft = document.getElementById('scrollLeft');
  const scrollRight = document.getElementById('scrollRight');
  const cardsWrapper = document.getElementById('cardsWrapper');

  scrollLeft.addEventListener('click', () => cardsWrapper.scrollBy({ left: -300, behavior: 'smooth' }));
  scrollRight.addEventListener('click', () => cardsWrapper.scrollBy({ left: 300, behavior: 'smooth' }));
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!filterBar.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove('show');
    filterBar.classList.remove('active');
  }
});
