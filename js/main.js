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

  // Direct CTAs to Contact Form or WhatsApp (No popup modal)
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  if (openModalBtns.length) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.getAttribute('data-service') || 'General RO Service';
        const contactForm = document.getElementById('contactForm') || document.getElementById('branchBookingForm');
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const text = `Hello Hansraj Enterprises,%0A%0AI want to book: ${encodeURIComponent(service)}`;
          window.open(`https://wa.me/917752083960?text=${text}`, '_blank');
        }
      });
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

      const text = `Hello Hansraj Enterprises,%0A%0ANew Service Request from Website:%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Service: ${encodeURIComponent(service)}%0A• Address/Issue: ${encodeURIComponent(message)}`;
      
      window.open(`https://wa.me/917752083960?text=${text}`, '_blank');
      contactForm.reset();
    });
  }
});
