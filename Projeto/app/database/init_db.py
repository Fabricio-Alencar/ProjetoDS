# Executar uma vez para criar o banco com um usuário de exemplo
import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
)
''')

cursor.execute("INSERT OR IGNORE INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
               ("João", "joao@email.com", "1234"))

conn.commit()
conn.close()
