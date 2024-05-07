import os
from dotenv import load_dotenv
from flask import Flask
from controladores.user_controlador import user_bp
from controladores.news_controlador import news_bp
from flask_cors import CORS
from flask_pymongo import PyMongo

load_dotenv()

app = Flask(__name__, static_folder='../frontNewProyect/public', static_url_path='/')
cors_app = CORS(app)


app.config['MONGO_URI']= os.getenv('MONGOURL')
mongo = PyMongo(app)


app.config['CORS_HEADERS'] = 'Content-Type'
app.config['Access-Control-Allow-Credentials'] = "true"

app.register_blueprint(user_bp)
app.register_blueprint(news_bp)

if __name__ == "__main__":
    app.run(debug=True)
