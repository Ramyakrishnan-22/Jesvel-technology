// ===================================================================
// JESVEL Technologies — Site Script
// ===================================================================

// Sticky header: add a subtle border/background once the page scrolls
const header = document.getElementById('siteHeader');

function updateHeaderState() {
  if (!header) return;
  if (window.scrollY > 8) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

// FAQ accordion (contact page)
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close any other open item
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach((openBtn) => {
      if (openBtn !== btn) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.nextElementSibling.style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
  });
});

// Contact form: real-time validation + Formspree submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const formStatus = document.getElementById('formStatus');
  const phonePattern = /^[+\d][\d\s\-().]{6,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Field -> validator. Each returns an error string, or '' if valid.
  const validators = {
    name: (v) => (v.trim() ? '' : 'Please enter your name.'),
    email: (v) => {
      if (!v.trim()) return 'Please enter your email address.';
      return emailPattern.test(v.trim()) ? '' : 'Enter a valid email address.';
    },
    phone: (v) => {
      if (!v.trim()) return ''; // optional field
      return phonePattern.test(v.trim()) ? '' : 'Enter a valid phone number.';
    },
    projectType: (v) => (v ? '' : 'Please select a project type.'),
    message: (v) => (v.trim() ? '' : 'Tell us a little about your project.'),
  };

  function fieldEl(name) {
    return contactForm.querySelector(`[name="${name}"]`);
  }

  function validateField(name) {
    const el = fieldEl(name);
    const errorEl = document.getElementById(`${name}-error`);
    const validator = validators[name];
    if (!el || !validator) return true;

    const message = validator(el.value);
    if (message) {
      el.classList.add('is-invalid');
      el.classList.remove('is-valid');
      if (errorEl) errorEl.textContent = message;
      return false;
    }

    el.classList.remove('is-invalid');
    el.classList.add('is-valid');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  // Validate as the user types/selects, and again on blur
  Object.keys(validators).forEach((name) => {
    const el = fieldEl(name);
    if (!el) return;
    el.addEventListener('input', () => validateField(name));
    el.addEventListener('blur', () => validateField(name));
    el.addEventListener('change', () => validateField(name));
  });

  // Project-type pill buttons set the hidden projectType field
  const pillGroup = document.getElementById('projectPills');
  if (pillGroup) {
    const projectTypeInput = fieldEl('projectType');
    pillGroup.querySelectorAll('.pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        pillGroup.querySelectorAll('.pill').forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        if (projectTypeInput) {
          projectTypeInput.value = pill.dataset.value;
          validateField('projectType');
        }
      });
    });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const names = Object.keys(validators);
    const results = names.map((name) => validateField(name));
    const firstInvalidIndex = results.indexOf(false);

    if (firstInvalidIndex !== -1) {
      formStatus.textContent = 'Please fix the highlighted fields.';
      formStatus.className = 'form-status is-error';
      fieldEl(names[firstInvalidIndex]).focus();
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.textContent = 'Sending your message…';
    formStatus.className = 'form-status is-sending';

    // Submits to Formspree (https://formspree.io). Replace the form's
    // "action" URL in contact.html with your own Formspree endpoint
    // (sign up free, create a form, copy the "https://formspree.io/f/..."
    // URL) for this to actually deliver messages to your inbox.
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          formStatus.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
          formStatus.className = 'form-status is-success';
          contactForm.reset();
          names.forEach((name) => {
            const el = fieldEl(name);
            if (el) el.classList.remove('is-valid', 'is-invalid');
          });
        } else {
          formStatus.textContent = "Something went wrong sending your message. Please try again or email us directly.";
          formStatus.className = 'form-status is-error';
        }
      })
      .catch(() => {
        formStatus.textContent = "Something went wrong sending your message. Please try again or email us directly.";
        formStatus.className = 'form-status is-error';
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
}

// Scroll-reveal animation: elements fade/slide in as they enter view
const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');

if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after a link is tapped
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
