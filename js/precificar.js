const usuario = "Ana";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;

const receitas = [
  {
    titulo: 'Bolo de Cenoura', tipo: 'doce',
    ingredientes: [
      { produto: 'Cenoura', quantidade: '2', unidade: 'unidades' },
      { produto: 'Açúcar', quantidade: '2', unidade: 'xícaras' },
      { produto: 'Farinha de trigo', quantidade: '2', unidade: 'xícaras' }
    ]
  },
  {
    titulo: 'Pão Caseiro', tipo: 'salgado',
    ingredientes: [
      { produto: 'Farinha de trigo', quantidade: '5', unidade: 'xícaras' },
      { produto: 'Água', quantidade: '300', unidade: 'ml' },
      { produto: 'Fermento', quantidade: '10', unidade: 'g' }
    ]
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
      <div class="recipe-bottom">
        <div class="recipe-type">
          <img src="${icons[r.tipo]}" alt="${r.tipo}">
          <span>${r.tipo.charAt(0).toUpperCase() + r.tipo.slice(1)}</span>
        </div>
        <div class="recipe-price">
          <img class="price-icon" src="static/imagens/cifrao.png" alt="Ícone de preço">
          <span class="price-value">R$ ${r.preco || 'N/A'}</span>
        </div>
      </div>
    `;
    card.onclick = () => abrirModalPrecificar(r);

    // Adiciona o card na lista de receitas
    recipesList.appendChild(card);
  });
}

let receitaAtual = null;

function abrirModalPrecificar(receita) {
  receitaAtual = receita;
  document.getElementById('tituloReceitaModal').textContent = receita.titulo;

  const container = document.getElementById('ingredientesFormulario');
  container.innerHTML = ''; // Limpa o modal

  receita.ingredientes.forEach((ingrediente, index) => {
    const row = document.createElement('div');
    row.className = 'ingredient-row';

    row.innerHTML = `
      <div class="ingredient-name">${ingrediente.produto}</div>
      <div class="ingredient-price">
        <input type="number" min="0" step="0.01" placeholder="Preço" class="price-input" id="valor-${index}">
      </div>
      <div class="equal-sign"></div>
      <div class="ingredient-quantity">
        <input type="number" min="0" placeholder="Qtd" class="quantity-input" id="quantidade-${index}">
        <span class="unit-text">${ingrediente.unidade}</span>
      </div>
    `;

    container.appendChild(row);
  });

  document.getElementById('modalPrecificar').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modalPrecificar').style.display = 'none';
}

// Função para confirmar o preço da receita
function confirmarPreco() {
  let total = 0;
  receitaAtual.ingredientes.forEach((ingrediente, index) => {
    const valor = parseFloat(document.getElementById(`valor-${index}`).value.replace(',', '.')) || 0;
    const quantidade = parseFloat(document.getElementById(`quantidade-${index}`).value.replace(',', '.')) || 1;
    const qtdUsada = parseFloat(ingrediente.quantidade) || 0;
    if (quantidade !== 0) {
      total += (valor / quantidade) * qtdUsada;
    }
  });

  const precoFinal = total.toFixed(2);
  receitaAtual.preco = precoFinal;
  fecharModal();
  renderReceitas();

  // Mostra a caixinha com o preço
  const caixa = document.getElementById('precoCaixa');
  const mensagem = document.getElementById('mensagemPreco');
  mensagem.textContent = `Preço total da receita: R$ ${precoFinal}`;
  caixa.style.display = 'flex';

  // Esconde a caixinha depois de 4 segundos
  setTimeout(() => {
    caixa.style.display = 'none';
  }, 4000);
}


// Atualiza as receitas ao digitar na busca
searchInput.addEventListener('input', renderReceitas);

// Atualiza as receitas ao trocar o filtro de tipo
typeFilter.addEventListener('change', renderReceitas);

// Renderiza inicialmente todas as receitas
renderReceitas();
