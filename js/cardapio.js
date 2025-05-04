// Definir o usuário e exibir a mensagem de boas-vindas
const usuario = "Ana";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;

// Função que representa o planejamento do menu
function menuPlanner() {
  return {
    // Dias da semana
    dias: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],

    // Cardápio da semana
    cardapio: {
      Segunda: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Terça: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Quarta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Quinta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Sexta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Sábado: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Domingo: { 'Café da Manhã': [], Almoço: [], Jantar: [] }
    },

    // Variáveis para controlar o estado do modal e inserção de receitas
    mostrarModal: false,
    novoDia: 'Segunda',
    novaRefeicao: 'Café da Manhã',
    novasReceitas: [''],  // Armazenar novas receitas a serem adicionadas

    // Receitas cadastradas pelo usuário
    receitasUsuario: [
      {
        titulo: 'Bolo de Cenoura',
        tipo: 'doce',
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
        titulo: 'Pão Caseiro',
        tipo: 'salgado',
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
    ],
  










// Função para adicionar uma receita ao cardápio
adicionarReceita() {
      this.novasReceitas.forEach(nome => {
        const limpa = nome.trim();
        if (limpa && !this.cardapio[this.novoDia][this.novaRefeicao].includes(limpa)) {
          this.cardapio[this.novoDia][this.novaRefeicao].push(limpa);
        }
      });

      // Resetar as receitas inseridas e fechar o modal
      this.novasReceitas = [''];
      this.mostrarModal = false;
    },

// Função para abrir o modal de adicionar receita
abrirModalAdicionar() {
      this.mostrarModal = true;
    },

// Função para adicionar uma linha de receita no modal
// Quando o usuario quer adicionar mais de uma receita por vez
adicionarLinhaReceita() {
      this.novasReceitas.push('');
    },

// Função para remover uma linha de receita no modal
// Se arrependeu da escolha de antes
removerLinhaReceita(index) {
      this.novasReceitas.splice(index, 1);
    },

// Função para filtrar as receitas disponíveis no autocomplete
filtrarReceitas(index) {
      const termo = this.novasReceitas[index].toLowerCase();
      return this.receitasUsuario.filter(r => {
        return r.titulo.toLowerCase().includes(termo) && !this.novasReceitas.includes(r.titulo);
      });
    },



// Remover a refeição do cardápio
removerReceita(dia, refeicao, index) {
      this.cardapio[dia][refeicao].splice(index, 1);
    },
    


// Função para gerar a lista de compras
gerarListaCompras() {
      const ingredientesTotais = {};

      // Itera sobre os dias e refeições, somando os ingredientes necessários
      for (const dia of this.dias) {
        for (const refeicao of ['Café da Manhã', 'Almoço', 'Jantar']) {
          for (const nomeReceita of this.cardapio[dia][refeicao]) {
            const receita = this.receitasUsuario.find(r => r.titulo === nomeReceita);
            if (!receita) continue;

            // Processa os ingredientes
            for (const ingrediente of receita.ingredientes) {
              const chave = `${ingrediente.produto}|${ingrediente.unidade}`;
              const quantidade = parseFloat(ingrediente.quantidade.replace(',', '.')) || 0;

              if (!ingredientesTotais[chave]) {
                ingredientesTotais[chave] = 0;
              }
              ingredientesTotais[chave] += quantidade;
            }
          }
        }
      }

      // Cria a lista final de compras
      const listaFinal = [];
      for (const chave in ingredientesTotais) {
        const [produto, unidade] = chave.split('|');
        listaFinal.push(`${ingredientesTotais[chave]} ${unidade} de ${produto}`);
      }

      console.log('Lista de Compras:', listaFinal);
      return listaFinal;
    },

// Variáveis para controlar o modal da lista de compras
mostrarModalCompras: false,
listaDeCompras: [],

// Função para abrir o modal de compras e gerar a lista
    abrirModalCompras() {
      this.listaDeCompras = this.gerarListaCompras();  // Gerar lista de compras ao abrir o modal
      this.mostrarModalCompras = true;
    }
  };
}