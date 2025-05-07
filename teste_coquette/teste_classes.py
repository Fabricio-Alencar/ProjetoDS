from init_db import BancoDeDados # e outras classes que quiser usar
import sqlite3
from receita.py import Receita
from usuario.py import Usuario
from preparos.py import Preparo
from ingredientes.py import Ingredientes
from cardapio.py import Cardapio

class Refeicoes_Cardapio:
    def __init__(self, id, dia_semana, tipo):
        self.id = id
        self.dia_semana = dia_semana
        self.tipo = tipo


if __name__ == "__main__":
    banco = BancoDeDados()

    # Limpeza das tabelas para garantir teste limpo
    banco.cursor.execute("DELETE FROM Usuario")
    banco.cursor.execute("DELETE FROM Receita")
    banco.cursor.execute("DELETE FROM Amizade")
    banco.cursor.execute("DELETE FROM usuario_receita")
    banco.cursor.execute("DELETE FROM Preparos")
    banco.conn.commit()

    # Criar usuários
    banco.cursor.execute("INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)", ("Maria", "maria@email.com", "123"))
    banco.cursor.execute("INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)", ("João", "joao@email.com", "456"))
    banco.conn.commit()

    banco.cursor.execute("SELECT * FROM Usuario WHERE email = 'maria@email.com'")
    dados_maria = banco.cursor.fetchone()
    banco.cursor.execute("SELECT * FROM Usuario WHERE email = 'joao@email.com'")
    dados_joao = banco.cursor.fetchone()

    maria = Usuario(*dados_maria)
    joao = Usuario(*dados_joao)

    # Criar e salvar receita
    banco.cursor.execute("""
        INSERT INTO Receita (nome, porcao, tempo_preparo, tipo) 
        VALUES (?, ?, ?, ?)
    """, ("Bolo de Morango", 10, 60, "Doce"))
    banco.conn.commit()

    receita_id = banco.cursor.lastrowid
    receita_bolo = Receita(receita_id, "Bolo de Morango", 10, 60, "Doce")

    # Etapas de preparo
    etapas = [
        ("Pré-aqueça o forno a 180°C.", 1),
        ("Misture os ingredientes secos.", 2),
        ("Adicione os líquidos e bata.", 3)
    ]

    for idx, (desc, etapa_num) in enumerate(etapas, start=1):
        banco.cursor.execute("""
            INSERT INTO Preparos (id, etapa, descricao, id_receita_FK)
            VALUES (?, ?, ?, ?)
        """, (idx, etapa_num, desc, receita_bolo.id))
    banco.conn.commit()

    # Maria salva e compartilha a receita com João
    maria.salvar_receita(receita_bolo.id, banco)
    maria.compartilhar_receita(banco, joao, receita_bolo.id)

    print("\n--- Receitas de Maria ---")
    maria.listar_receitas(banco)

    print("\n--- Receitas de João ---")
    joao.listar_receitas(banco)

    print("\n--- Receitas compartilhadas com João ---")
    joao.visualizar_receitas_compartilhadas_comigo(banco)

    print("\n--- Etapas de preparo da receita ---")
    banco.cursor.execute("""
        SELECT etapa, descricao FROM Preparos 
        WHERE id_receita_FK = ? ORDER BY etapa
    """, (receita_bolo.id,))
    etapas_result = banco.cursor.fetchall()
    for etapa, desc in etapas_result:
        print(f"Etapa {etapa}: {desc}")

print("testado")
    


