/* Ottica Scaccabarozzi — interazioni del sito */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header compatto ---------- */
  var header = document.querySelector('[data-header]');
  var quickbar = document.querySelector('.quickbar');

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-compact', y > 40);
    if (quickbar) quickbar.classList.toggle('is-visible', y > 420);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-nav]');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Chiudi il menu' : 'Apri il menu';
    nav.style.setProperty('--nav-top', header.getBoundingClientRect().bottom + 'px');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* ---------- Voce di menu attiva ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav__list a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) spy.observe(target);
    });
  }

  /* ---------- Orari: stato "aperto ora" calcolato sull'ora di Milano ---------- */
  // Orari della scheda Google Maps (minuti dalla mezzanotte). 0 = domenica.
  var HOURS = {
    0: [],
    1: [],
    2: [[540, 750], [900, 1140]],
    3: [[540, 750], [900, 1140]],
    4: [[540, 750], [900, 1140]],
    5: [[540, 750], [900, 1140]],
    6: [[540, 750], [900, 1140]]
  };
  var DAY_NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + (m ? ':' + (m < 10 ? '0' : '') + m : '');
  }

  function romeNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
      return { day: day, min: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function nextOpening(now) {
    for (var i = 0; i < 8; i++) {
      var day = (now.day + i) % 7;
      var slots = HOURS[day];
      for (var s = 0; s < slots.length; s++) {
        if (i > 0 || slots[s][0] > now.min) {
          var when = i === 0 ? 'oggi' : i === 1 ? 'domani' : DAY_NAMES[day];
          return when + ' alle ' + fmt(slots[s][0]);
        }
      }
    }
    return '';
  }

  function updateStatus() {
    var now = romeNow();
    var open = null;
    HOURS[now.day].forEach(function (slot) {
      if (now.min >= slot[0] && now.min < slot[1]) open = slot;
    });
    var text = open
      ? 'Aperto ora · chiude alle ' + fmt(open[1])
      : 'Chiuso ora · riapre ' + nextOpening(now);

    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', !!open);
      el.classList.toggle('is-closed', !open);
      el.querySelector('[data-status-text]').textContent = text;
    });
    document.querySelectorAll('.hours tr').forEach(function (row) {
      row.classList.toggle('is-today', Number(row.getAttribute('data-day')) === now.day);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Mappa caricata solo su richiesta ---------- */
  var mapBtn = document.querySelector('[data-map-load]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var map = document.querySelector('[data-map]');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=Ottica+Scaccabarozzi,+Via+Paolo+Sarpi+63,+20154+Milano&z=17&hl=it&output=embed';
      iframe.title = 'Mappa: Ottica Scaccabarozzi, Via Paolo Sarpi 63, Milano';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      map.appendChild(iframe);
      map.querySelector('[data-map-placeholder]').remove();
      iframe.focus();
    });
  }

  /* ---------- Lightbox galleria ---------- */
  var dialog = document.querySelector('[data-lightbox-dialog]');
  var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (dialog && triggers.length && typeof dialog.showModal === 'function') {
    var lbImg = dialog.querySelector('[data-lightbox-img]');
    var lbCap = dialog.querySelector('[data-lightbox-caption]');
    var items = triggers.map(function (btn) {
      var img = btn.querySelector('img');
      var cap = btn.closest('figure').querySelector('figcaption');
      return {
        src: img.getAttribute('data-full') || img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        caption: cap ? cap.textContent.trim() : ''
      };
    });
    var current = 0;
    var lastTrigger = null;

    function show(i) {
      current = (i + items.length) % items.length;
      lbImg.src = items[current].src;
      lbImg.alt = items[current].alt;
      lbCap.textContent = items[current].caption + '  ·  ' + (current + 1) + '/' + items.length;
    }

    triggers.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        lastTrigger = btn;
        show(i);
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      });
    });

    dialog.querySelector('[data-lightbox-close]').addEventListener('click', function () { dialog.close(); });
    dialog.querySelector('[data-lightbox-prev]').addEventListener('click', function () { show(current - 1); });
    dialog.querySelector('[data-lightbox-next]').addEventListener('click', function () { show(current + 1); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'ArrowLeft') show(current - 1);
    });
    dialog.addEventListener('close', function () {
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    });

    // Swipe su smartphone
    var startX = null;
    dialog.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    dialog.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ---------- Comparsa discreta delle sezioni ---------- */
  var revealEls = document.querySelectorAll('.section-head, .storia__intro, .timeline__item, .memoria, .lab__photo, .step, .service, .news, .gallery__item, .sarpi__grid > *, .voce, .visita__grid > *');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  /* ---------- Anno nel footer ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
