# restaurateur app

- this is a node express api that runs with docker compose and serves content via nginx
- the root directory requires a `.env` file with the following fields:

  PSQL_DB_NAME=restaurateur
  PSQL_USERNAME=<username>
  PSQL_PW=<password>

- the api requires a `.env` file with the following fields:

  NODE_PORT=3000

  PSQL_DB_NAME=restaurateur
  PSQL_HOST=db
  PSQL_PORT=5432
  PSQL_USERNAME=<username>
  PSQL_PW=<password>

  JWT_SECRET_KEY=<secret>

  GOOGLE_CLOUD_API_KEY=<your api key>

- note the postgres on docker compose is mapped to port 5433 to not collide with a locally running instance of postgres
- the database should seed automatically upon first run via `docker compose up`, however if it does not, you may have to manually enter the container and seed it with the `schema.sql` file. You can do this the following way:

  1.  docker ps - list all running containters
  2.  find the postgres:latest container id and copy it
  3.  in the terminal enter `$docker exec -it <container_id> bash`
  4.  connect to the postgres db and then manually enter the schema

- docs for the app can be found at /api/docs and routes can be tested that way

## notes

I spent 8 hours on what I have done and did not have time to write a frontend
I also did not get around to testing, though the swagger UI allowed me to test the functionality of the routes. that would be next, but I think writing tests for every api endpoint as the instructions dictate would be very time consuming even if a best practice.
the nginx configuration is extremely barebones because this is just for development purposes

## TEST_JWT

you can either register a new user and copy that JWT or use this test one with the seed data provided:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYSJ9.wV-VevA2wq4OecelU7vSPgPESQvU2ASFYbdx0LXrbi0
