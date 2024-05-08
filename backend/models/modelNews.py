from flask_pymongo import PyMongo
from flask import Response
from bson import json_util
from bson.objectid import ObjectId
    
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
        
    def show_news(self):
        news=self.mongo.db.news.find()
        response=json_util.dumps(news)
        return Response(response, mimetype="application/json")

    def specific_new(self,id):
        news=self.mongo.db.news.find_one({'_id': ObjectId(id), })
        response=json_util.dumps(news)
        return Response(response, mimetype="application/json")