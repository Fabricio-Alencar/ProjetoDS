const usuario = "Ana";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;


const amigos = [
  { nome: "Carlos", email: "carlos@email.com", foto: "https://via.placeholder.com/50" },
  { nome: "Marina", email: "marina@email.com", foto: "https://via.placeholder.com/50" },
  { nome: "João", email: "joao@email.com", foto: "https://via.placeholder.com/50" }
];

const receitas = ["Bolo de Cenoura", "Torta Salgada", "Panqueca", "Feijoada"];

// Lista simulada de todos os usuários disponíveis para adicionar
const todosUsuarios = [
  { nome: "Carlos", email: "carlos@email.com", foto: "https://via.placeholder.com/50" },
  { nome: "Marina", email: "marina@email.com", foto: "https://via.placeholder.com/50" },
  { nome: "João", email: "joao@email.com", foto: "https://via.placeholder.com/50" },
];


















let usuarioSelecionado = null;

// Função para abrir o modal de adicionar amigo
document.getElementById("botaoAdicionarAmigo").onclick = () => {
  document.getElementById("modalAdicionarAmigo").classList.remove("hidden");
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

// Função de pesquisa de amigos
document.getElementById("pesquisaAmigos").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const resultados = amigos.filter(u => u.nome.toLowerCase().includes(termo));
  const container = document.getElementById("listaAmigos");
  container.innerHTML = "";

  // Verifica se a lista está vazia
  if (resultados.length === 0) {
    container.innerHTML = "<div class='mensagem-vazia'>Nenhum amigo encontrado.</div>";
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

// Função para pesquisar usuários para adicionar
document.getElementById("pesquisaUsuario").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const resultados = todosUsuarios.filter(u => u.email.toLowerCase().includes(termo));
  const container = document.getElementById("resultadoPesquisa");
  container.innerHTML = "";

  resultados.forEach(usuario => {
    const item = document.createElement("div");
    item.className = "usuario-item";
    item.onclick = () => {
      usuarioSelecionado = usuario;
      document.getElementById("confirmarAdicionar").classList.remove("hidden");
      document.getElementById("confirmarAdicionar").disabled = false;
    };

    const img = document.createElement("img");
    img.src = usuario.foto;

    const info = document.createElement("div");
    info.className = "usuario-info";
    info.innerHTML = `<strong>${usuario.nome}</strong><span>${usuario.email}</span>`;

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

// Função para excluir amigo
function excluirAmigo(index) {
  indexParaExcluir = index;
  document.getElementById("modalConfirmarExclusao").classList.remove("hidden");
}

function fecharModalConfirmacao() {
  document.getElementById("modalConfirmarExclusao").classList.add("hidden");
  indexParaExcluir = null;
}

document.getElementById("confirmarExclusao").addEventListener("click", () => {
  if (indexParaExcluir !== null) {
    amigos.splice(indexParaExcluir, 1);
    renderizarAmigos();
    fecharModalConfirmacao();
  }
});






// Função para compartilhar receita com o amigo
function compartilharReceita(nome) {
  const receita = prompt(`Qual receita deseja compartilhar com ${nome}?\nOpções: ${receitas.join(", ")}`);
  if (receitas.includes(receita)) {
    alert(`Receita "${receita}" compartilhada com ${nome}!`);
  } else {
    alert("Receita inválida ou não encontrada.");
  }
}









// Função para renderizar amigos
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

// Renderiza inicialmente todos os amigos
renderizarAmigos();
