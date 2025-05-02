const usuario = "Ana";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;


/*
document.addEventListener('alpine:init', () => {
  Alpine.data('menuPlanner', () => ({
    dias: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    refeicoes: ['Café da Manhã', 'Almoço', 'Jantar'],
    cardapio: {},
    mostrarModal: false,
    diaSelecionado: '',
    refeicaoSelecionada: '',
    novaReceita: '',

    init() {
      this.dias.forEach(dia => {
        this.cardapio[dia] = {
          'Café da Manhã': [],
          'Almoço': [],
          'Jantar': []
        };
      });
    },

    abrirModal(dia, refeicao) {
      this.diaSelecionado = dia;
      this.refeicaoSelecionada = refeicao;
      this.mostrarModal = true;
      this.novaReceita = '';
    },

    adicionarReceita() {
      if (this.novaReceita.trim()) {
        this.cardapio[this.diaSelecionado][this.refeicaoSelecionada].push(this.novaReceita);
        this.mostrarModal = false;
      }
    },

    removerItem(dia, refeicao, index) {
      this.cardapio[dia][refeicao].splice(index, 1);
    }
  }))
});

*/


function menuPlanner() {
    return {
      dias: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
      cardapio: {
        Segunda: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
        Terça: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
        Quarta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
        Quinta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
        Sexta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
        Sábado: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
        Domingo: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      },
      mostrarModal: false,  // Modal inicia oculto
      novoDia: 'Segunda',
      novaRefeicao: 'Café da Manhã',
      novasReceitas: [''],
      receitasUsuario: ['Omelete', 'Salada', 'Macarrão', 'Tapioca'],
      
      // Função que abre o modal ao clicar no botão
      abrirModalAdicionar() {
        this.mostrarModal = true;  // Abre o modal
        this.novasReceitas = [''];  // Reseta as receitas
        console.log(this.cardapio); // Verificar o conteúdo de cardápio
      },
    
      // Função que adiciona um campo para uma nova receita
      adicionarLinhaReceita() {
        this.novasReceitas.push(''); 
      },
    
      // Função que remove uma receita
      removerLinhaReceita(index) {
        this.novasReceitas.splice(index, 1);  // Remove a receita do array
      },
    
      // Função que adiciona as receitas selecionadas ao cardápio
      adicionarReceita() {
        this.novasReceitas.forEach(receita => {
          const limpa = receita.trim();
          if (limpa && this.receitasUsuario.includes(limpa)) {
            this.cardapio[this.novoDia][this.novaRefeicao].push(limpa); // Adiciona a receita ao cardápio
          }
        });
        this.novasReceitas = [''];  // Reseta as receitas
        this.mostrarModal = false;  // Fecha o modal
        console.log(this.cardapio); // Verificar o conteúdo de cardápio após adicionar
      },
  
      // Função que remove uma receita do cardápio
      removerItem(dia, refeicao, index) {
        this.cardapio[dia][refeicao].splice(index, 1); // Remove a receita específica
        console.log(this.cardapio); // Verificar o conteúdo de cardápio após remoção
      }
    };
}
