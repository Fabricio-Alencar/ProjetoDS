// Definir o usuário e exibir a mensagem de boas-vindas
const usuario = document.getElementById('usuarioTitulo').dataset.nome || "Usuário";
document.getElementById('usuarioTitulo').textContent = `Olá, ${usuario}!`;

// Função que representa o planejamento do menu
function menuPlanner() {
  return {
    dias: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],

    // Cardápio com IDs das receitas
    cardapio: {
      Segunda: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Terça: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Quarta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Quinta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Sexta: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Sábado: { 'Café da Manhã': [], Almoço: [], Jantar: [] },
      Domingo: { 'Café da Manhã': [], Almoço: [], Jantar: [] }
    },

    mostrarModal: false,
    mostrarModalCompras: false,
    novoDia: 'Segunda',
    novaRefeicao: 'Café da Manhã',
    novasReceitas: [''], // Array com IDs (string) das receitas

    listaDeCompras: [],
    receitasUsuario: [], // Carregado do servidor

    obterTituloPorId(id) {
      const receita = this.receitasUsuario.find(r => r.id.toString() === id.toString());
      return receita ? receita.titulo : '';
    },

    agruparReceitas(receitas) {
      const grupos = {};
    
      for (const id of receitas) {
        const titulo = this.obterTituloPorId(id);
        if (!grupos[titulo]) {
          grupos[titulo] = [];
        }
        grupos[titulo].push(id);
      }
    
      return grupos;
    },
    
    //============================= MODAL ====================================
    abrirModalAdicionar() {
      this.mostrarModal = true;
    },
    adicionarLinhaReceita() {
      this.novasReceitas.push('');
    },
    removerLinhaReceita(index) {
      this.novasReceitas.splice(index, 1);
    },

    //===================== RECEITAS NO CARDÁPIO =============================
    async adicionarReceita() {
      for (const receitaId of this.novasReceitas) {
        if (!receitaId.trim()) continue;

        const dia = this.novoDia;
        const refeicao = this.novaRefeicao;

        // Evita duplicidade local
        if (!this.cardapio[dia][refeicao].includes(receitaId)) {
          try {
            const res = await fetch('/cardapio/adicionar', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ receita_id: receitaId, dia, refeicao })
            });
            const dados = await res.json();
            if (dados.sucesso) {
              this.cardapio[dia][refeicao].push(receitaId);
              this.exibirCardapio(); // Atualiza a visualização do cardápio
            } else {
              alert("Erro ao adicionar receita: " + dados.mensagem);
            }
          } catch (error) {
            console.error("Erro ao adicionar receita:", error);
            alert("Erro ao adicionar receita. Tente novamente.");
          }
        }
      }

      this.novasReceitas = [''];
      this.mostrarModal = false;
    },

    //=========================== REMOVER CARDAPIO ======================================
    async removerReceita(dia, refeicao, index) {
      const receitaId = this.cardapio[dia][refeicao][index];
      try {
        const res = await fetch('/api/cardapio/excluir', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ receita_id: receitaId, dia, refeicao })
        });
        const dados = await res.json();
        if (dados.sucesso) {
          this.cardapio[dia][refeicao].splice(index, 1);
          this.exibirCardapio(); // Atualiza a visualização do cardápio
        } else {
          alert("Erro ao remover receita: " + dados.mensagem);
        }
      } catch (error) {
        console.error("Erro ao remover receita:", error);
        alert("Erro ao remover receita. Tente novamente.");
      }
    },

    //=========================== AUTOCOMPLETE ======================================
    filtrarReceitas(index) {
      const termo = this.novasReceitas[index].toLowerCase();
      return this.receitasUsuario.filter(r => {
        return (
          r.titulo.toLowerCase().includes(termo) &&
          !this.novasReceitas.includes(r.id.toString())
        );
      });
    },

    //=========================LISTA DE COMPRAS ======================================
    gerarListaCompras() {
      const ingredientesTotais = {};

      for (const dia of this.dias) {
        for (const refeicao of ['Café da Manhã', 'Almoço', 'Jantar']) {
          for (const id of this.cardapio[dia][refeicao]) {
            const receita = this.receitasUsuario.find(r => r.id === parseInt(id));
            if (!receita) continue;

            for (const ingrediente of receita.ingredientes) {
              const chave = `${ingrediente.produto}|${ingrediente.unidade}`; // Corrigido
              const qtd = parseFloat(ingrediente.quantidade.replace(',', '.')) || 0;
              ingredientesTotais[chave] = (ingredientesTotais[chave] || 0) + qtd;
            }
          }
        }
      }

      return Object.entries(ingredientesTotais).map(([chave, qtd]) => {
        const [produto, unidade] = chave.split('|');
        return `${qtd} ${unidade} de ${produto}`; // Corrigido
      });
    },

    abrirModalCompras() {
      this.listaDeCompras = this.gerarListaCompras();
      this.mostrarModalCompras = true;
    },

    //========================== INICIALIZAÇÃO ====================================
    async carregarReceitas() {
      try {
        const res = await fetch('/api/receitas');
        if (res.ok) {
          this.receitasUsuario = await res.json();
        } else {
          alert("Erro ao carregar receitas.");
        }
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
        alert("Erro ao carregar receitas. Tente novamente.");
      }
    },

    async carregarCardapio() {
      try {
        const res = await fetch('/api/cardapio');
        if (res.ok) {
          const dadosCardapio = await res.json();
          console.log("Cardápio recebido:", dadosCardapio);  // Verifique se os dados estão corretos
          this.cardapio = dadosCardapio;
          this.exibirCardapio(); // Exibe o cardápio ao carregar
        } else {
          alert("Erro ao carregar o cardápio {1}.");
        }
      } catch (error) {
        console.error("Erro ao carregar o cardápio {2}:", error);
        alert("Erro ao carregar o cardápio. Tente novamente.");
      }
    },

    exibirCardapio() {
      const normalizarTipo = tipo => tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
    
      for (const dia in this.cardapio) {
        for (const tipo in this.cardapio[dia]) {
          const tipoNormalizado = normalizarTipo(tipo);
          const idElemento = `${dia}-${tipoNormalizado}`;
          const container = document.getElementById(idElemento);
    
          if (!container) {
            console.warn(`Elemento com id ${idElemento} não encontrado no DOM.`);
            continue;
          }
    
          const receitas = this.cardapio[dia][tipo];
          container.innerHTML = ''; // Limpa antes de adicionar
    
          if (receitas.length === 0) {
            container.innerHTML = '<span>Nenhuma receita adicionada.</span>'; // Mensagem para receitas vazias
          } else {
            receitas.forEach(receita => {
              const titulo = this.obterTituloPorId(receita);
              if (titulo) {
                const item = document.createElement('div');
                item.textContent = titulo; // Exibe o título da receita
                container.appendChild(item);
              } else {
                console.warn('Receita inválida ou sem nome:', receita);
              }
            });
          }
        }
      }
    }
    ,
    
    async init() {
      await this.carregarReceitas();
      await this.carregarCardapio();
    }
  };
}
