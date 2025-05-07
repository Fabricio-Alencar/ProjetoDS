const usuario = "Ana";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;

const receitas = [
  {
    titulo: 'Bolo de Cenoura', tipo: 'doce',
    ingredientes: [
      { produto: 'Cenoura', quantidade: '2', unidade: 'unidades' },
      { produto: 'Açúcar', quantidade: '2', unidade: 'xícaras' },
      { produto: 'Farinha de trigo', quantidade: '2', unidade: 'xícaras' }
    ],
    modoPreparo: [
      'Bata as cenouras com os outros ingredientes.',
      'Despeje a massa em uma forma untada.',
      'Asse a 180°C por 30 minutos.'
    ],
    tempoPreparo: '40 minutos',
    porcoes: '10 porções'
  },
  {
    titulo: 'Pão Caseiro', tipo: 'salgado',
    ingredientes: [
      { produto: 'Farinha de trigo', quantidade: '5', unidade: 'xícaras' },
      { produto: 'Água', quantidade: '300', unidade: 'ml' },
      { produto: 'Fermento', quantidade: '10', unidade: 'g' }
    ],
    modoPreparo: [
      'Misture os ingredientes e deixe a massa descansar por 1 hora.',
      'Modele e asse a 180°C por 45 minutos.'
    ],
    tempoPreparo: '1 hora e 30 minutos',
    porcoes: '12 porções'
  }
];

const icons = {
  doce: 'static/imagens/bolo.png',
  salgado: 'static/imagens/coxa_frango.png',
  outros: 'static/imagens/outros.png'
};

// Seleciona os elementos da interface que serão manipulados
const recipesList = document.getElementById('recipesList');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const recipeModal = document.getElementById('recipeModal');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const modalIngredients = document.getElementById('modalIngredients');
const modalPreparation = document.getElementById('modalPreparation');
const modalUtensils = document.getElementById('modalUtensils');
const modalPrepTime = document.getElementById('modalPrepTime');
const modalPortions = document.getElementById('modalPortions');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const deleteRecipeBtn = document.getElementById('deleteRecipeBtn');
const addRecipeModal = document.getElementById('addRecipeModal');
const closeAddModal = document.getElementById('closeAddModal');
const addRecipeForm = document.getElementById('addRecipeForm');






// Função que filtra e renderiza as receitas na tela
function renderReceitas() {
  const searchTerm = searchInput.value.toLowerCase(); // Texto digitado na busca
  const selectedType = typeFilter.value; // Tipo selecionado no filtro

  recipesList.innerHTML = ''; // Limpa o conteúdo anterior da lista

  // Filtra as receitas com base no termo de busca e tipo
  const filtradas = receitas.filter(r => {
    const matchTitulo = r.titulo.toLowerCase().includes(searchTerm);
    const matchTipo = selectedType === 'todos' || r.tipo === selectedType;
    return matchTitulo && matchTipo;
  });

  // Se nenhuma receita for encontrada, exibe uma mensagem
  if (filtradas.length === 0) {
    recipesList.innerHTML = '<p>Nenhuma receita encontrada.</p>';
    return;
  }

  // Cria e exibe os cards das receitas
  filtradas.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h2 class="recipe-title">${r.titulo}</h2>
      <div class="recipe-type">
        <img src="${icons[r.tipo]}" alt="${r.tipo}">
        <span>${r.tipo.charAt(0).toUpperCase() + r.tipo.slice(1)}</span>
      </div>
    `;

    // Evento para abrir o modal com detalhes da receita
    card.addEventListener('click', () => {
      modalTitle.textContent = r.titulo;
      modalPortions.textContent = r.porcoes;
      modalPrepTime.textContent = r.tempoPreparo;

      modalIngredients.innerHTML = '';
      r.ingredientes.forEach(i => {
        const li = document.createElement('li');
        li.textContent = `${i.quantidade} ${i.unidade} de ${i.produto}`;
        modalIngredients.appendChild(li);
      });

      modalPreparation.innerHTML = '';
      r.modoPreparo.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        modalPreparation.appendChild(li);
      });

      recipeModal.style.display = 'flex';
    });

    recipesList.appendChild(card);
  });
}

// Fecha o modal quando o botão "X" é clicado
closeModal.addEventListener('click', () => {
  recipeModal.style.display = 'none';
});

// Fecha o modal se o usuário clicar fora da área do conteúdo
window.addEventListener('click', (event) => {
  if (event.target === recipeModal) {
    recipeModal.style.display = 'none';
  }
});











// Abre o modal de exclusão e inicializa a lista
function abrirModalExcluir() {
  document.getElementById("modalExcluir").classList.remove("hidden");
  document.getElementById("pesquisaExcluir").value = "";
  atualizarListaExcluir();
}

// Fecha o modal de exclusão
function fecharModalExcluir() {
  document.getElementById("modalExcluir").classList.add("hidden");
  document.getElementById("confirmarExclusao").classList.add("hidden");
  document.getElementById("confirmarExclusao").disabled = true;
}

// Atualiza a lista de receitas para excluir
function atualizarListaExcluir() {
  const termo = document.getElementById("pesquisaExcluir").value.toLowerCase();
  const lista = document.getElementById("listaReceitasExcluir");
  lista.innerHTML = "";

  const filtradas = receitas.filter(r => r.titulo.toLowerCase().includes(termo));

  filtradas.forEach((r, index) => {
    const item = document.createElement("div");
    item.className = "item-receita";
    item.textContent = r.titulo;
    item.dataset.index = index;

    item.addEventListener("click", () => {
      // Limpa seleção anterior
      document.querySelectorAll('.item-receita').forEach(el => el.classList.remove("selecionado"));
      // Marca o item selecionado
      item.classList.add("selecionado");

      const btn = document.getElementById("confirmarExclusao");
      btn.dataset.index = index;
      btn.classList.remove("hidden");
      btn.disabled = false;
    });

    lista.appendChild(item);
  });

  // Oculta o botão se nenhuma receita for clicada
  const btn = document.getElementById("confirmarExclusao");
  btn.classList.add("hidden");
  btn.disabled = true;
}

// Monitora o input de busca
document.getElementById('pesquisaExcluir').addEventListener('input', atualizarListaExcluir);

// Confirma a exclusão da receita selecionada
document.getElementById("confirmarExclusao").addEventListener("click", () => {
  const index = parseInt(document.getElementById("confirmarExclusao").dataset.index);
  if (!isNaN(index)) {
    receitas.splice(index, 1);           // Remove a receita da lista
    renderReceitas();                    // Atualiza a lista exibida
    fecharModalExcluir();                // Fecha o modal de exclusão

    const modalSucesso = document.getElementById("modalSucessoExcluir");
    modalSucesso.style.display = "flex"; // Mostra o aviso de sucesso

    setTimeout(() => {
      modalSucesso.style.display = "none";
    }, 2000); // Esconde o aviso após 2 segundos
  }
});

// Botão de abrir modal
document.getElementById("deleteRecipeBtn").addEventListener("click", abrirModalExcluir);






const modal = document.getElementById("modalAdicionar");
const abrirBtn = document.getElementById("abrirModalBtn"); // Botão para abrir o modal
const fecharBtn = document.getElementById("fecharModalBtn"); // Botão para fechar o modal
const form = document.getElementById("formReceita");

const ingredientesContainer = document.getElementById("ingredientesContainer");
const addIngredienteBtn = document.getElementById("addIngredienteBtn");

const modoContainer = document.getElementById("modoContainer");
const addPassoBtn = document.getElementById("addPassoBtn");

const unidades = [
  "g", "kg", "ml", "l", "colher", "colher de sopa", "colher de chá",
  "xícara", "unidade", "pitada"
];

// 🧩 Função para adicionar um ingrediente (quantidade, produto, unidade)
function adicionarIngrediente() {
  const div = document.createElement("div");
  div.className = "ingrediente-item";
  div.innerHTML = `
  <div class="input-container">
    <input type="text" placeholder="Produto" class="input-ingrediente produto" required>
    <input type="text" placeholder="Quantidade" class="input-ingrediente quantidade" required>
    <select class="input-ingrediente unidade" required>
      ${unidades.map(u => `<option value="${u}">${u}</option>`).join('')}
    </select>
    <button type="button" class="botao-acao botao-lixeira" onclick="removerIngrediente(this)">
      <span class="x-vermelho">❌</span>
    </button>
  </div>  
`;


  ingredientesContainer.appendChild(div);
}

// Função para remover ingrediente
function removerIngrediente(button) {
  const div = button.closest(".ingrediente-item");
  div.remove();
}

// 🧩 Função para adicionar um passo no modo de preparo
function adicionarPasso() {
  const index = modoContainer.children.length + 1;
  const div = document.createElement("div");
  div.className = "passo-item";
  div.innerHTML = `
  <div class="input-container">
    <span>${index}.</span>
    <textarea placeholder="Descreva o passo..." required></textarea>
    <button type="button" class="botao-acao botao-lixeira" onclick="removerPasso(this)">
      <span class="x-vermelho">❌</span>
    </button>
  </div>  
  `;

  modoContainer.appendChild(div);
}

// Função para remover passo
function removerPasso(button) {
  const div = button.closest(".passo-item");
  div.remove();
  atualizarNumeracaoPassos();
}

// 🔁 Atualiza a numeração dos passos após remoção
function atualizarNumeracaoPassos() {
  document.querySelectorAll(".passo-item").forEach((el, i) => {
    el.querySelector("span").textContent = `${i + 1}.`;
  });
}

// 📥 Função para abrir o modal
abrirBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.style.display = "flex";

  // Limpa campos antigos e adiciona pelo menos um novo
  ingredientesContainer.innerHTML = "";
  modoContainer.innerHTML = "";
  adicionarIngrediente();
  adicionarPasso();
});

// ❌ Função para fechar o modal
fecharBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.style.display = "none";
});

// Clique fora do modal para fechar
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
});

// ➕ Botões de adicionar
addIngredienteBtn.addEventListener("click", adicionarIngrediente);
addPassoBtn.addEventListener("click", adicionarPasso);

// ✅ Submissão do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const novaReceita = {
    titulo: document.getElementById("titulo").value.trim(),
    tipo: document.getElementById("tipo").value,
    ingredientes: [],
    modoPreparo: [],
    tempoPreparo: document.getElementById("tempo").value.trim(),
    porcoes: document.getElementById("porcoes").value.trim()
  };

  // Ingredientes válidos
  document.querySelectorAll(".ingrediente-item").forEach(item => {
    const quantidade = item.querySelector(".quantidade").value.trim();
    const produto = item.querySelector(".produto").value.trim();
    const unidade = item.querySelector(".unidade").value;

    if (quantidade && produto && unidade) {
      novaReceita.ingredientes.push({ quantidade, produto, unidade });
    }
  });

  // Passos válidos
  document.querySelectorAll(".passo-item textarea").forEach(textarea => {
    const texto = textarea.value.trim();
    if (texto) {
      novaReceita.modoPreparo.push(texto);
    }
  });

  // ⚠️ Validação mínima
  if (novaReceita.ingredientes.length === 0 || novaReceita.modoPreparo.length === 0) {
    alert("Adicione pelo menos um ingrediente e um passo válido.");
    return;
  }

  // Salvar a receita (ou enviar para backend)
  console.log("✅ Receita adicionada:", novaReceita);

  // Resetar e fechar modal
  form.reset();
  modal.classList.add("hidden");
  modal.style.display = "none";
});






// Atualiza as receitas ao digitar na busca
searchInput.addEventListener('input', renderReceitas);

// Atualiza as receitas ao trocar o filtro de tipo
typeFilter.addEventListener('change', renderReceitas);

// Renderiza inicialmente todas as receitas
renderReceitas();
