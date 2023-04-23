import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)

        self.client = self.app.test_client(self)

        with self.app.app_context():
            #db.init_app(self.app) #error here duplicate key
            db.create_all()

    #error fix
    def test_hello_world(self):
        hello_response = self.client.get("/recipe/hello")

        json = hello_response.json

        print(json)
        self.assertEqual(json, {"hello": "world"})
    
    def test_signup(self):
        signup_response = self.client.post("/auth/signup",
            json={
            'username': "testuser",
            "email":"test@test.com",
            "password": "test@test"}
        )
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)
    
    def test_login(self):
        signup_response = self.client.post("/auth/signup",
            json={
            'username': "testuser",
            "email":"test@test.com",
            "password": "test@test"}
        )

        login_response = self.client.post("/auth/login",
            json={
            'username': "testuser",
            "password": "test@test"}
        )
        status_code = login_response.status_code
        # json = login_response.json
        # print(json)
        self.assertEqual(status_code, 200)
    
    # Test CRUD
    def test_get_all_recipes(self):
        pass
    
    def test_get_single_recipe(self):
        pass

    def test_create_recipe(self):
        pass

    def test_update_recipe(self):
        pass

    def test_delete_recipe(self):
        pass

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == '__main__':
    unittest.main()
        