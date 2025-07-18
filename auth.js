// auth.js

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkNzlHupGPk-gxHAL6TuQRP1bSBbnboog",
  authDomain: "plataforma-eop.firebaseapp.com",
  projectId: "plataforma-eop",
  storageBucket: "plataforma-eop.firebasestorage.app",
  messagingSenderId: "1043929089617",
  appId: "1:1043929089617:web:f6dcc6300c9a47ba1a70",
  measurementId: "G-SG5DDQWQV5"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Firestore e Auth
const db = firebase.firestore();
const auth = firebase.auth();

// Função que verifica autenticação
function checkAuth() {
  auth.onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = 'index.html';
    } else {
      document.body.style.display = 'block';

      const userName = user.displayName || (user.email ? user.email.split('@')[0] : 'Usuário');

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
          setTimeout(function() {
            auth.signOut().then(function () {
              window.location.href = 'index.html';
            }).catch(function(error) {
              console.error("Erro ao sair: ", error);
            });
          }, 1000);
        });
      }

      // Exemplo: buscar documentos ao autenticar
      lerDocumentos("documentos").then((docs) => {
        console.log("Documentos encontrados:", docs);
      });
    }
  });
}

// =======================
// Funções CRUD para Firestore
// =======================

// Adicionar documento (Create)
function adicionarDocumento(collectionName, dados) {
  return db.collection(collectionName).add({
    ...dados,
    data_criacao: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
    console.log("Documento adicionado com ID:", docRef.id);
    return docRef.id;
  })
  .catch((error) => {
    console.error("Erro ao adicionar documento: ", error);
  });
}

// Ler documentos (Read)
function lerDocumentos(collectionName) {
  return db.collection(collectionName).get()
    .then((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      return docs;
    })
    .catch((error) => {
      console.error("Erro ao ler documentos: ", error);
    });
}

// Atualizar documento (Update)
function atualizarDocumento(collectionName, docId, dadosAtualizados) {
  return db.collection(collectionName).doc(docId).update(dadosAtualizados)
    .then(() => {
      console.log("Documento atualizado com sucesso");
    })
    .catch((error) => {
      console.error("Erro ao atualizar documento: ", error);
    });
}

// Deletar documento (Delete)
function deletarDocumento(collectionName, docId) {
  return db.collection(collectionName).doc(docId).delete()
    .then(() => {
      console.log("Documento deletado com sucesso");
    })
    .catch((error) => {
      console.error("Erro ao deletar documento: ", error);
    });
}
