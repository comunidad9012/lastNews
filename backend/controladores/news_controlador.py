from flask import Blueprint, request, current_app
from models.modelNews import NewsModel

news_bp = Blueprint('news', __name__, url_prefix='/news')

@news_bp.post("/createNews")
def create_news():

    data = request.json

    news_model = NewsModel(current_app)
    
    response = news_model.create_news(data)

    return response

@news_bp.post("/showNews")
def show_news():
    news_model=NewsModel(current_app)
    response=news_model.show_news()
    return response

@news_bp.get("/viewNews")
def specific_new():
    id=request.args.get('id')
    news_model=NewsModel(current_app)
    response=news_model.specific_new(id)
    return response