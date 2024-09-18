DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "restaurants" CASCADE;
DROP TABLE IF EXISTS "reviews" CASCADE;
DROP TABLE IF EXISTS "users_restaurants" CASCADE;

CREATE TABLE "users" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "email" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "restaurants" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "google_id" int,
  "name" text NOT NULL,
  "rating" int CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE "reviews" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "restaurant_id" int REFERENCES "restaurants" ("id"),
  "dish_name" text NOT NULL,
  "rating" int CHECK (rating >= 1 AND rating <= 5),
  "review" text,
  "date" timestamp NOT NULL default NOW()
);

CREATE TABLE "users_restaurants" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int,
  "restaurant_id" int
);