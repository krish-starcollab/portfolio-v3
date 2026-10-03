(function () {
  'use strict';

  // ── Nav Scroll ──
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Mobile Menu ──
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // ── Scroll Reveal ──
  var reveals = document.querySelectorAll('.reveal');
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) {
    var p = el.parentElement;
    if (p && (p.classList.contains('projects-grid') || p.classList.contains('skills') ||
        p.classList.contains('certs-grid') || p.classList.contains('contact-grid') ||
        p.classList.contains('timeline'))) {
      var idx = Array.from(p.children).indexOf(el);
      el.style.transitionDelay = (idx * 0.07) + 's';
    }
    revealObs.observe(el);
  });

  // ── Count-Up ──
  var nums = document.querySelectorAll('.hero-stat__num[data-target]');
  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target, target = parseInt(el.dataset.target, 10);
        countUp(el, 0, target, 1000);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(function (n) { countObs.observe(n); });

  function countUp(el, start, end, dur) {
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * (end - start) + start);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Project Filters ──
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.project-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      cards.forEach(function (c) {
        if (f === 'all' || c.dataset.category === f) {
          c.classList.remove('hidden');
          c.style.opacity = '0'; c.style.transform = 'translateY(12px)';
          requestAnimationFrame(function () { requestAnimationFrame(function () {
            c.style.transition = 'opacity .3s ease, transform .3s ease';
            c.style.opacity = '1'; c.style.transform = 'translateY(0)';
          }); });
        } else { c.classList.add('hidden'); }
      });
    });
  });

  // ── Active Nav ──
  var sections = document.querySelectorAll('.section');
  var navAs = document.querySelectorAll('.nav__links a[href^="#"]');
  var secObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var id = e.target.id;
        navAs.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
      }
    });
  }, { threshold: 0.2, rootMargin: '-64px 0px -50% 0px' });
  sections.forEach(function (s) { secObs.observe(s); });

  // ── Back to Top ──
  var btt = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    btt.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Magnetic Buttons ──
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        b.style.transform = 'translate(' + x * .12 + 'px,' + y * .12 + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }
})();
