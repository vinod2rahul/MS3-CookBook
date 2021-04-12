# Import statements
from flask import Flask, jsonify, request, render_template, redirect

from flask_pymongo import PyMongo

from bson.objectid import ObjectId

from bson.json_util import dumps

#Global Declarations 
app = Flask(__name__)

# Database Configurations

app.config['MONGO_URI'] = "mongodb://127.0.0.1:27017/CookBook"

mongo = PyMongo(app)

# Application Routes

# @route http://localhost:8000/
# @desc Dashboard Page
@app.route('/', methods=['GET'])
def dashBoard():
    return render_template('dashboard.html')

# @route http://localhost:8000/menu
# @desc HomePage route and listing all recipes
@app.route('/menu', methods=['GET'])
def Index():
    return render_template('index.html')

# @route http://localhost:8000/api/result
# @desc HomePage route and listing all recipes
@app.route('/api/result', methods=['GET'])
def allRecipes():
    cursor = mongo.db.recipes.find()
    recipes = list(cursor)
    response = dumps(recipes)
    return response

# @route http://localhost:8000/recipes/<ObjectId:id>
# @desc get singleRecipe
@app.route('/recipes/<ObjectId:id>', methods=['GET'])
def SingleRecipe(id):
    recipe = mongo.db.recipes.find_one_or_404({ '_id' : id})
    return render_template('singleRecipe.html', recipe = recipe)


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
        price = json_data['price']
        desc = json_data['desc']
        if name != '' and ingredients != '' and prepsteps != '' and tools != '' and price != '' and desc != '':
            mongo.db.recipes.insert_one({
                'name' : name,
                'ingredients' : ingredients.split(','),
                'prepsteps' : prepsteps,
                'tools' : tools.split(','),
                'price' : price,
                'desc' : desc
            })
            response = jsonify({ 'message' : 'Recipe Added Successfully' })
            response.status_code = 200
            return response
        else:
            # Bad Request
            response = jsonify({ 'message' : 'All Fields are Required' })
            response.status_code = 400
            return response
    return render_template('addRecipe.html')

# @route http://localhost:8000/recipes/update/<ObjectId:id>
# @desc Update a recipe
@app.route('/recipes/update/<ObjectId:id>', methods = ['GET', 'PUT'])
def update_recipe(id):
    fetchRecipe = mongo.db.recipes.find_one_or_404({'_id' : id})
    if request.method == 'PUT':
        if(id != ''):
            json_data = request.json
            name = json_data['name']
            ingredients = json_data['ingredients']
            prepsteps = json_data['prepsteps']
            tools = json_data['tools']
            price = json_data['price']
            desc = json_data['desc']
            mongo.db.recipes.update_one({ '_id' : id},{ "$set" : {
                'name' : name,
                'ingredients' : ingredients.split(','),
                'prepsteps' : prepsteps,
                'tools' : tools.split(','),
                'price' : price,
                'desc' : desc
            }})
            response = jsonify({ 'message' : 'Document Updated successfully'})
            response.status_code = 200
            return response
        else:
            response = jsonify({ 'message' : 'Error : error while fetching'})
            response.status_code = 500
            return response
    return render_template('editRecipe.html', recipe = fetchRecipe)

# @route http://localhost:8000/recipes/delete/<ObjectId:id>
# @desc Delete a recipe
@app.route('/recipes/delete/<ObjectId:id>', methods = ['GET', 'DELETE'])
def delete_recipe(id):
    if(request.method == 'DELETE'):
        mongo.db.recipes.delete_one({ '_id' : id})
        response = jsonify({ 'message' : 'Document Deleted Successfully'})
        response.status_code = 200
        return response
    return redirect(url_for('index'))
if __name__ == '__main__':
    app.run(debug = True, port=8000)