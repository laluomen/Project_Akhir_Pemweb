// /dist/assets/js/validation.js

document.addEventListener('DOMContentLoaded', function () {
  // --- FORM VALIDATION SAJA ---

  const form = document.querySelector('form.about-box') || document.querySelector('form')
  if (!form) return

  const nameEl    = document.getElementById('name')
  const emailEl   = document.getElementById('email')
  const subjectEl = document.getElementById('subject')
  const messageEl = document.getElementById('message')

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const name    = nameEl.value.trim()
    const email   = emailEl.value.trim()
    const subject = subjectEl.value.trim()
    const message = messageEl.value.trim()

    if (!name || !email || !subject || !message) {
      alert('Harap Lengkapi Data')
      return
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      alert('Email Tidak Valid')
      return
    }

    alert('Pesan Berhasil Dikirim')
    // form.reset()
  })
})
