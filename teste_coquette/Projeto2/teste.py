from dao.usuario_dao import UsuarioDAO
from models.usuario import Usuario

# Criar instância do DAO
usuario_dao = UsuarioDAO()

# Criar objeto Usuario (id=None porque é autoincrementado no banco)
usuario_teste = Usuario(None, 'João Teste', 'joao@teste.com', '1234', None)

# Inserir no banco
usuario_dao.inserir(usuario_teste)

print("Usuário de teste criado com sucesso!")
