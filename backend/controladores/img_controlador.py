import os
from flask import Blueprint, request, current_app, jsonify, send_from_directory
from models.modelNews import NewsModel
from werkzeug.utils import secure_filename

imgs_bp = Blueprint('imgs', __name__, url_prefix='/imgs')

@imgs_bp.post('/upload')
def upload_file():
    if 'file' in request.files:
        file = request.files['file']
        filename = secure_filename(file.filename)
        file.save(f"{current_app.config['UPLOAD_FOLDER']}/{filename}")
        file_url = f'http://localhost:5000/images/{filename}'
        return jsonify({'location': file_url})
    return jsonify({'error': 'No file part'}), 400