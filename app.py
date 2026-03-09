from flask import Flask, jsonify, render_template
from productos import LISTA_PRODUCTOS

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/productos')
def get_productos():
    return jsonify(LISTA_PRODUCTOS)

if __name__ == '__main__':
    app.run(debug=True)