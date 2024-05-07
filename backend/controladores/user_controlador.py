from flask import Blueprint, request, current_app, jsonify,current_app
from models.modelUser import UserModel
import json
from flask_cors import CORS

user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.post("/createUser")
def create_user():
    data = request.get_json()

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

