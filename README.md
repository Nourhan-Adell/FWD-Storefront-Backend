# Online store backend

## About:
In this project, I've created a RESTful API for online store.

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
    
 ### 3.Dependencies script:
- Build the ts file: ("build": "npx tsc")
- Run Eslint: ("lint": "eslint \"dist/**/*.js\"")
- Run Prettier: ("prettier": "prettier --config .prettierrc \"dist/**/*.js\" --write")
- Run the app: ("start": "nodemon src/app.ts" )
- Testing: ("ENV=test && npx tsc && db-migrate --env test up && jasmine && db-migrate db:drop test")

 ### 4. Project structure:

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

