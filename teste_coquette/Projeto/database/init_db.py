# Executar uma vez para criar o banco com um usuário de exemplo
import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS Usuario (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    email TEXT,
    senha TEXT,
    foto TEXT
            )
        """)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Receita (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    porcao INTEGER,
    tempo_preparo INTEGER,
    tipo TEXT
            )
        """)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuario_receita (
    usuario_id INTEGER,
    receita_id INTEGER,
    PRIMARY KEY (usuario_id, receita_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (receita_id) REFERENCES Receita(id)
            )
        """)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Ingredientes (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    quantidade REAL,
    unidade TEXT,
    id_receita_FK INTEGER
            )
        """)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Cardapio (
    id INTEGER PRIMARY KEY,
    refeicoes_Cardapio_FK INTEGER,
    id_usuario_FK INTEGER
            )
        """)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Refeicoes_Cardapio (
    id INTEGER PRIMARY KEY,
    dia_semana TEXT,
    tipo TEXT,
    id_receita_FK INTEGER
            )
        """)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Preparos (
    id INTEGER PRIMARY KEY,
    etapa INTEGER,
    descricao TEXT,
    id_receita_FK INTEGER,
    FOREIGN KEY (id_receita_FK) REFERENCES Receita(id)
            )
        """)

conn.commit()
conn.close()




