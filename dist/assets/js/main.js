import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
 document.addEventListener('DOMContentLoaded', function () {
        window.ThemeToggle && window.ThemeToggle.init({
          toggleSelector: '#themeToggle',
          iconSelector: '#themeIcon',
          storageKey: 'theme',
          preferBody: true
        });
      });
      var email=document.getElementById('email').value;
      var name=document.getElementById('name').value;
      var subject=document.getElementById('subject').value;
      var message=document.getElementById('message').value;
      document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        if(email=="" || name=="" || subject=="" || message==""){
          alert("Harap Lengkapi Data");
        }
        else if(email.indexOf("@") == -1){
          alert("Email Tidak Valid");
        }
        else{
          alert("Pesan Berhasil Dikirim");
        }
      });