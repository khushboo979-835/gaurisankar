document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hero Image Carousel Auto-Slide
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 3500);
  }

  // Modal logic
  const modalOverlay = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const openModalBtns = document.querySelectorAll('.js-open-modal');

  function openModal(serviceName = '') {
    if (modalOverlay) {
      if (serviceName) {
        const select = document.getElementById('modalService');
        if (select) select.value = serviceName;
      }
      modalOverlay.classList.add('active');
    }
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  if (openModalBtns.length) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.getAttribute('data-service') || '';
        openModal(service);
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Auto popup after 5 seconds on homepage (only once per session)
  if (!sessionStorage.getItem('roPopupShown') && document.getElementById('homePageMarker')) {
    setTimeout(() => {
      openModal();
      sessionStorage.setItem('roPopupShown', 'true');
    }, 5000);
  }

  // Modal Form Submit -> Direct WhatsApp
  const bookingForm = document.getElementById('modalBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const service = document.getElementById('modalService').value;
      const address = document.getElementById('modalAddress').value.trim();

      const text = `Hello Gouri RO Aquaguard Service,%0A%0AI want to book RO service in Bhubaneswar:%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Service: ${encodeURIComponent(service)}%0A• Location: ${encodeURIComponent(address)}`;
      
      window.open(`https://wa.me/917608841410?text=${text}`, '_blank');
      closeModal();
      bookingForm.reset();
    });
  }

  // Contact Page Form -> Direct WhatsApp
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      const text = `Hello Gouri RO Aquaguard Service,%0A%0ANew Service Request from Website:%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Service: ${encodeURIComponent(service)}%0A• Address/Issue: ${encodeURIComponent(message)}`;
      
      window.open(`https://wa.me/917608841410?text=${text}`, '_blank');
      contactForm.reset();
    });
  }
});
