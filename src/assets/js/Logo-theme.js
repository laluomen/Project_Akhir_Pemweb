;(function () {
  var img = document.getElementById('siteLogo')
  if (!img) return

  var darkSrc = img.dataset.srcDark || img.src
  var lightSrc = img.dataset.srcLight || null

  function applyTint(enabled) {
    if (enabled) img.classList.add('tint')
    else img.classList.remove('tint')
  }

  function tryUseLight(cb) {
    if (!lightSrc) {
      cb(false)
      return
    }
    var tester = new Image()
    tester.onload = function () {
      img.src = lightSrc
      applyTint(false)
      cb(true)
    }
    tester.onerror = function () {
      cb(false)
    }
    tester.src = lightSrc
  }

  function updateLogo() {
    var isLight = document.body && document.body.classList.contains('light')
    if (isLight) {
      if (lightSrc) {
        tryUseLight(function (ok) {
          if (!ok) {
            img.src = darkSrc
            applyTint(false)
          }
        })
      } else {
        img.src = darkSrc
        applyTint(false)
      }
    } else {
      img.src = darkSrc
      applyTint(true)
    }
  }

  updateLogo()

  var mo = new MutationObserver(function () {
    updateLogo()
  })
  mo.observe(document.body || document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})()
