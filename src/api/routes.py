"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, User
from api.utils import generate_sitemap, APIException, get_hash
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    found_user = User.query.filter_by(email=email, password=get_hash(password)).one_or_none()
    
    if found_user is None:
        return "email or password incorrect", 400
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/any-route", methods=["GET"])
@jwt_required()
def any_name():
    # Access the identity of the current user with get_jwt_identity
    user_email = get_jwt_identity()
    found_user = User.query.filter_by(email=user_email).one_or_none()

    if found_user is None:
        "user couldn't be found, please contact the admin", 500

    return found_user.serialize(), 200

@api.route("/get-hash", methods=["POST"])
def handle_get_hash():
    to_hash = request.json.get("string")
    return get_hash(to_hash)
