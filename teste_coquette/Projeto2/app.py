from flask import (
    Flask, render_template, request,
    redirect, url_for, session, jsonify
)
from models.receita import Receita, Preparos, Ingrediente
from models.usuario import Usuario
from dao.receita_dao import ReceitaDAO
from dao.usuario_dao import UsuarioDAO



print("Iniciando o aplicativo Flask...")
app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'
usuario_dao = UsuarioDAO()
receita_dao = ReceitaDAO()


#=======================================ROTAS LOGIN===========================================
@app.route('/')
def index():
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        usuario = usuario_dao.buscar_por_email(email)
        if usuario and usuario.senha == senha:
            session['usuario_id'] = usuario.id
            session['usuario_nome'] = usuario.nome
            return redirect(url_for('minhas_receitas'))
        return "Login inválido", 401
    return render_template('login.html')


@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        senha = request.form['senha']

        if usuario_dao.buscar_por_email(email):
            return "Email já cadastrado", 400

        novo_usuario = Usuario(None, nome, email, senha)
        usuario_dao.inserir(novo_usuario)
        return redirect(url_for('login'))

    return render_template('cadastro.html')


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))





#=======================================ROTAS MINHAS RECEITAS===========================================

@app.route('/minhas_receitas')
def minhas_receitas():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    return render_template('minhas_receitas.html', nome_usuario=session['usuario_nome'])



@app.route('/api/receitas', methods=['POST'])
def api_adicionar_receita():
    if 'usuario_id' not in session:
        return jsonify({'erro': 'Não autenticado'}), 401
    dados = request.json
    usuario_id = session['usuario_id']
    receita = Receita(None, dados['titulo'], dados['porcoes'], dados['tempoPreparo'], dados['tipo'], None)
    ingredientes = [
        Ingrediente(None, i['produto'], float(i['quantidade']), i['unidade'], None)
        for i in dados['ingredientes']
    ]

    preparos = [
        Preparos(None, idx + 1, passo, None)
        for idx, passo in enumerate(dados['modoPreparo'])
    ]

    receita_dao.inserir(receita, ingredientes, preparos, usuario_id)

    return jsonify({'mensagem': 'Receita adicionada com sucesso'})


@app.route('/api/receitas/<int:receita_id>', methods=['DELETE'])
def api_excluir_receita(receita_id):
    if 'usuario_id' not in session:
        return jsonify({'erro': 'Não autenticado'}), 401

    receita_dao.excluir(receita_id)
    return jsonify({'mensagem': 'Receita excluída com sucesso'})

#=======================================ROTAS PRECIFICAR===========================================

@app.route('/precificar')
def precificacao():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    return render_template('precificar.html', nome_usuario=session['usuario_nome'])

@app.route('/atualizar_preco', methods=['POST'])
def atualizar_preco():
    data = request.json
    receita_id = data['receita_id']
    preco_total = data['preco_total']

    receita_dao.atualizar_preco(preco_total, receita_id)
    return jsonify({'status': 'sucesso', 'preco': preco_total})


#=======================================ROTAS MEU PERFIL===========================================

@app.route('/meu_perfil')
def perfil():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    return render_template('meu_perfil.html', nome_usuario=session['usuario_nome'])


@app.route('/atualizar_conta', methods=['POST'])
def atualizar_conta():
    data = request.json
    receita_id = data.get('receita_id')
    preco_total = data.get('preco_total')

    receita_dao.atualizar_preco(preco_total, receita_id)
    return jsonify({'status': 'sucesso', 'preco': preco_total})


@app.route('/excluir_conta', methods=['POST'])
def excluir_conta():
    data = request.json
    usuario_id = data.get('usuario_id')

    usuario_dao.excluir(usuario_id)
    return jsonify({'status': 'conta excluída'})


@app.route('/api/usuario', methods=['GET'])
def api_listar_receitas():
    if 'usuario_id' not in session:
        return jsonify({'erro': 'Não autenticado'}), 401

    usuario_id = session['usuario_id']
    receitas = receita_dao.listar_por_usuario(usuario_id)

    receitas_json = []
    for r in receitas:
        receita = r['receita']
        ingredientes = r['ingredientes']
        preparos = r['preparos']

        receitas_json.append({
            'id': receita.id,
            'titulo': receita.nome,
            'tipo': receita.tipo,
            'preco': receita.preco,
            'tempoPreparo': receita.tempo_preparo,
            'porcoes': receita.porcao,
            'ingredientes': [{
                'produto': ing.nome,
                'quantidade': ing.quantidade,
                'unidade': ing.unidade
            } for ing in ingredientes],
            'modoPreparo': [prep.descricao for prep in sorted(preparos, key=lambda p: p.etapa)]
        })

    return jsonify(receitas_json)

#===================================API´S (BUSCAR INFOS NO BD)==========================================

@app.route('/api/receitas', methods=['GET'])
def api_listar_receitas():
    if 'usuario_id' not in session:
        return jsonify({'erro': 'Não autenticado'}), 401

    usuario_id = session['usuario_id']
    receitas = receita_dao.listar_por_usuario(usuario_id)

    receitas_json = []
    for r in receitas:
        receita = r['receita']
        ingredientes = r['ingredientes']
        preparos = r['preparos']

        receitas_json.append({
            'id': receita.id,
            'titulo': receita.nome,
            'tipo': receita.tipo,
            'preco': receita.preco,
            'tempoPreparo': receita.tempo_preparo,  
            'porcoes': receita.porcao,              
            'ingredientes': [{
                'produto': ing.nome,
                'quantidade': ing.quantidade,
                'unidade': ing.unidade
            } for ing in ingredientes],
            'modoPreparo': [prep.descricao for prep in sorted(preparos, key=lambda p: p.etapa)]
        })
            
    return jsonify(receitas_json)


@app.route('/api/usuario/<int:usuario_id>', methods=['GET'])
def buscar_usuario_por_id(usuario_id):
    usuario = usuario_dao.buscar_por_id(usuario_id)
    if usuario:
        return jsonify({
            'id': usuario.id,
            'nome': usuario.nome,
            'email': usuario.email,
            'foto': usuario.foto
        })
    else:
        return jsonify({'erro': 'Usuário não encontrado'}), 404




if __name__ == '__main__':
    app.run(debug=True)
