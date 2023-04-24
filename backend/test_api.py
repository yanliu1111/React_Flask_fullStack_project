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
        response = self.client.get("/recipe/recipes")
        status_code = response.status_code
        self.assertEqual(status_code, 200)
    
    def test_get_single_recipe(self):
        id=1
        response = self.client.get(f"/recipe/recipes/{id}")
        status_code = response.status_code
        self.assertEqual(status_code, 404)

    def test_create_recipe(self):
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
        #print (login_response.json['access_token'])
        access_token = login_response.json["access_token"]

        create_recipe_response = self.client.post(
            "/recipe/recipes",
            json={"title": "Test Noodle", "description": "Test Noodle description"},
            headers={"Authorization": f"Bearer {access_token}"},
        )

        status_code = create_recipe_response.status_code
    
        self.assertEqual(status_code, 201)

    def test_update_recipe(self):
        signup_response = self.client.post(
            "/auth/signup",
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password",
            },
        )

        login_response = self.client.post(
            "auth/login", json={"username": "testuser", "password": "password"}
        )

        access_token = login_response.json["access_token"]
        create_recipe_response = self.client.post(
            "/recipe/recipes",
            json={"title": "Test Noodle", "description": "Test Noodle description"},
            headers={"Authorization": f"Bearer {access_token}"},
        )

        status_code = create_recipe_response.status_code
        id = 1
        # print (create_recipe_response.json)
        update_response = self.client.put(
            f"/recipe/recipe/{id}",
            json={"title": "Test Noodle update", "description": "Test Noodle update description"},
            headers={"Authorization": f"Bearer {access_token}"},
        )
        # print (update_response.json)
        status_code = update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_recipe(self):
        signup_response = self.client.post(
            "/auth/signup",
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password",
            },
        )

        login_response = self.client.post(
            "auth/login", json={"username": "testuser", "password": "password"}
        )

        access_token = login_response.json["access_token"]

        create_recipe_response = self.client.post(
            "/recipe/recipes",
            json={"title": "Test Noodle", "description": "Test Noodle description"},
            headers={"Authorization": f"Bearer {access_token}"},
        )
        id = 1
        delete_response = self.client.delete(
            f"/recipe/recipe/{id}", headers={"Authorization": f"Bearer {access_token}"}
        )

        status_code = delete_response.status_code

        print(delete_response.json)

        self.assertEqual(status_code, 200)


    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == '__main__':
    unittest.main()
        