/**
 * Law Firm MHS & Rekan - Official Website Logic (Mobile & Touch Optimized)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Effect & Scroll Active Link
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for Nav Links
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Menu Toggle & Body Lock
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  function toggleMobileMenu(isOpen) {
    if (isOpen === undefined) {
      isOpen = !navLinksContainer.classList.contains('active');
    }

    if (isOpen) {
      navLinksContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) {
        mobileToggle.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
      }
    } else {
      navLinksContainer.classList.remove('active');
      document.body.style.overflow = '';
      if (mobileToggle) {
        mobileToggle.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
      }
    }
  }

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile dropdown when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close when tapping outside menu on mobile
    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });
  }

  // 3. Hero Carousel Slider (3 Main Sliders with Touch & Auto-play)
  const slides = document.querySelectorAll('.slide-item');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, 6000);
  }

  function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    showSlide(0);
    startSlideTimer();

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startSlideTimer();
      });
    });

    // Mobile Touch Swipe Support for Hero Carousel
    const sliderSection = document.querySelector('.hero-slider-section');
    if (sliderSection) {
      let touchStartX = 0;
      let touchEndX = 0;

      sliderSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      sliderSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
          nextSlide();
          startSlideTimer();
        }
        if (touchEndX > touchStartX + 50) {
          prevSlide();
          startSlideTimer();
        }
      }
    }
  }

  // 4. Services Filter (All, Litigasi, Non-Litigasi)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card-wrapper');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      serviceCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. FAQ Accordion & Live Search
  const faqHeaders = document.querySelectorAll('.faq-header');
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqItems = document.querySelectorAll('.faq-item');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();

      faqItems.forEach(item => {
        const question = item.querySelector('.faq-header').textContent.toLowerCase();
        const answer = item.querySelector('.faq-body').textContent.toLowerCase();

        if (question.includes(term) || answer.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 6. Lightbox Gallery Modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.dataset.fullsrc || item.querySelector('img').src;
      const caption = item.dataset.caption || item.querySelector('.gallery-item-title').textContent;

      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = caption;
      lightboxModal.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 7. Consultation Form Handler (Email & WhatsApp Direct)
  const consultForm = document.getElementById('consultationForm');
  const btnSendEmail = document.getElementById('btnSendEmail');
  const btnSendWA = document.getElementById('btnSendWA');

  if (consultForm) {
    // Send via Email (Mailto formatted)
    btnSendEmail.addEventListener('click', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const category = document.getElementById('formCategory').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !phone || !message) {
        alert('Mohon lengkapi Nama, Nomor Telepon/WhatsApp, dan Ringkasan Perkara.');
        return;
      }

      const subject = encodeURIComponent(`[Konsultasi Hukum MHS & Rekan] - ${category} dari ${name}`);
      const body = encodeURIComponent(
        `Yth. Tim Kantor Hukum MHS & Rekan,\n\n` +
        `Saya ingin mengajukan pertanyaan/konsultasi hukum dengan detail sebagai berikut:\n\n` +
        `Nama Lengkap: ${name}\n` +
        `Email: ${email || '-'}\n` +
        `No. HP/WhatsApp: ${phone}\n` +
        `Kategori Perkara: ${category}\n\n` +
        `Ringkasan Masalah/Pertanyaan:\n${message}\n\n` +
        `Mohon informasi lebih lanjut terkait langkah konsultasi selanjutnya.\n\n` +
        `Terima kasih.`
      );

      window.location.href = `mailto:mhs.rekan@gmail.com?subject=${subject}&body=${body}`;
    });

    // Send via WhatsApp Direct
    btnSendWA.addEventListener('click', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const category = document.getElementById('formCategory').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !message) {
        alert('Mohon lengkapi Nama dan Ringkasan Perkara.');
        return;
      }

      const waText = encodeURIComponent(
        `Halo Tim Kantor Hukum MHS & Rekan,\n\n` +
        `Saya *${name}* ingin berkonsultasi mengenai perkara *${category}*.\n\n` +
        `Detail Perkara:\n${message}\n\n` +
        `Mohon petunjuk untuk jadwal konsultasi. Terima kasih.`
      );

      window.open(`https://wa.me/6281314152403?text=${waText}`, '_blank');
    });
  }
});
