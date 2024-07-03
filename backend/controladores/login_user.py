from flask import Blueprint, request, current_app, jsonify,current_app
from models.modelUser import UserModel
import json
from flask_cors import CORS
import pymongo
import flask_login


db= pymongo.MongoClient("mongodb://localhost:27017")
mydb=db["lastNews"]
coleccion=mydb["users"]


user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.post("/login")
def login():
    data=request.json

    email=data['email']
    passw=data['password']

    user=coleccion.find_one({"email":email, "password":passw})

    if user:
        return jsonify({"ingreso":" PUEDE INGRESAR "} )

    else:
        return jsonify({"ingreso":" NO PUEDE INGRESAR, REGISTRESE "})


@user_bp.post("/logout")
def logout():
    flask_login.logout_user()
    return 'Logged out'
