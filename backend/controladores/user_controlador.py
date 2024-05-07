from flask import Blueprint, request, current_app, jsonify,current_app
from models.modelUser import UserModel
import json
from flask_cors import CORS
import pymongo 

db= pymongo.MongoClient("mongodb://localhost:27017")
mydb=db["lastNews"]
coleccion=mydb["users"]


user_bp = Blueprint('user', __name__, url_prefix='/user')
@user_bp.post("/createUser")
def create_user():

    data = request.json
    print("email form", data["email"])

    #traer todos los usuarios y comparar si existe el mail
    documentos={}
    users=coleccion.find()
    
    for documentos in users:# la idea es comparar el diccionario que se forma con el FORM (data) y el diccionario en la base de datos
        if data["email"] == documentos["email"]:
            print("mismo email, ya tenes usuario")
            break
        
    name = data["name"]
    user = data["user"]
    password = data["password"]
    email = data["email"]

    
    user_model = UserModel(current_app)


    try:
        response = user_model.create_user(name, user, password, email)
        return jsonify({response})
        print("creacion exitosa!")
    
    except Exception as e:
        return jsonify({e})
    


