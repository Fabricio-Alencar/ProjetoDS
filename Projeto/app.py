from flask import Flask, render_template, request, redirect, url_for, session
from dao.usuario_dao import UsuarioDAO
from models.usuario import Usuario

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'
usuario_dao = UsuarioDAO()

@app.route('/')
def index():
    if 'usuario_id' in session:
        return render_template('home.html', nome=session['usuario_nome'])
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
            return redirect(url_for('index'))
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

if __name__ == '__main__':
    app.run(debug=True)
