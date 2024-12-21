from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth import auth
from utils.token import setup_jwt

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
CORS(app)
setup_jwt(app)

# Register Blueprints
app.register_blueprint(auth, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True)
