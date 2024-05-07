from flask_pymongo import PyMongo
    
class NewsModel:
    def __init__(self, app):
        self.mongo = PyMongo(app)

    def create_news(self, data):
        if 'noticia' in data:
            news_data = {'noticia': data['noticia']}
            self.mongo.db.news.insert_one(news_data)
            return {"contenido": "exitoso"}
        else:
            return {"contenido": "no funciona"}