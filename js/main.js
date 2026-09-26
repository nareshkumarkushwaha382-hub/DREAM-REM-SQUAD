/* ==========================================================================
   DREAM REM SQUAD (DRS) - Main Vanilla JavaScript
   Handles Mobile Navigation, Spoiler Reveals, Gallery Filters/Search, 
   Lightbox Modals, and Back-to-Top Button Behavior.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Mobile Navigation Toggle */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close mobile menu when clicking outside or selecting a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* 2. Back-to-Top Button Logic */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* 3. Fan Art Gallery Filtering & Search */
  const filterButtons = document.querySelectorAll('#filter-buttons button');
  const artCards = document.querySelectorAll('.art-card');
  const artSearchInput = document.getElementById('art-search');

  function filterGallery() {
    const activeFilterBtn = document.querySelector('#filter-buttons button.active');
    const currentCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    const searchQuery = artSearchInput ? artSearchInput.value.toLowerCase().trim() : '';

    artCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.getAttribute('data-title').toLowerCase();
      const artist = card.getAttribute('data-artist').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = (title.includes(searchQuery) || artist.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterGallery();
      });
    });
  }

  if (artSearchInput) {
    artSearchInput.addEventListener('input', filterGallery);
  }

  /* 4. Lightbox Modal Behavior for Fan Art */
  const artModal = document.getElementById('art-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalArtist = document.getElementById('modal-artist');
  const modalSource = document.getElementById('modal-source');

  if (artModal && artCards.length > 0) {
    artCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const artist = card.getAttribute('data-artist');
        const source = card.getAttribute('data-source');

        if (modalTitle) modalTitle.textContent = title;
        if (modalArtist) modalArtist.textContent = `Artist: ${artist}`;
        if (modalSource) modalSource.textContent = `Source / Credit: ${source}`;

        artModal.classList.add('active');
      });
    });

    const closeModalFunc = () => {
      artModal.classList.remove('active');
    };

    if (modalClose) {
      modalClose.addEventListener('click', closeModalFunc);
    }

    artModal.addEventListener('click', (e) => {
      if (e.target === artModal) {
        closeModalFunc();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && artModal.classList.contains('active')) {
        closeModalFunc();
      }
    });
  }

});

/* 5. Spoiler Reveal Helper Function */
function revealSpoiler(boxId) {
  const spoilerBox = document.getElementById(boxId);
  if (spoilerBox) {
    spoilerBox.classList.add('revealed');
  }
}
