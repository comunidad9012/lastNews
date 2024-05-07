from flask import Blueprint, request, current_app
from models.modelUser import UserModel

user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.post("/createUser")
def create_user():
    name = request.form.get("nombre")
    user = request.form.get("usuario")
    password = request.form.get("contraseña")
    email = request.form.get("mail")

    user_model = UserModel(current_app)
    response = user_model.create_user(name, user, password, email)

    return response
