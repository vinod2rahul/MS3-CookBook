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

# @route http://localhost:8000/
# @desc HomePage route
@app.route('/', methods=['GET'])
def Index():
    return render_template('index.html')

# @route http://localhost:8000/recipes/add
# @desc Add a recipe
@app.route('/recipes/add', methods = ['GET', 'POST'])
def add_recipe():
    if request.method == 'POST' :
        json_data = request.json
        name = json_data['name']
        ingredients = json_data['ingredients']
        prepsteps = json_data['prepsteps']
        tools = json_data['tools']
        if name != '' and ingredients != '' and prepsteps != '' and tools != '':
            response = jsonify({ 'message' : 'Recipe Added Successfully' })
            response.status_code = 200
            return response
        else:
            # Bad Request
            response = jsonify({ 'message' : 'All Fields are Required' })
            response.status_code = 400
            return response
    return render_template('addRecipe.html')

if __name__ == '__main__':
    app.run(debug = True, port=8000)