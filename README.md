# Bean Scene Food Menu App Backend
This is the backend API for the Bean Scene food menu ordering system. The backend is built using Node.js, Express, and MongoDB.
ctrl + click to follow Table of Contents links

Made change to run nodemon for automatic server restarts on changes
terminal to run 'nodemon app.js' in console

## Table of Contents
1. [Project Setup](#project-setup)
2. [Database Setup](#database-setup)
3. [API Endpoints](#api-endpoints)
4. [Testing API with Postman](#testing-api-with-postman)
5. [License](#license)
6. [Notes](#notes)

## Working with backend to Frontend
Download backend repo - main.
cd Bean-Scene-Backend
cd Database
cd Data
seed.js
cd .. x2/3 until nback in bean scene back
then run node app.js
keep it running

## Project Setup
Clone the repository:

bash
Copy code
git clone https://github.com/upullit/Bean-Scene-Backend.git
cd Bean-Scene-Backend
Install the dependencies:

bash
Copy code
npm install
Create a .env file to store your environment variables, including the MongoDB connection string, if needed.

Start the server:

bash
Copy code
npm start
The server will be running on http://localhost:3000.

## Database Setup
Ensure you have MongoDB installed and running on your local machine.

Connect to MongoDB:

The connection string to your MongoDB should be included in the app. By default, it connects to:
bash
Copy code
mongodb://localhost:27017/restaurantdb
Seed the database with dummy data (optional):

You can uncomment and use the seedDatabase function in app.js to add dummy data to your database if needed.

## API Endpoints
Here are the available API endpoints for the Bean Scene Food Menu app:

Menu Endpoints
GET /api/menu - Fetch all menu items.
GET /api/menu/:id - Fetch a specific menu item by its ID.
POST /api/menu - Create a new menu item.
PUT /api/menu/:id - Update an existing menu item.
DELETE /api/menu/:id - Delete a menu item.

## Testing API with Postman
You can use Postman to test the API endpoints.

1. GET /api/menu - Fetch all menu items
Method: GET
URL: http://localhost:3000/api/menu
Steps in Postman:
Open Postman and create a new GET request.
Set the request URL to: http://localhost:3000/api/menu.
Click Send.
You should see the list of menu items returned in the response body.
2. GET /api/menu/:id - Fetch a specific menu item
Method: GET
URL: http://localhost:3000/api/menu/{id} (Replace {id} with an actual menu item ID from your database)
Steps in Postman:
Open Postman and create a new GET request.
Set the request URL to: http://localhost:3000/api/menu/{id} (replace {id} with the actual ID).
Click Send.
You should see the details of the specific menu item in the response body.
3. POST /api/menu - Create a new menu item
Method: POST
URL: http://localhost:3000/api/menu
Body (JSON):
json
Copy code
{
  "name": "Vegan Salad",
  "price": 8.99,
  "category": "Lunch",
  "description": "A fresh and healthy vegan salad",
  "ingredients": ["Lettuce", "Tomato", "Cucumber", "Olives"],
  "available": true,
  "isVegan": true,
  "isVegetarian": true
}
Steps in Postman:
Open Postman and create a new POST request.
Set the request URL to: http://localhost:3000/api/menu.
Go to the Body tab, select raw and choose JSON from the dropdown.
Paste the example JSON body above.
Click Send.
You should see a success message and the created menu item in the response.

4. PUT /api/menu/:id - Update an existing menu item
Method: PUT
URL: http://localhost:3000/api/menu/{id} (Replace {id} with the ID of the item to be updated)
Body (JSON):
json
Copy code
{
  "name": "Updated Vegan Salad",
  "price": 9.50,
  "description": "Updated description for the vegan salad",
  "ingredients": ["Lettuce", "Tomato", "Cucumber", "Avocado", "Olives"]
}
Steps in Postman:
Open Postman and create a new PUT request.
Set the request URL to: http://localhost:3000/api/menu/{id} (replace {id} with the actual ID).
Go to the Body tab, select raw and choose JSON from the dropdown.
Paste the updated JSON body above.
Click Send.
You should see the updated menu item in the response.

5. DELETE /api/menu/:id - Delete a menu item
Method: DELETE
URL: http://localhost:3000/api/menu/{id} (Replace {id} with the ID of the item to be deleted)
Steps in Postman:
Open Postman and create a new DELETE request.
Set the request URL to: http://localhost:3000/api/menu/{id} (replace {id} with the actual ID).
Click Send.
You should see a success message confirming the deletion of the menu item.
Conclusion
By following these steps, you can test the API endpoints of the Bean Scene Food Menu App using Postman. If you encounter any issues, ensure your MongoDB database is running, and the server is correctly set up.

## Notes:
Ensure MongoDB is running locally or update the MongoDB connection string in app.js if you're using a remote database.
You can also test the API using cURL or any other API testing tools if preferred.
