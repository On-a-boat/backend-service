# Team 90 - On-a-boat - Project (Backend)

## Table of Contents

- [Team 90 - On-a-boat - Project](#on-a-boat---project)
  - [Running this project locally](#running-this-project-locally)
  - [MongoDB Access details](#mongodb-access-details)
  - [Postman Routes](#postman-routes)

## Background

**Summary**  
For this project, we are hosting our live server hosted on Heroku with a valid URL with the features listed below.  
The backend of the app is connected with mongoDB using Mongoose. This will allow us to fetch data that we want from the database.  
Due to privacy and security, we have implemented such features to not disclose vendors/customer's details from a simple GET route.

**Design**  
Our backend design solution is based on Model-View-Controller pattern.  
In our model, we have defined our data structure so that we can distinguish how we update the data.
We have not specifically designed our view because we do not have our front end design at the moment,
but the controller for manipulating the data is implemented and the description to that can be viewed from [this](#postman-routes)

## Running this Project Locally

- **Clone this repo:**  
  `git clone https://github.com/INFO30005-2021-SM1/project-t05-on-a-boat.git`

- **Install Dependencies:**  
  `npm install`

- **Start the project:**  
  `npm start`

## MySQL Access details

| Field    | Details                                                         |
| -------- | --------------------------------------------------------------- |
| URL      | on-a-boat.cluster-czjflueg9kom.ap-southeast-2.rds.amazonaws.com |
| Username | admin                                                           |
| Password | on-a-boat                                                       |

# Code Overview

## Dependencies

- [body-parser](https://github.com/expressjs/body-parser) - For a middleware parsing body for POST request
- [cors](https://github.com/expressjs/cors) - Middleware that connects to Frontend service
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [mysql](https://github.com/auth0/express-jwt) - Connects to DB for data handling
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [slug](https://github.com/dodo/node-slug) - For encoding titles into a URL-friendly format

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
