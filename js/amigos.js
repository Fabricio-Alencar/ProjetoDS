// Definição do nome do usuário que será mostrado na tela
const usuario = "João";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;

// Lista inicial de amigos com nome, email e foto
const amigos = [
  { nome: "Carlos", email: "carlos@email.com", foto: "/static/imagens/prancheta.png" },
  { nome: "Marina", email: "marina@email.com", foto: "/static/imagens/lixeira.png" },
  { nome: "João", email: "joao@email.com", foto: "/static/imagens/coxa_frango.png" }
];

// Lista de receitas para compartilhamento
const receitas = ["Bolo de Cenoura", "Torta Salgada", "Panqueca", "Feijoada"];

// Lista de todos os usuários disponíveis para pesquisa ao adicionar amigo
const todosUsuarios = [  
  { nome: "Carlos", email: "carlos@email.com", foto: "/static/imagens/prancheta.png" },
  { nome: "Marina", email: "marina@email.com", foto: "/static/imagens/lixeira.png" },
  { nome: "João", email: "joao@email.com", foto: "/static/imagens/coxa_frango.png" },
  { nome: "Fabricio", email: "fabricio@email.com", foto: "/static/imagens/cifrao.png" },
  { nome: "Ana", email: "ana@email.com", foto: "/static/imagens/mais.png" },

];

let usuarioSelecionado = null;  // Variável para armazenar o usuário selecionado para adicionar como amigo

// Função para abrir o modal de adicionar amigo
document.getElementById("botaoAdicionarAmigo").onclick = () => {
  const modal = document.getElementById("modalAdicionarAmigo");
  modal.classList.remove("hidden");
  document.getElementById("pesquisaUsuario").value = "";
  document.getElementById("resultadoPesquisa").innerHTML = "";
  document.getElementById("confirmarAdicionar").classList.add("hidden");
  document.getElementById("confirmarAdicionar").disabled = true;
  usuarioSelecionado = null;
};

// Função para fechar o modal
function fecharModal() {
  document.getElementById("modalAdicionarAmigo").classList.add("hidden");
}

// Função para pesquisar amigos na lista de amigos
document.getElementById("pesquisaAmigos").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const resultados = amigos.filter(u => u.nome.toLowerCase().includes(termo));
  const container = document.getElementById("listaAmigos");
  container.innerHTML = "";

  if (resultados.length === 0) {
    container.innerHTML = "<div class='mensagem-vazia'>Nenhum amigo encontrado.</div>";
    return;
  }

  resultados.forEach((amigo, index) => {
    const div = document.createElement("div");
    div.className = "amigo-box";

    const foto = document.createElement("div");
    foto.className = "amigo-foto";
    const img = document.createElement("img");
    img.src = amigo.foto;
    foto.appendChild(img);

    const nome = document.createElement("div");
    nome.className = "amigo-nome";
    nome.textContent = amigo.nome;

    const acoes = document.createElement("div");
    acoes.className = "amigo-acoes";

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.onclick = () => excluirAmigo(index);

    const compartilhar = document.createElement("button");
    compartilhar.textContent = "Compartilhar Receita";
    compartilhar.onclick = () => compartilharReceita(amigo.nome);

    acoes.appendChild(excluir);
    acoes.appendChild(compartilhar);

    div.appendChild(foto);
    div.appendChild(nome);
    div.appendChild(acoes);
    container.appendChild(div);
  });
});

// Função para pesquisar usuários ao adicionar amigo
document.getElementById("pesquisaUsuario").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const container = document.getElementById("resultadoPesquisa");
  container.innerHTML = "";
  usuarioSelecionado = null;
  document.getElementById("confirmarAdicionar").classList.add("hidden");
  document.getElementById("confirmarAdicionar").disabled = true;

  if (termo.length === 0) return;

  const resultados = todosUsuarios.filter(u => u.email.toLowerCase().includes(termo));

  resultados.forEach(usuario => {
    const item = document.createElement("div");
    item.className = "usuario-item cartao-amigo";
    item.setAttribute("role", "option");
    item.tabIndex = 0;

    item.onclick = () => {
      usuarioSelecionado = usuario;
      document.getElementById("confirmarAdicionar").classList.remove("hidden");
      document.getElementById("confirmarAdicionar").disabled = false;

      Array.from(container.children).forEach(child => child.classList.remove('selecionado'));
      item.classList.add('selecionado');
    };

    item.onkeypress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    };

    const img = document.createElement("img");
    img.src = usuario.foto;
    img.alt = `Foto de ${usuario.nome}`;
    img.className = "foto-perfil";

    const info = document.createElement("div");
    info.className = "info-amigo";
    info.innerHTML = `
      <div class="nome-amigo">${usuario.nome}</div>
      <div class="email-amigo">${usuario.email}</div>
    `;

    item.appendChild(img);
    item.appendChild(info);
    container.appendChild(item);
  });
});

// Função para adicionar amigo à lista
document.getElementById("confirmarAdicionar").addEventListener("click", () => {
  if (usuarioSelecionado && !amigos.find(a => a.email === usuarioSelecionado.email)) {
    amigos.push(usuarioSelecionado);
    renderizarAmigos();
    fecharModal();
  } else {
    alert("Amigo já está na lista.");
  }
});

let indexParaExcluir = null;

// Função para excluir amigo da lista
function excluirAmigo(index) {
  indexParaExcluir = index;
  document.getElementById("modalConfirmarExclusao").classList.remove("hidden");
}

// Função para fechar o modal de confirmação de exclusão
function fecharModalConfirmacao() {
  document.getElementById("modalConfirmarExclusao").classList.add("hidden");
  indexParaExcluir = null;
}

// Confirma a exclusão do amigo
document.getElementById("confirmarExclusao").addEventListener("click", () => {
  if (indexParaExcluir !== null) {
    amigos.splice(indexParaExcluir, 1);
    renderizarAmigos();
    fecharModalConfirmacao();
  }
});

// Compartilhar receita com um amigo
function compartilharReceita(nome) {
  const receita = prompt(`Qual receita deseja compartilhar com ${nome}?\nOpções: ${receitas.join(", ")}`);
  if (receitas.includes(receita)) {
    alert(`Receita "${receita}" compartilhada com ${nome}!`);
  } else {
    alert("Receita inválida ou não encontrada.");
  }
}

// Renderiza a lista de amigos
function renderizarAmigos() {
  const container = document.getElementById("listaAmigos");
  container.innerHTML = "";
  amigos.forEach((amigo, index) => {
    const div = document.createElement("div");
    div.className = "amigo-box";

    const foto = document.createElement("div");
    foto.className = "amigo-foto";
    const img = document.createElement("img");
    img.src = amigo.foto;
    foto.appendChild(img);

    const nome = document.createElement("div");
    nome.className = "amigo-nome";
    nome.textContent = amigo.nome;

    const acoes = document.createElement("div");
    acoes.className = "amigo-acoes";

    const excluir = document.createElement("button");
    excluir.classList.add("tooltip");
    excluir.innerHTML = `
      <img src="static/imagens/lixeira.png" alt="Excluir" class="icone-botao">
      <span class="tooltip-text">Excluir amigo</span>
    `;
    excluir.onclick = () => excluirAmigo(index);

    const compartilhar = document.createElement("button");
    compartilhar.classList.add("tooltip");
    compartilhar.innerHTML = `
      <img src="static/imagens/compartilhar-icon.png" alt="Compartilhar" class="icone-botao">
      <span class="tooltip-text">Compartilhar Receita</span>
    `;
    compartilhar.onclick = () => compartilharReceita(amigo.nome);

    acoes.appendChild(excluir);
    acoes.appendChild(compartilhar);

    div.appendChild(foto);
    div.appendChild(nome);
    div.appendChild(acoes);
    container.appendChild(div);
  });
}

// Renderiza os amigos ao iniciar
renderizarAmigos();
