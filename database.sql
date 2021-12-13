
-- Create a database titled "creative_cook"

CREATE TYPE "gender" AS ENUM ('Female', 'Male', 'Other', 'Prefer not to answer');

CREATE TABLE "user" (
	"id" serial NOT NULL PRIMARY KEY,
	"username" varchar(255) NOT NULL,
	"display_name" varchar(255),
	"password" varchar(255),
	"bio" varchar(255),
	"pic" varchar(255),
	"age" int,
	"gender" gender,
	"family_size" int,
	"marital_status" int,
	"is_admin" bool NOT NULL DEFAULT false);
	
CREATE TYPE "season" AS ENUM ('Summer', 'Spring', 'Winter', 'Autumn');

CREATE TYPE "type" AS ENUM ('Protein: Air', 'Protein: Land', 'Protein: Sea', 'Vegetable', 'Fruit', 'Dairy', 'Fat');

CREATE TABLE "ingredients" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"pic" varchar(255),
	"taste" varchar(255),
	"season" SEASON,
	"weight" varchar(255),
	"volume" varchar(255),
	"type" TYPE);


CREATE TABLE "pairings" (
	"id" serial NOT NULL PRIMARY KEY,
	"ingredient_one_id" int REFERENCES "ingredients",
	"ingredient_two_id" int REFERENCES "ingredients");



CREATE TABLE "combos" (
	"id" serial NOT NULL PRIMARY KEY,
	"user_id" int REFERENCES "user",
	"ingredient_list" int[] NOT NULL,
	"name" varchar(255));



CREATE TABLE "recipies" (
	"id" serial NOT NULL PRIMARY KEY,
	"combo_id" int REFERENCES "combos",
    "user_id" int REFERENCES "user",
	"made_on" TIMESTAMP,
	"edamam_id" varchar(255) NOT NULL);

CREATE TABLE "metrics" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(255) NOT NULL);

CREATE TABLE "user_metrics" (
	"id" serial NOT NULL PRIMARY KEY,
	"user_id" int NOT NULL REFERENCES "user",
	"metric_id" int NOT NULL REFERENCES "metrics",
	"goal" int,
    "progress" int);



CREATE TABLE "feed_content" (
	"id" serial NOT NULL PRIMARY KEY,
	"type" TYPE NOT NULL,
	"description" varchar(2555) NOT NULL,
	"combo_id" int REFERENCES "combos");

INSERT INTO "ingredients" ("name", "description")
VALUES ('apple', 'apples are a fruit that is red or green'),
('lemon', 'not an apple'),
('chicken', 'a tasty bird'),
('asparagus', 'a green vegetable'),
('strawberry', 'seeds on the outside'),
('butter', 'the real kind, not that margarine stuff'),
('sugar', 'sweetness');

ALTER TABLE "user" 
ADD COLUMN "password" varchar(255);

ALTER TABLE "feed_content"
ALTER COLUMN "type" TYPE varchar(255);









