// auth.js

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkNzlHupGPk-gxHAL6TuQRP1bSBbnboog",
  authDomain: "plataforma-eop.firebaseapp.com",
  projectId: "plataforma-eop",
  storageBucket: "plataforma-eop.firebasestorage.app",
  messagingSenderId: "1043929089617",
  appId: "1:1043929089617:web:f6dcc6300f0c9a47ba1a70",
  measurementId: "G-SG5DDQWQV5"
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
