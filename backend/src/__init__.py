from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'db'))
if not os.path.exists(db_path):
    os.makedirs(db_path)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.join(db_path, 'db.sqlite')

db = SQLAlchemy(app)    