# Import statements
from flask import Flask, jsonify, request, render_template

from flask_pymongo import PyMongo

from bson.objectid import ObjectId

#Global Declarations 
app = Flask(__name__)

# Database Configurations

# app.config['MONGO_URI'] = "http://localhost:8000"

# mongo = PyMongo(app)

# Application Routes
@app.route('/')
def Index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug = True, port=8000)