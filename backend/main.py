from flask import Flask
from flask_restx import Api, Resource
from config import DevConfig
from models import Recipe
from exts import db

app = Flask(__name__)

app.config.from_object(DevConfig)

api = Api(app, doc='/docs')

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'hello': 'world'}

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Recipe': Recipe}

if __name__ == '__main__':
    app.run()

