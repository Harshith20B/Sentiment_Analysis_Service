from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from config.db import get_db

auth = Blueprint("auth", __name__)
db = get_db()
user_model = User(db)

@auth.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if user_model.find_by_username(data["username"]):
        return jsonify({"error": "User already exists"}), 400

    user_model.create_user(data["username"], data["password"])
    return jsonify({"message": "User created successfully"}), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    user = user_model.find_by_username(data["username"])
    if not user or not user_model.check_password(user["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity={"username": user["username"]})
    return jsonify({"token": token}), 200

@auth.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user['username']}!"})
