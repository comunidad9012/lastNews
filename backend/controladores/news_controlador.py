from flask import Blueprint, request, current_app
from models.modelNews import NewsModel

news_bp = Blueprint('news', __name__, url_prefix='/news')

@news_bp.post("/createNews")
def create_news():

    data = request.json

    news_model = NewsModel(current_app)
    
    response = news_model.create_news(data)

    return response

# arreglar que si o si tiene que tener contenido la noticia para crearla