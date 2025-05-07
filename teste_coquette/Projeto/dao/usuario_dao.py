import sqlite3
from models.usuario import Usuario

class UsuarioDAO:
    def __init__(self, db_path='database.db'):
        self.db_path = db_path

    def buscar_por_email(self, email):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE email = ?", (email,))
        row = cursor.fetchone()
        conn.close()
        return Usuario(*row) if row else None

    def inserir(self, usuario):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        """, (usuario.nome, usuario.email, usuario.senha))
        conn.commit()
        conn.close()
