const usuario = "Ana";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;

const amigos = [];
const receitas = ["Bolo de Cenoura", "Torta Salgada", "Panqueca", "Feijoada"];

function adicionarAmigo() {
  const nome = prompt("Digite o nome do amigo:");
  if (nome && !amigos.find(a => a.nome === nome)) {
    amigos.push({ nome, foto: 'https://via.placeholder.com/50' });
    renderizarAmigos();
  } else if (amigos.find(a => a.nome === nome)) {
    alert("Este amigo já está na lista.");
  }
}

function excluirAmigo(index) {
  amigos.splice(index, 1);
  renderizarAmigos();
}

function compartilharReceita(nome) {
  const receita = prompt(`Qual receita deseja compartilhar com ${nome}?\nOpções: ${receitas.join(", ")}`);
  if (receitas.includes(receita)) {
    alert(`Receita "${receita}" compartilhada com ${nome}!`);
  } else {
    alert("Receita inválida ou não encontrada.");
  }
}

function renderizarAmigos() {
  const container = document.getElementById("listaAmigos");
  container.innerHTML = "";
  amigos.forEach((amigo, index) => {
    const div = document.createElement("div");
    div.className = "amigo-box";

    const foto = document.createElement("div");
    foto.className = "amigo-foto";

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
}