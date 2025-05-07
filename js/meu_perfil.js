// Definir o usuário e exibir a mensagem de boas-vindas
const usuario = "João";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;

// Seleciona os elementos do DOM
const botaoEditar = document.querySelector('.botao-editar');
const modalEditarPerfil = document.getElementById('modalEditarPerfil');
const fecharModalBtn = document.getElementById('fecharModalBtn');
const formEditarPerfil = document.getElementById('formEditarPerfil');
const fotoUsuario = document.querySelector('.foto-usuario');
const selectFotoPerfil = document.getElementById('fotoPerfil');
const botaoExcluir = document.querySelector('.botao-excluir');
const modalConfirmarExclusao = document.getElementById('modalConfirmarExclusao');
const confirmarExclusaoBtn = document.getElementById('confirmarExclusaoBtn');
const cancelarExclusaoBtn = document.getElementById('cancelarExclusaoBtn');

// Abre o modal de edição de perfil
botaoEditar.addEventListener('click', () => {
  modalEditarPerfil.style.display = 'flex';
});

// Fecha o modal
fecharModalBtn.addEventListener('click', () => {
  modalEditarPerfil.style.display = 'none';
});

// Atualiza a imagem de perfil ao selecionar uma nova imagem
selectFotoPerfil.addEventListener('change', (e) => {
  fotoUsuario.src = e.target.value;
});

// Submete o formulário para salvar as alterações
formEditarPerfil.addEventListener('submit', (e) => {
  e.preventDefault();

  const modalSucessoPerfil = document.getElementById('modalSucessoPerfil');
  modalSucessoPerfil.style.display = 'flex';

  modalEditarPerfil.style.display = 'none';

  setTimeout(() => {
    modalSucessoPerfil.style.display = 'none';
  }, 4000);
});



// Abrir modal de confirmação ao clicar em "Excluir Perfil"
botaoExcluir.addEventListener('click', () => {
    modalConfirmarExclusao.classList.remove('hidden');
  });
  
  // Cancelar exclusão
  cancelarExclusaoBtn.addEventListener('click', () => {
    modalConfirmarExclusao.classList.add('hidden');
  });
  
  // Confirmar exclusão
  confirmarExclusaoBtn.addEventListener('click', () => {
    modalConfirmarExclusao.classList.add('hidden');
  
    // Aqui você pode adicionar lógica real de exclusão (ex: requisição ao servidor)
    alert('Perfil excluído com sucesso!');
  
    // Opcional: redirecionar para a página inicial
    // window.location.href = 'index.html';
  });