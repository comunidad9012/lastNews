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
    email=data["email"]

    #traer todos los usuarios y comparar si hay coincidencia con el usuario recien ingresado el mail
 
    user=coleccion.find_one({"email":email})

    if user:
        print("hay coincidencia, ya existe esa cuenta")
        #aca hacer un return al registro y mostrar algun tipo de alerta
            
    else:
        name = data["name"]
        user = data["user"]
        password = data["password"]
        email = data["email"]

    
        user_model = UserModel(current_app)


        try:
            response = user_model.create_user(name, user, password, email)
            return jsonify({response})
            print("creacion exitosa!")
            #mostrar cartel de EXITO
        except Exception as e:
            return jsonify({e})
    


