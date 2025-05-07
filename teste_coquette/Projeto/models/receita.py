# Representa a entidade Receita com os dados do banco
class Receita:
    def __init__(self, id, nome, porcao, tempo_preparo, tipo):
        self.id = id
        self.nome = nome
        self.porcao = porcao
        self.tempo_preparo = tempo_preparo
        self.tipo = tipo

class Preparos:
    def __init__(self, id, etapa, descricao, id_receita):
        self.id = id
        self.etapa = etapa
        self.descricao = descricao
        self.id_receita = id_receita
