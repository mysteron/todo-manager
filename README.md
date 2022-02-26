# todo-manager
A simple todo manager app, a result of experimenting with Symfony, Angular and Vue.


## Prerequisites

To run the application on your local machine you have to have the following software components installed:
- [Docker](https://www.docker.com/get-started) - to run Postgresql database
- [Symfony CLI](https://symfony.com/download) - to run server-side application (you will probably need a standalone installation of [PHP](https://www.php.net/manual/en/install.php)
- [node.js](https://nodejs.org/en/download/) - to run the client-side Angular and Vue applications
## Running the DB
To run the Dockerized DB, run the following command in the root folder:
```
docker-compose up
```

## Running the API

To run the server-side part of the application (API), start the Symfony server:
```
symfony server:start
```

Navigate to http://localhost:8000/api to see the Swagger documentation of the API.

## Running the Angular frontend app

In the directory `todo-frontend` run the following commands:
```
npm install
npm start
```

Navigate to http://localhost:4300 to open the frontend.

