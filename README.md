# Simple Web API - Shopify Challenge


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

### Config
This contains two files. `config.js` and `database.js` required for authentication variables and database connections

---

### Models

There are four models that manage data in this application. Data is managed in a relational manner using Mongo middleware functions like pre and post and ObjectIds as foreign keys.
 - Users
 - Shops
 - Products
 - Orders

( * indicates required)
(^ indicates assigned automatically)

#### User Model

The User model is crucial to the entire applicaiton as it manages authentication and registration. `username` and `password` are supplied by the user during registration. Passwords are hashed and an `apikey` is generated

| Key |Type| 
|:--:|:--:|
| username |  String* | 
| password |  String* |
| apiKey | String^|
|_id| ObjectId^| 
   
  
#### Shop Model
The shop model manages shops in the application. Only registered users can create shops. Each shop has many products and many orders. Product ids are pushed in when a product is created. Order ids are pushed in when an order is created. 

| Key |Type  |
|:--:|:--:|
| name |  String*|
| orders |  Array of ObjectIds^ |
| products | Array of ObjectIds^|
| ownerKey | String* |
| _id | ObjectId^|

#### Product Model
The product model manages products in the application. Each product is associated with a shop. 

| Key |Type  |
|:--:|:--:|
| name |  String*|
| sellPrice |  Number* |
| inventory | Number|
| tags | Array of Strings|
| shop | Object Id* |
| url | String |
|imageLink | String |
| inStock | Boolean^ |
|_id| ObjectId^|

#### Order Model
The order modle manages orders in the application. Each order is associated with a shop. Orders have many products. 

| Key |Type  |
|:--:|:--:|
| products |  Array of ObjectIds* |
| shop | ObjectId* |
| totalSale | Number^ |
| orderDate | Date^ |
| discount | Number |
| status | Array of Strings|
| _id | ObjectId^|
  ---
  

#### Controllers
Each model has its own set of controller functions for CRUD interactions with the data model. The authentication controller contains functions that act as middleware for the shop, product and order controllers.

  ---

#### Routers

To separate the logic for each model, each model has its own router. Refer to API documentation for route definitions, open routes and protected routes.
