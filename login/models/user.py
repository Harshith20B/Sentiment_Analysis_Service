from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, db):
        self.collection = db["users"]

    def create_user(self, username, password):
        hashed_password = generate_password_hash(password)
        user = {"username": username, "password": hashed_password}
        self.collection.insert_one(user)
        return user

    def find_by_username(self, username):
        return self.collection.find_one({"username": username})

    def check_password(self, hashed_password, password):
        return check_password_hash(hashed_password, password)
