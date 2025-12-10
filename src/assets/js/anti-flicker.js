;(function () {
  var storageKey = 'theme'
  var classNameDark = 'dark'
  var classNameLight = 'light'

  function getStored() {
    try {
      return localStorage.getItem(storageKey)
    } catch (e) {
      return null
    }
  }

  function readSystem() {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  var stored = getStored()
  var initial =
    stored === classNameDark || stored === classNameLight
      ? stored
      : readSystem()

  var html = document.documentElement
  html.classList.add(initial)
  html.classList.add('theme-loading')

  html.style.backgroundColor = initial === 'dark' ? '#0b1220' : '#ffffff'
})()
