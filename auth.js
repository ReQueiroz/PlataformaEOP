// auth.js

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBlY1s_OQKLGFJaZSyDJzKIoX3WnFGSq58",
  authDomain: "intranetcomfrio.firebaseapp.com",
  projectId: "intranetcomfrio",
  storageBucket: "intranetcomfrio.appspot.com",
  messagingSenderId: "347790318348",
  appId: "1:347790318348:web:901f10beadae6981e40729"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Função de verificação de autenticação
function checkAuth() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      // Usuário não autenticado
      window.location.href = 'index.html';
    } else {
      // Autenticado, exibe conteúdo
      document.body.style.display = 'block';

      // Extrai apenas o nome antes do @
      const userName = user.displayName || (user.email ? user.email.split('@')[0] : 'Usuário');

      // Atualiza o nome do usuário no cabeçalho
      const loginDropdown = document.getElementById("loginDropdown");
      const sairBtn = document.getElementById("sairBtn");

      if (loginDropdown) {
        const loginLink = loginDropdown.querySelector("a");
        if (loginLink) {
          loginLink.innerHTML = `Login: ${userName} <i class="fas fa-cog"></i>`;
        }
      }

      if (sairBtn) {
        sairBtn.style.display = 'flex';
        sairBtn.addEventListener("click", function () {
          // Adiciona um atraso de 2 segundos antes de sair
          setTimeout(function() {
            firebase.auth().signOut().then(function () {
              window.location.href = 'index.html';
            }).catch(function(error) {
              console.error("Erro ao sair: ", error);
            });
          }, 1000); // 1000 ms = 1 segundo
        });
      }
    }
  });
}
