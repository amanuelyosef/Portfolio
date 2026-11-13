/**
 * Clean & Classic Engineering Portfolio Scripts
 */

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  const headerEl = document.querySelector('#header');

  function headerToggle() {
    if (!headerEl || !headerToggleBtn) return;
    headerEl.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    toggleScrollTop();
  }

  /**
   * Animation on scroll init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 450,
        easing: 'ease-out',
        once: true,
        mirror: false
      });
    }
  }
  aosInit();

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    if (typed_strings) {
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 65,
        backSpeed: 35,
        backDelay: 2200
      });
    }
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      descPosition: 'bottom'
    });
  }

  /**
   * Init isotope layout and filters
   */
  if (typeof Isotope !== 'undefined') {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      const container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;

      const layout = isotopeItem.getAttribute('data-layout') ?? 'fitRows';
      const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      const initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filterBtn) {
        filterBtn.addEventListener('click', function() {
          const activeBtn = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (activeBtn) activeBtn.classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }, false);
      });
    });
  }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  if (window.location.hash && document.querySelector(window.location.hash)) {
    setTimeout(() => {
      const section = document.querySelector(window.location.hash);
      const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
      window.scrollTo({
        top: section.offsetTop - (parseInt(scrollMarginTop, 10) || 0),
        behavior: 'smooth'
      });
    }, 100);
  }

  /**
   * Navmenu Scrollspy
   */
  const navmenulinks = document.querySelectorAll('.navmenu a');
  const isIndexPage = document.body.classList.contains('index-page');

  function navmenuScrollspy() {
    const position = window.scrollY + 200;
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  if (isIndexPage) {
    navmenuScrollspy();
  }

  if (scrollTop || isIndexPage) {
    let scrollTicking = false;
    document.addEventListener('scroll', () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        if (scrollTop) toggleScrollTop();
        if (isIndexPage) navmenuScrollspy();
        scrollTicking = false;
      });
    }, { passive: true });
  }

  /**
   * Copy email helper
   */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email');
      if (navigator.clipboard && email) {
        navigator.clipboard.writeText(email).then(() => {
          const orig = copyEmailBtn.textContent;
          copyEmailBtn.textContent = 'Copied';
          setTimeout(() => {
            copyEmailBtn.textContent = orig;
          }, 1800);
        });
      }
    });
  }

  /**
   * Static-friendly mailto composer
   */
  const composerForm = document.getElementById('mailtoComposerForm');
  if (composerForm) {
    composerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || '';
      const topic = document.getElementById('contactTopic')?.value || 'Portfolio Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim() || '';
      const subject = encodeURIComponent(`[Portfolio] ${topic} — ${name}`);
      const body = encodeURIComponent(`Hi Amanuel,\n\n${message}\n\nBest regards,\n${name}`);
      window.location.href = `mailto:amanuyosi12@gmail.com?subject=${subject}&body=${body}`;
    });
  }

})();
