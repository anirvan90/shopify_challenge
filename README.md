# Simple Web API - Shopify Challenge
----
## Overview
This project is a simple web service that mimics an ecommerce platform. 

## System Requirements for Local
- Node.js ^8.0
- MongoDB
- Docker

## Start App Locally
Start a MongoDB daemon in the background by running `mongod` or `sudo mongod` dependent on how your system is set up.

With Mongo running in the background you can choose to seed the database by running `node seed.js` from the root of the application. Start the app by running `npm start`. The app will serve on `localhost:3000`

## Start Locally - Docker
By default the mongo db url points to localhost. In the `database.js` file in the `config` folder uncomment line 7 and comment out line 4.
```
// URL For Local
// mongoose.connect("mongodb://localhost:27017/fluffykins");

// URL For Docker
mongoose.connect("mongodb://mongo:27017/fluffykins");
```

Then run `docker-compose build`. This will create the images for both mongo and for the app. After they are created. Run `docker-compose up -d mongo`. This is to ensure that the `mongo` starts before the `app` container to prevent any crashes or refused connections. The app will serve on `localhost:3000`. 

Note: This DB will not be seeded.

## Folder Structure
#### Config
#### Models

There are four models that manage data in this application. Data is managed in a relational manner using Mongo middleware functions like pre and post and ObjectIds as foreign keys. 

 ##### User Model
 The User model is crucial to the entire applicaiton as it manages auth. `username` and `password` are supplied by the user during registration. Passwords are hashed and an `apikey` is generated  
 
 
 
 
 
| Key 	| Type 	|  
|:--------:	|--------	|
| username 	| String 	|  
| password 	| String 	|
| apiKey   	| String 	| 
 


 - Shop
 - Product
 - Order
 


#### Controllers
 - Auth Controller
 - Shop Controller
 - Product Controller
 - Order Controller


#### Routers
- Auth Router
- Shop Router
- Product Router
- Order Router

