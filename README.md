# Online Store Backend

## About:
In this project, I've created a RESTful API for online store.
PORT: 7000 - [Main Page](http://localhost:7000)

## Database Setup:
- "CREATE DATABASE onlinestore;"
- "CREATE DATABASE onlinestore_test"
- Database PORT = 5432

## Database Schema:

### Relations:
    - users-orders relationship --> One-to-one relation ship
      (Each user may has an order at one time.)
    - product-orders relationship --> Many-to-many relationship
      (one product may be present in many orders && one order may contains multiple products)

      Note:
        We need to break down tha many-to-many relation ship, So I have create orderProduct table.

    Product:
      id SERIAL PRIMARY KEY
      name VARCHAR(100) NOT NULL
      price INT NOT NULL
      category VARCHAR(100)

    Users:
      id SERIAL PRIMARY KEY
      firstName VARCHAR(20) NOT NULL,
      secondName VARCHAR(20) NOT NULL
      userPassword VARCHAR(100) NOT NULL

    Orders:
      id SERIAL PRIMARY KEY
      ProductID INT NOT NULL REFERENCES Product(id)
      quatity INT
      orderStatus VARCHAR(10) NOT NULL
      userID INT REFERENCES user(id)

    orderProduct:
      orderID INT NOT NULL
      ProductID INT NOT NULL
      PRIMARY KEY(orderID, ProductID)

## API Endpoints:

### 1. Products:
- Return all products [Index](http://localhost:7000/products) - (http://localhost:7000/products)
- Return Product details [Show](http://localhost:7000/products/:id) - (http://localhost:7000/products/:id)
- Create new product [Create](http://localhost:7000/products) - (http://localhost:7000/products)

### 2. Users:
- Return all users [Index](http://localhost:7000/users) - (http://localhost:7000/users)
- Return user details [Show](http://localhost:7000/users/:id) - (http://localhost:7000/users/:id)
- Create new user [Create](http://localhost:7000/users) - (http://localhost:7000/users)

### 3. Orders:
- Return orders of certain user [ShowOrder](http://localhost:7000/orders/:userID) - (http://localhost:7000/orders/:userID)
- Return all the completed orders [ShowCompleteOrders](http://localhost:7000/orders/:orderStatus) - (http://localhost:7000/orders/:orderStatus)

## 3.Dependencies script:
  - Return all products [Index](http://localhost:7000/products) - (http://localhost:7000/products)
  - Return Product details [Show](http://localhost:7000/products/:id) - (http://localhost:7000/products/:id)
  - Create new product [Create](http://localhost:7000/products) - (http://localhost:7000/products)
  
 ### 2. Users:
  - Return all users [Index](http://localhost:7000/users) - (http://localhost:7000/users) 
  - Return user details [Show](http://localhost:7000/users/:id) - (http://localhost:7000/users/:id)
  - Create new user [Create](http://localhost:7000/users) - (http://localhost:7000/users)
  
 ### 3. Orders:
  - Return orders of certain user [ShowOrder](http://localhost:7000/orders/:userID) - (http://localhost:7000/orders/:userID)
  - Return all the completed orders [ShowCompleteOrders](http://localhost:7000/orders/:orderStatus) - (http://localhost:7000/orders/:orderStatus)
    
## Dependencies script:
- Build the ts file: ("build": "npx tsc")
- Run Eslint: ("lint": "eslint \"dist/\*_/_.js\"")
- Run Prettier: ("prettier": "prettier --config .prettierrc \"dist/\*_/_.js\" --write")
- Run the app: ("start": "nodemon src/app.ts" )
- Testing: ("ENV=test && npx tsc && db-migrate --env test up && jasmine && db-migrate db:drop test")

## Project structure:
    .
    ├── spec
    |     └──support
    |           └──jasmine.json
    |
    ├── src
    │   ├── handlers
    |   |       ├── orderHandler.ts
    |   |       ├── productHandler.ts
    |   |       └── userHandler.ts
    │   ├── middleWare
    |   |     └── verification.ts
    |   ├── models
    |   |     ├── orderModel.ts
    |   |     ├──productModel.ts
    |   |     └──userModel.ts
    |   ├──tests
    |   |     ├──helpers
    |   |     |     └── reporter.ts
    |   |     └──handlersSpec.ts
    │   ├── database.ts
    |   └── server.ts
    ├── .env.example
    ├── .eslintrc
    ├── .prettierrc
    ├── database.json
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
