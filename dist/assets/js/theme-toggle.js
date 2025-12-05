// /dist/assets/js/theme-toggle.js
// FINAL VERSION — fixed FOUC, fixed black screen, fixed theme sync

(function (win) {
  'use strict';

  const cfg = {
    toggleSelector: '#themeToggle',
    iconSelector: '#themeIcon',
    storageKey: 'theme',
    preferBody: true
  };

  // -------------------------------
  // DOM Helpers
  // -------------------------------
  const el = (q) => document.querySelector(q);

  const getStored = () => {
    try { return localStorage.getItem(cfg.storageKey); }
    catch { return null; }
  };

  const setStored = (v) => {
    try {
      if (v === null) localStorage.removeItem(cfg.storageKey);
      else localStorage.setItem(cfg.storageKey, v);
    } catch {}
  };

  const readSystem = () => {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const getEffectiveTheme = (stored) => {
    if (stored === 'dark' || stored === 'light') return stored;
    return readSystem();
  };

  // -------------------------------
  // Update icon
  // -------------------------------
  const updateIcon = (icon, theme) => {
    if (!icon) return;
    icon.classList.remove('bi-sun-fill', 'bi-moon-fill');
    icon.classList.add(theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill');
  };

  // -------------------------------
  // APPLY THEME
  // -------------------------------
  function applyTheme(theme) {
    const html = document.documentElement;
    const body = document.body;

    const effective = getEffectiveTheme(theme);

    // Set class on HTML (global selector)
    if (effective === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }

    // Also set on BODY
    if (cfg.preferBody && body) {
      if (effective === 'dark') {
        body.classList.add('dark');
        body.classList.remove('light');
      } else {
        body.classList.add('light');
        body.classList.remove('dark');
      }
    }

    // Navbar helper
    document.querySelectorAll('.navbar').forEach(nav => {
      if (effective === 'dark') {
        nav.classList.remove('navbar-light');
        nav.classList.add('navbar-dark');
      } else {
        nav.classList.remove('navbar-dark');
        nav.classList.add('navbar-light');
      }
    });

    // Swap outline-light/dark for readability
    document.querySelectorAll('.btn').forEach(btn => {
      if (effective === 'light') {
        if (btn.classList.contains('btn-outline-light')) {
          btn.classList.remove('btn-outline-light');
          btn.classList.add('btn-outline-dark');
        }
      } else {
        if (btn.classList.contains('btn-outline-dark')) {
          btn.classList.remove('btn-outline-dark');
          btn.classList.add('btn-outline-light');
        }
      }
    });

    // Theme toggle visual fix
    const toggleBtn = el(cfg.toggleSelector);
    if (toggleBtn) {
      if (effective === 'light') toggleBtn.classList.add('ghost--light');
      else toggleBtn.classList.remove('ghost--light');

      toggleBtn.setAttribute('aria-pressed', effective === 'dark' ? 'true' : 'false');
      toggleBtn.setAttribute(
        'title',
        effective === 'dark'
          ? 'Dark mode aktif — klik untuk light'
          : 'Light mode aktif — klik untuk dark'
      );
    }

    updateIcon(el(cfg.iconSelector), effective);

    // Remove theme-loading flag if exists
    html.classList.remove('theme-loading');

    // Clear temporary inline background (removes black flash)
    setTimeout(() => {
      html.style.backgroundColor = '';
      if (body) body.style.backgroundColor = '';
    }, 80);
  }

  // -------------------------------
  // INIT
  // -------------------------------
  function init(options) {
    Object.assign(cfg, options || {});

    const toggleBtn = el(cfg.toggleSelector);

    const stored = getStored();

    // Apply initial theme NOW
    applyTheme(stored);

    // Button toggle listener
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const cur = getStored();
        let next = null;

        if (cur === 'dark') next = 'light';
        else if (cur === 'light') next = 'dark';
        else next = readSystem() === 'dark' ? 'light' : 'dark';

        setStored(next);
        applyTheme(next);
      });
    }

    // Listen for OS theme changes ONLY if user did not choose manually
    if (window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      const handler = () => {
        const saved = getStored();
        if (saved !== 'dark' && saved !== 'light') {
          applyTheme(null); // follow OS
        }
      };

      if (mql.addEventListener) mql.addEventListener('change', handler);
      else if (mql.addListener) mql.addListener(handler);
    }

    return {
      setTheme: (t) => {
        if (t === 'dark' || t === 'light' || t === null) {
          setStored(t);
          applyTheme(t);
        }
      },
      getTheme: getStored,
      toggle: () => toggleBtn && toggleBtn.click()
    };
  }

  // Expose API
  win.ThemeToggle = { init };

})(window);
