/* ==========================================================================
   LAW FIRM MHS & REKAN - ADVOKAT & KONSULTAN HUKUM
   Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Mobile Drawer Navigation Toggle (with Accessibility support)
     -------------------------------------------------------------------------- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Active Navbar Section Highlight & Scroll Effect
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
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

  /* --------------------------------------------------------------------------
     3. Team Member Data (LENGKAP 11 ANGGOTA DARI PDF) & Modal Handler
     -------------------------------------------------------------------------- */
  const teamData = {
    1: {
      name: "1. Manganju Hamonangan Simanullang, S.H., M.H., C.L.A.",
      role: "Founder & Managing Partner",
      credentials: "Cum Laude UKI · PERADI · Certified Law Auditor (Jimly School)",
      bio: "Manganju H. Simanullang, S.H., M.H., C.L.A. merupakan pendiri Law Firm MHS & Rekan (berdiri 3 September 2009). Memiliki pengalaman profesional lebih dari 5 tahun di kantor notaris terkemuka di Kelapa Gading Jakarta Utara, serta Magister Hukum UKI predikat Cum Laude. Beliau saat ini menjabat Sekretaris Bidang Keanggotaan DPN PERADI.",
      expertise: ["Pendirian PT & Aspek Legalitas Korporasi", "Sengketa Pertanahan & Agraria (Spesialis)", "Gugatan Perdata Wanprestasi & PMH", "Audit Hukum Korporasi & Properti (C.L.A)", "Perkara Kepailitan & Kurator", "Tindak Pidana Khusus (Tipikor & Narkotika)"]
    },
    2: {
      name: "2. Hombar Sinambela, S.H.",
      role: "Advocate & Industrial Relations Specialist",
      credentials: "Anggota KAI · Pengadilan Tinggi Bandung",
      bio: "Memiliki pengalaman lebih dari 10 tahun sebagai aktivis serikat pekerja dan 5 tahun sebagai HRD perusahaan asing. Sangat berpengalaman dalam penanganan perkara Pemutusan Hubungan Kerja (PHK), perselisihan hubungan industrial, restrukturisasi ketenagakerjaan, serta negosiasi kolektif.",
      expertise: ["Hukum Ketenagakerjaan & PHI", "Penyelesaian Perselisihan PHK", "Efisiensi & Restrukturisasi Tenaga Kerja", "Perjanjian Kerja Bersama (PKB)"]
    },
    3: {
      name: "3. Jimmy Hutasoit, S.H., M.H.",
      role: "Advocate & Corporate Specialist",
      credentials: "Advokat PERADI · Magister Hukum",
      bio: "Advokat berpengalaman dalam mengurus legalitas dan perizinan perusahaan (SIUP, NIB, Akuisisi) serta menangani sengketa pidana umum dan perkara perdata komersial.",
      expertise: ["Perizinan & Legalitas PT/CV", "Hukum Pidana Umum & Perdata", "Hukum Bisnis & Perjanjian"]
    },
    4: {
      name: "4. Irakata Fransius Simanullang, S.H.",
      role: "Advocate & Legal Consultant",
      credentials: "Alumni UKI Jakarta · Advokat MHS & Rekan",
      bio: "Lulusan Ilmu Hukum Universitas Kristen Indonesia. Mengawali karir di Lembaga Bantuan Hukum UKI dan bergabung di MHS & Rekan sejak 2018. Memiliki spesialisasi dalam hukum pertanahan, perdata materiil/formil, dan pidana.",
      expertise: ["Hukum Pertanahan & Sengketa Lahan", "Hukum Perdata Materiil & Formil", "Pendampingan Pidana"]
    },
    5: {
      name: "6. Hongkop Simanullang, S.H., M.H.",
      role: "Advocate, Legal Consultant & Dosen",
      credentials: "Advokat Senior · Akademisi Hukum",
      bio: "Lahir di Medan, 4 Februari 1973. Dikenal jujur, profesional, dan aktif sebagai Dosen Hukum. Memiliki keahlian mendalam pada hukum pidana dari tingkat kepolisian, kejaksaan, hingga persidangan di pengadilan.",
      expertise: ["Pendampingan Kepolisian & Kejaksaan", "Persidangan Perkara Pidana", "Litigasi Perdata & Konsultasi Hukum"]
    },
    6: {
      name: "7. Dr. Ir. Aladin Sirait, S.H., M.H.",
      role: "Ahli Hukum Perdata Konstruksi",
      credentials: "Doktor & Pakar Konstruksi",
      bio: "Memiliki kepakaran ganda di bidang teknik konstruksi dan hukum perdata konstruksi, berpengalaman mendampingi proyek infrastruktur dan penyelesaian sengketa klaim konstruksi.",
      expertise: ["Hukum Perdata Konstruksi & Infrastruktur", "Sengketa Kontrak Kontraktor/Pengembang", "Arbitrase & Klaim Proyek"]
    },
    7: {
      name: "8. Suharno, S.H., M.H., C.Med.",
      role: "Ahli Hukum Perdata & Mediator",
      credentials: "Certified Mediator (C.Med) · Magister Hukum",
      bio: "Mediator bersertifikat yang mengedepankan penyelesaian sengketa perdata melalui jalur negosiasi dan mediasi non-litigasi berorientasi win-win solution.",
      expertise: ["Mediation & Arbitrase Sengketa", "Hukum Perdata Umum", "Konsultasi Hukum Preventif"]
    },
    8: {
      name: "9. Daniel Hutabarat, S.H., M.H.",
      role: "Ahli Hukum Perdata & Kurator",
      credentials: "Kurator Resmi · Magister Hukum",
      bio: "Pengurus dan Kurator terdaftar yang berpengalaman menangani penundaan kewajiban pembayaran utang (PKPU) dan pengurusan aset kepailitan di Pengadilan Niaga.",
      expertise: ["Hukum Kepailitan & PKPU", "Pengurusan & Pemberesan Aset Kurator", "Restrukturisasi Utang Piutang"]
    },
    9: {
      name: "10. Partogi Roni Simanullang, S.H.",
      role: "Staff Legal MHS & Rekan",
      credentials: "Lulusan FH Universitas Kristen Indonesia",
      bio: "Lulusan Fakultas Hukum UKI dengan dedikasi tinggi, ketelitian, dan kemampuan analisis hukum yang baik dalam mendukung pelayanan hukum secara profesional dan bertanggung jawab.",
      expertise: ["Analisis Berkas Hukum", "Penyusunan Dokumen Pendampingan", "Riset Legalitas Korporasi"]
    },
    10: {
      name: "11. Ruth Devi, S.H.",
      role: "Staff Legal MHS & Rekan",
      credentials: "Lulusan FH Universitas Negeri Semarang (UNNES)",
      bio: "Lulusan Fakultas Hukum UNNES dengan konsentrasi Hukum Perdata. Adaptif, komunikatif, dan memiliki kemampuan analisis hukum yang baik serta siap memberikan kontribusi optimal.",
      expertise: ["Hukum Perdata Umum", "Komunikasi Klien & Administrasi Legal", "Riset Kasus Perdata"]
    },
    11: {
      name: "5. Tiandro Paradise, S.H.",
      role: "Advocate & Legal Consultant",
      credentials: "Advokat Hukum Perdata",
      bio: "Advokat yang berfokus pada penanganan perkara hukum perdata umum, legal drafting perjanjian kerja sama bisnis, serta pendampingan sengketa di Pengadilan Negeri.",
      expertise: ["Hukum Perdata Umum", "Legal Drafting Kontrak", "Pendampingan Sengketa Perdata"]
    }
  };

  const teamModal = document.getElementById('team-modal');
  const teamModalTitle = document.getElementById('modal-team-name');
  const teamModalRole = document.getElementById('modal-team-role');
  const teamModalCred = document.getElementById('modal-team-cred');
  const teamModalBio = document.getElementById('modal-team-bio');
  const teamModalExpertise = document.getElementById('modal-team-expertise');

  document.querySelectorAll('.btn-view-team').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const data = teamData[id];

      if (data) {
        teamModalTitle.textContent = data.name;
        teamModalRole.textContent = data.role;
        teamModalCred.textContent = data.credentials;
        teamModalBio.textContent = data.bio;

        teamModalExpertise.innerHTML = data.expertise
          .map(exp => `<div class="expertise-item"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${exp}</span></div>`)
          .join('');

        teamModal.classList.add('active');
      }
    });
  });

  // Modal Close
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(closeEl => {
    closeEl.addEventListener('click', (e) => {
      if (e.target === closeEl || closeEl.classList.contains('modal-close')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. Track Record Filter Tabs
     -------------------------------------------------------------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const caseCards = document.querySelectorAll('.case-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      caseCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Interactive Q&A & Consultation Form with Lead Client Logging
     -------------------------------------------------------------------------- */
  const qaForm = document.getElementById('qa-form');
  const btnWaSend = document.getElementById('btn-wa-send');
  const btnEmailSend = document.getElementById('btn-email-send');

  function saveConsultationLead(data, channel) {
    try {
      const leads = JSON.parse(localStorage.getItem('mhs_consultation_leads') || '[]');
      leads.push({
        ...data,
        channel: channel,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('mhs_consultation_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('Lead logging error:', e);
    }
  }

  // Global helper for firm administrators to view saved client consultation leads
  window.getMhsLeads = function() {
    return JSON.parse(localStorage.getItem('mhs_consultation_leads') || '[]');
  };

  if (qaForm) {
    function getFormData() {
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const category = document.getElementById('form-category').value;
      const office = document.getElementById('form-office').value;
      const question = document.getElementById('form-question').value.trim();

      if (!name || !phone || !question) {
        alert('Mohon lengkapi Nama Lengkap, Nomor WhatsApp/Telepon, dan Deskripsi Perkara Anda.');
        return null;
      }

      return { name, phone, email, category, office, question };
    }

    if (btnWaSend) {
      btnWaSend.addEventListener('click', () => {
        const data = getFormData();
        if (!data) return;

        // Log consultation lead locally before redirecting
        saveConsultationLead(data, 'WhatsApp');

        const targetPhone = data.office === 'citraraya' ? '6281314152403' : '6281388370695';
        const msg = `*KONSULTASI HUKUM DIRECT - MHS & REKAN*\n\n` +
          `*Nama:* ${data.name}\n` +
          `*WhatsApp/HP:* ${data.phone}\n` +
          `*Email:* ${data.email || '-'}\n` +
          `*Spesialisasi Hukum:* ${data.category}\n` +
          `*Pilihan Kantor:* ${data.office.toUpperCase()}\n\n` +
          `*Pertanyaan / Deskripsi Perkara:*\n${data.question}`;

        const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
      });
    }

    if (btnEmailSend) {
      btnEmailSend.addEventListener('click', () => {
        const data = getFormData();
        if (!data) return;

        // Log consultation lead locally before redirecting
        saveConsultationLead(data, 'Email');

        const targetEmail = 'tim.advokat.mhs@gmail.com';
        const subject = `[Konsultasi Hukum Direct] ${data.category} - ${data.name}`;
        const body = `Halo Tim Advokat MHS & Rekan,\n\nSaya ingin berkonsultasi mengenai perkara hukum dengan detail sebagai berikut:\n\n` +
          `Nama Lengkap: ${data.name}\n` +
          `Nomor HP/WhatsApp: ${data.phone}\n` +
          `Email: ${data.email}\n` +
          `Bidang Layanan: ${data.category}\n` +
          `Kantor Tujuan: ${data.office}\n\n` +
          `Detail Pertanyaan/Perkara:\n${data.question}\n\n` +
          `Terima kasih.`;

        const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. Photo Gallery Lightbox Viewer
     -------------------------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').getAttribute('src');
      lightboxImg.setAttribute('src', imgSrc);
      lightboxModal.classList.add('active');
    });
  });

  /* --------------------------------------------------------------------------
     7. FAQ Accordion
     -------------------------------------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      faqItem.classList.toggle('open');
    });
  });

});
