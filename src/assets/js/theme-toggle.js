;(function (win) {
  'use strict'

  const cfg = {
    toggleSelector: '#themeToggle',
    iconSelector: '#themeIcon',
    storageKey: 'theme',
    preferBody: true,
  }

  const el = (q) => document.querySelector(q)

  const getStored = () => {
    try {
      return localStorage.getItem(cfg.storageKey)
    } catch {
      return null
    }
  }

  const setStored = (v) => {
    try {
      if (v === null) localStorage.removeItem(cfg.storageKey)
      else localStorage.setItem(cfg.storageKey, v)
    } catch {}
  }

  const readSystem = () => {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const getEffectiveTheme = (stored) => {
    if (stored === 'dark' || stored === 'light') return stored
    return readSystem()
  }

  const updateIcon = (icon, theme) => {
    if (!icon) return
    icon.classList.remove('bi-sun-fill', 'bi-moon-fill')
    icon.classList.add(theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill')
  }

  function applyTheme(theme) {
    const html = document.documentElement
    const body = document.body

    const effective = getEffectiveTheme(theme)

    if (effective === 'dark') {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }

    if (cfg.preferBody && body) {
      if (effective === 'dark') {
        body.classList.add('dark')
        body.classList.remove('light')
      } else {
        body.classList.add('light')
        body.classList.remove('dark')
      }
    }

    document.querySelectorAll('.navbar').forEach((nav) => {
      if (effective === 'dark') {
        nav.classList.remove('navbar-light')
        nav.classList.add('navbar-dark')
      } else {
        nav.classList.remove('navbar-dark')
        nav.classList.add('navbar-light')
      }
    })

    document.querySelectorAll('.btn').forEach((btn) => {
      if (effective === 'light') {
        if (btn.classList.contains('btn-outline-light')) {
          btn.classList.remove('btn-outline-light')
          btn.classList.add('btn-outline-dark')
        }
      } else {
        if (btn.classList.contains('btn-outline-dark')) {
          btn.classList.remove('btn-outline-dark')
          btn.classList.add('btn-outline-light')
        }
      }
    })

    const toggleBtn = el(cfg.toggleSelector)
    if (toggleBtn) {
      if (effective === 'light') toggleBtn.classList.add('ghost--light')
      else toggleBtn.classList.remove('ghost--light')

      toggleBtn.setAttribute(
        'aria-pressed',
        effective === 'dark' ? 'true' : 'false'
      )
      toggleBtn.setAttribute(
        'title',
        effective === 'dark'
          ? 'Dark mode aktif — klik untuk light'
          : 'Light mode aktif — klik untuk dark'
      )
    }

    updateIcon(el(cfg.iconSelector), effective)

    html.classList.remove('theme-loading')

    setTimeout(() => {
      html.style.backgroundColor = ''
      if (body) body.style.backgroundColor = ''
    }, 80)
  }

  function init(options) {
    Object.assign(cfg, options || {})

    const toggleBtn = el(cfg.toggleSelector)

    const stored = getStored()

    applyTheme(stored)

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const cur = getStored()
        let next = null

        if (cur === 'dark') next = 'light'
        else if (cur === 'light') next = 'dark'
        else next = readSystem() === 'dark' ? 'light' : 'dark'

        setStored(next)
        applyTheme(next)
      })
    }

    if (window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')

      const handler = () => {
        const saved = getStored()
        if (saved !== 'dark' && saved !== 'light') {
          applyTheme(null) // follow OS
        }
      }

      if (mql.addEventListener) mql.addEventListener('change', handler)
      else if (mql.addListener) mql.addListener(handler)
    }

    return {
      setTheme: (t) => {
        if (t === 'dark' || t === 'light' || t === null) {
          setStored(t)
          applyTheme(t)
        }
      },
      getTheme: getStored,
      toggle: () => toggleBtn && toggleBtn.click(),
    }
  }

  // Expose API
  win.ThemeToggle = { init }
})(window)
// Auto init ketika DOM siap
document.addEventListener('DOMContentLoaded', function () {
  if (window.ThemeToggle) {
    window.ThemeToggle.init({
      toggleSelector: '#themeToggle',
      iconSelector: '#themeIcon',
      storageKey: 'theme',
      preferBody: true,
    })
  }
})
