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
        utensilios: ['Forma de bolo', 'Liquidificador'],
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
        utensilios: ['Forma de pão', 'Panela'],
        tempoPreparo: '1 hora e 30 minutos',
        porcoes: '12 porções'
      }
    ];

    const icons = {
      doce: 'static/imagens/bolo.png',
      salgado: 'static/imagens/coxa_frango.png',
      outros: 'static/imagens/outros.png'
    };

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

    addRecipeBtn.addEventListener('click', () => {
      alert('Funcionalidade de adicionar receita ainda não implementada.');
    });

    deleteRecipeBtn.addEventListener('click', () => {
      alert('Funcionalidade de excluir receita ainda não implementada.');
    });

    function renderReceitas() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedType = typeFilter.value;

      recipesList.innerHTML = '';

      const filtradas = receitas.filter(r => {
        const matchTitulo = r.titulo.toLowerCase().includes(searchTerm);
        const matchTipo = selectedType === 'todos' || r.tipo === selectedType;
        return matchTitulo && matchTipo;
      });

      if (filtradas.length === 0) {
        recipesList.innerHTML = '<p>Nenhuma receita encontrada.</p>';
        return;
      }

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

          modalUtensils.innerHTML = '';
          r.utensilios.forEach(u => {
            const li = document.createElement('li');
            li.textContent = u;
            modalUtensils.appendChild(li);
          });

          modalPreparation.innerHTML = '';
          r.modoPreparo.forEach((passo) => {
            const li = document.createElement('li');
            li.textContent = passo;
            modalPreparation.appendChild(li);
          });

          recipeModal.style.display = 'flex';
        });

        recipesList.appendChild(card);
      });
    }

    closeModal.addEventListener('click', () => {
      recipeModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === recipeModal) {
        recipeModal.style.display = 'none';
      }
    });

    searchInput.addEventListener('input', renderReceitas);
    typeFilter.addEventListener('change', renderReceitas);

    renderReceitas();
