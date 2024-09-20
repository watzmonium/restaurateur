
CREATE DATABASE restaurateur;

\c restaurateur;

CREATE TABLE IF NOT EXISTS "users" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "email" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "restaurants" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "google_id" int,
  "name" text NOT NULL,
  "rating" int CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE  IF NOT EXISTS "reviews" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "restaurant_id" int REFERENCES "restaurants" ("id"),
  "dish_name" text NOT NULL,
  "rating" int CHECK (rating >= 1 AND rating <= 5),
  "review" text,
  "date" timestamp NOT NULL default NOW()
);

CREATE TABLE  IF NOT EXISTS "users_restaurants" (
  "id" int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int,
  "restaurant_id" int
);