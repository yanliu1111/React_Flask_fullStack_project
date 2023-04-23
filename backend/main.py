from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe, User
from exts import db
from flask_migrate import Migrate # Migration class
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.config.from_object(DevConfig)
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app, doc='/docs')

#model (serializer)
recipe_model = api.model('Recipe', 
    {
    'id':fields.Integer(),
    'title':fields.String(),
    'description':fields.String()
    }
)

#signup model
signup_model = api.model('Signup', 
    {
    'username':fields.String(),
    'email':fields.String(),
    'password':fields.String()
    }
)

#login model
login_model = api.model('Login',
    {
    'email':fields.String(),
    'password':fields.String()
    }
)
@api.route('/signup')
class Signup(Resource):
    
    @api.expect(signup_model)
    def post(self):
        data= request.get_json()

        username = data.get('username')
        db_user = User.query.filter_by(username = username).first()
        if db_user:
            return jsonify({"message": f"User with {username} already exists"})   
       
        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()
        return jsonify({"message": f"User {username} created successfully"})

@api.route('/login')
class Login(Resource):
    def post(self):
        pass

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
    @api.expect(recipe_model)
    def post(self):
        """Create a recipe"""
        data = request.get_json()
        new_recipe = Recipe(
            title= data.get('title'),
            description= data.get('description')
        )
        new_recipe.save()
        return new_recipe, 201

@api.route('/recipe/<int:id>')
class RecipeResource(Resource):
    @api.marshal_with(recipe_model)
    def get(self, id):
        """Get a recipe by id"""
        recipe= Recipe.query.get_or_404(id)
        return recipe
    
    @api.marshal_with(recipe_model)
    def put(self, id):
        """Update a recipe by id"""
        recipe_to_update = Recipe.query.get_or_404(id)
        data = request.get_json()
        recipe_to_update.update(data.get('title'), data.get('description'))
        return recipe_to_update
    @api.marshal_with(recipe_model)
    def delete(self, id):
        """Delete a recipe by id"""
        recipe_to_delete = Recipe.query.get_or_404(id)
        recipe_to_delete.delete()
        return recipe_to_delete

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Recipe': Recipe}

if __name__ == '__main__':
    app.run()

