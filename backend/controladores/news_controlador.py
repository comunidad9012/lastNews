from flask import Blueprint, request, current_app, render_template
from models.modelNews import NewsModel

news_bp = Blueprint('news', __name__, url_prefix='/news')

@news_bp.post("/createNews")
def create_news():

    data = request.json

    news_model = NewsModel(current_app)
    
    response = news_model.create_news(data)

    return response

# arreglar que si o si tiene que tener contenido la noticia para crearla

@news_bp.get("/showNews") #CAMBIE LA PETICION POST POR GET, YA QUE CON ESTO QUEREMOS TRAER LOS DATOS EN EL FRONT
def show_news():
    news_model=NewsModel(current_app)
    response=news_model.show_news()
    return response

@news_bp.get("/viewNews/<id>")
def specific_new(id):
    news_model=NewsModel(current_app)
    response=(news_model.specific_new(id)).json
    #noticia = response.get('noticia')
    return render_template("view.html", respuesta=response)