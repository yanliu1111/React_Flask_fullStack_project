from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe
from exts import db

app = Flask(__name__)

app.config.from_object(DevConfig)
db.init_app(app)

api = Api(app, doc='/docs')

#model (serializer)
recipe_model = api.model('Recipe', 
    {
    'id':fields.Integer(),
    'title':fields.String(),
    'description':fields.String()
    }
)

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/recipes')
class RecipeResource(Resource):
    #decorators to jsonify the response
    @api.marshal_list_with(recipe_model)
    def get(self):
        """Get all recipes"""
        recipes = Recipe.query.all()
        return recipes
    @api.marshal_with(recipe_model)
    def post(self):
        """Create a recipe"""
        data = request.get_json()
        new_recipe = Recipe(
            title= data.get('title'),
            description= data.get('description')
        )
        new_recipe.save()
        return new_recipe, 201

@api.route('/recipes/<int:id>')
class RecipeResource(Resource):
    def get(self, id):
        """
        Get a recipe by id
        """
        pass
    def put(self, id):
        """
        Update a recipe by id
        """
        pass
    def delete(self, id):
        """
        Delete a recipe by id
        """
        pass

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Recipe': Recipe}

if __name__ == '__main__':
    app.run()

