import sqlite3
from models.receita import Receita, Preparos

class ReceitaDAO:
    def __init__(self, db_path='database.db'):
        self.db_path = db_path

    def buscar_por_usuario_id(self, usuario_id):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        # Buscar o ID da receita associada ao usuário
        cursor.execute("SELECT receita_id FROM usuario_receita WHERE usuario_id = ?", (usuario_id,))
        result = cursor.fetchone()
        if not result:
            conn.close()
            return None
        receita_id = result[0]
        # Buscar os dados da receita
        cursor.execute("SELECT * FROM receita WHERE id = ?", (receita_id,))
        receita_row = cursor.fetchone()
        # Buscar os dados do preparo
        cursor.execute("SELECT * FROM preparo WHERE receita_id = ?", (receita_id,))
        preparo_row = cursor.fetchone()
        conn.close()
        receita = Receita(*receita_row) if receita_row else None
        preparo = Preparos(*preparo_row) if preparo_row else None
        return receita, preparo
