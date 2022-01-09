
-- Create a database titled "creative_cook"

CREATE TYPE "gender" AS ENUM ('Female', 'Male', 'Other', 'Prefer not to answer');

CREATE TYPE "marital_status" AS ENUM ('Single', 'Married', 'Partnership', 'Prefer not to answer');

CREATE TABLE "user" (
    "id" serial NOT NULL PRIMARY KEY,
    "username" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "bio" varchar(510),
    "pic" varchar(255),
    "location" varchar(255),
    "birthday" DATE,
    "gender" gender,
    "marital_status" marital_status,
    "family_size" int,
    "is_admin" bool NOT NULL DEFAULT FALSE
);

	
CREATE TYPE "season" AS ENUM ('Summer', 'Spring', 'Winter', 'Autumn');

CREATE TYPE "type" AS ENUM ('Protein: Air', 'Protein: Land', 'Protein: Sea', 'Vegetable', 'Fruit', 'Dairy', 'Fat');

CREATE TABLE "ingredients" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"username" varchar(255) NOT NULL,
	"description" varchar(255),
	"pic" varchar(255),
	"taste" varchar(255),
	"season" SEASON,
	"weight" varchar(255),
	"volume" varchar(255),
	"type" TYPE),
	"funtction" varchar(255),
	"technique" varchar(255),
	"botanicalRelative" varchar(255);


CREATE TABLE "pairings" (
	"id" serial NOT NULL PRIMARY KEY,
	"ingredient_one_id" int REFERENCES "ingredients",
	"ingredient_two_id" int REFERENCES "ingredients");

CREATE TABLE "combos" (
	"id" serial NOT NULL PRIMARY KEY,
	"user_id" int REFERENCES "user",
	"ingredient_list" int[] NOT NULL,
	"name" varchar(255)),
	"date_created" DATE;

CREATE TABLE "recipes" (
	"id" serial NOT NULL PRIMARY KEY,
	"combo_id" int REFERENCES "combos",
    "user_id" int REFERENCES "user",
	"made_on" DATE,
	"url" varchar(255) NOT NULL),
	"label" VARCHAR(255),
	"is_cooked" BOOLEAN DEFAULT FALSE;

CREATE TABLE "metrics" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(255) NOT NULL),

CREATE TABLE "user_metrics" (
	"id" serial NOT NULL PRIMARY KEY,
	"user_id" int NOT NULL REFERENCES "user",
	"metric_id" int NOT NULL REFERENCES "metrics",
	"goal" int);

CREATE TABLE "feed_content" (
	"id" serial NOT NULL PRIMARY KEY,
	"type" TYPE NOT NULL,
	"description" varchar(2555) NOT NULL,
	"combo_id" int REFERENCES "combos"),
	"date_posted" DATE;

INSERT INTO "ingredients" ("name", "description")
VALUES ('apple', 'apples are a fruit that is red or green'),
('lemon', 'not an apple'),
('chicken', 'a tasty bird'),
('asparagus', 'a green vegetable'),
('strawberry', 'seeds on the outside'),
('butter', 'the real kind, not that margarine stuff'),
('sugar', 'sweetness');

******************************************

ALTER TYPE season ADD VALUE 'Summer-Autumn';
ALTER TYPE season ADD VALUE 'Autumn-Winter';
ALTER TYPE season ADD VALUE 'Winter-Spring';
ALTER TYPE season ADD VALUE 'Spring-Early Autumn';
ALTER TYPE season ADD VALUE 'Spring-Summer';
ALTER TYPE season ADD VALUE 'Year-round';
ALTER TYPE type ADD VALUE 'Grain';
ALTER TYPE type ADD VALUE 'Green';
ALTER TYPE type ADD VALUE 'Legume';
ALTER TYPE type ADD VALUE 'Herb';
ALTER TYPE type ADD VALUE 'Nut';
ALTER TYPE type ADD VALUE 'Raw';

INSERT INTO "public"."ingredients"("id","name","description","pic","taste","season","weight","volume","type")
VALUES
(1,E'almond',NULL,E'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',E'sweet',NULL,E'medium',E'quiet',NULL),
(2,E'apples',NULL,E'https://images.unsplash.com/photo-1606757389723-23c4bf501fba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',E'sweet, astringent',E'Autumn',E'medium',E'quiet-moderate',E'Fruit'),
(3,E'broccoli',NULL,E'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1801&q=80',NULL,E'Autumn-Winter',E'medium',E'moderate',E'Vegetable'),
(4,E'Brussels sprouts',NULL,E'https://images.unsplash.com/photo-1614087434853-25e6e8357217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',E'bitter',E'Autumn-Winter',E'moderate–heavy',E'moderate–loud',E'Vegetable'),
(5,E'cabbage',NULL,E'https://cdn.pixabay.com/photo/2019/02/01/15/56/savoy-3969270_1280.jpg',NULL,E'Autumn-Winter',E'medium',E'moderate',E'Vegetable'),
(6,E'asparagus',NULL,E'https://cdn.pixabay.com/photo/2015/03/30/20/45/asparagus-700153_1280.jpg',NULL,E'Spring',E'light–medium',E'moderate',E'Vegetable'),
(7,E'artichokes',NULL,E'https://images.unsplash.com/photo-1551465222-21f38590e0ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',NULL,E'Spring-Early Autumn',E'medium',E'moderate–loud',E'Vegetable'),
(8,E'avocado',NULL,E'https://images.unsplash.com/photo-1632670952530-0614e8582534?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80',NULL,E'Spring-Summer',E'medium–heavy',E'quiet',E'Fruit'),
(9,E'blueberry',NULL,E'https://images.unsplash.com/photo-1606757389667-45c2024f9fa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZWJlcnJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',E'sour–sweet',E'Spring-Summer',E'light',E'quiet–moderate',E'Fruit'),
(10,E'arugula',NULL,E'https://images.unsplash.com/photo-1621664270515-0a497de945a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFydWd1bGElMjBsZWFmfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',E'bitter',E'Spring-Summer',E'light–medium',E'moderate–loud',E'Green'),
(11,E'beans, fava (broad beans or horse beans)',NULL,E'https://cdn.pixabay.com/photo/2020/08/11/10/23/broad-beans-5479434_1280.jpg',E'bitter',E'Spring-Summer',E'light–medium',E'moderate',E'Legume'),
(12,E'cantaloupe',NULL,E'https://cdn.pixabay.com/photo/2021/04/16/05/14/cantaloupe-6182570_1280.jpg',E'sweet',E'Summer',E'ight–medium',E'moderate',E'Fruit'),
(13,E'basil',NULL,E'https://cdn.pixabay.com/photo/2018/10/07/10/28/basil-3729618_1280.jpg',E'sweet',E'Summer',E'light, soft-leaved',E'mild–moderate',E'Herb'),
(14,E'blackberry',NULL,E'https://images.unsplash.com/photo-1567870335471-1129836babcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2tiZXJyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',E'sour',E'Summer',E'light–medium',E'moderate',E'Raw'),
(15,E'bell pepper',NULL,E'https://cdn.pixabay.com/photo/2019/02/14/07/58/vegetable-3996066__480.jpg',E'bitter to sweet, from unripe (green) to ripe (yellow to red)',E'Summer-Autumn',E'light–medium',E'moderate–loud',E'Vegetable'),
(16,E'beans, green',NULL,E'https://images.unsplash.com/photo-1603431777007-61db54157a3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdyZWVuJTIwYmVhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',NULL,E'Summer-Autumn',E'light–medium',E'moderate',NULL),
(17,E'banana',NULL,E'https://cdn.pixabay.com/photo/2018/03/18/18/25/banana-3237794__480.jpg',E'sweet, astringent',E'Winter',E'medium',E'quiet',E'Fruit'),
(18,E'bass, sea',NULL,E'https://images.squarespace-cdn.com/content/v1/54084e7ae4b035477df09e2f/1411995486399-N30133I3BPABUOMIWTGR/ChileanSeabass_390.jpg?format=1000w',NULL,E'Winter-Spring',E'medium',E'quiet',E'Protein: Sea'),
(19,E'beet',NULL,E'https://images.unsplash.com/photo-1527790806964-dfa3c2c7e032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',E'sweet',E'Year-round',E'medium',E'moderate',E'Vegetable'),
(20,E'bok choy',NULL,E'https://cdn.pixabay.com/photo/2017/07/11/19/29/bokchoy-2494763__480.png',E'bitter',E'Year-round',E'light–medium',E'quiet',E'Vegetable'),
(21,E'barley',NULL,E'https://cdn.pixabay.com/photo/2018/01/19/23/04/barley-3093381__340.jpg',E'sweet, astringent',NULL,NULL,NULL,E'Grain'),
(22,E'bay leaf',NULL,E'https://images.unsplash.com/photo-1592380222497-0c40d4936b42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmF5JTIwbGVhZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',E'sweet, bitter',NULL,E'light, tough-leaved',E'quiet–loud, depending on quantity used',E'Herb'),
(23,E'bacon',NULL,E'https://images.pexels.com/photos/4110377/pexels-photo-4110377.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',E'salty',NULL,E'medium',E'moderate',E'Protein: Land'),
(24,E'beef',NULL,E'https://images.unsplash.com/photo-1592686092916-672fa9e86866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHN0ZWFrJTIwY3V0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',E'sweet',NULL,E'medium–heavy',E'moderate',E'Protein: Land'),
(25,E'beans, black',NULL,E'https://cdn.pixabay.com/photo/2021/03/08/02/37/bean-6077944__480.jpg',NULL,NULL,E'medium–heavy',E'moderate',E'Legume'),
(26,E'beans, cannellini',NULL,E'https://cdn.pixabay.com/photo/2021/08/24/18/01/white-beans-6571314__340.jpg',NULL,NULL,E'medium',E'quiet–moderate',E'Legume'),
(27,E'almonds ',NULL,NULL,E'sweet',NULL,E'medium',E'quiet',E'Nut'),
(28,E'bass',NULL,E'https://fultonfishmarket.com/pub/media/catalog/product/cache/68fd7839005aef647f330ae6348231ff/1/2/120m_2_2_1.jpg',NULL,NULL,E'light',E'quiet',E'Protein: Sea'),
(29,E'buttermilk',NULL,E'https://images.unsplash.com/photo-1630409346699-79481a79db52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnV0dGVybWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',E'sour',NULL,E'medium',E'moderate–loud',E'Vegetable'),
(30,E'caper',NULL,E'https://cdn.pixabay.com/photo/2017/05/11/00/55/capers-2302424__480.jpg',E'salty, sour, pungent',NULL,E'light',E'loud',E'Vegetable'),
(31,E'black-eyed peas',NULL,E'https://images.unsplash.com/photo-1515347272087-685ce5a1fc8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBleWVkJTIwcGVhc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',NULL,NULL,E'light–medium',E'moderate–loud',NULL),
(32,E'cabbage',NULL,NULL,NULL,E'Autumn-Winter',E'medium',E'moderate',NULL);


INSERT INTO "public"."pairings"("id","ingredient_one_id","ingredient_two_id")
VALUES
(16,14,1),
(17,23,2),
(18,22,2),
(19,24,2),
(20,14,2),
(21,5,2),
(23,23,7),
(24,13,7),
(25,22,7),
(26,19,7),
(27,15,7),
(28,30,7),
(29,1,10),
(31,13,10),
(32,15,10),
(33,7,6),
(34,1,6),
(35,2,6),
(36,13,6),
(37,22,6),
(38,19,6),
(39,30,6),
(40,23,8),
(41,13,8),
(42,25,8),
(43,15,8),
(44,1,17),
(46,14,17),
(47,9,17),
(48,29,17),
(49,24,21),
(50,16,13),
(51,15,13),
(52,9,13),
(53,30,13),
(54,7,28),
(55,22,28),
(56,1,18),
(58,23,18),
(59,13,18),
(60,22,18),
(61,16,18),
(62,19,18),
(63,15,18),
(64,30,18),
(65,24,22),
(66,2,25),
(67,23,25),
(68,22,25),
(69,15,25),
(70,23,26),
(71,23,11),
(72,13,11),
(73,1,16),
(75,23,16),
(76,22,16),
(77,15,16),
(78,30,16),
(79,23,24),
(80,13,24),
(81,16,24),
(82,30,24),
(83,2,19),
(84,8,19),
(85,13,19),
(86,16,19),
(87,30,19),
(88,23,15),
(89,22,15),
(90,24,15),
(91,30,15),
(92,1,14),
(93,9,14),
(94,29,14),
(95,1,9),
(96,2,9),
(97,29,9),
(99,6,20),
(100,24,20),
(101,3,20),
(102,1,3),
(111,23,5),
(112,22,5),
(113,24,5),
(114,15,5),
(115,13,12),
(116,1,30);


-- ALTERATIONS to user table. 

ALTER TYPE marital_status ADD VALUE 'Prefer not to answer';

ALTER TABLE "user"
DROP COLUMN "display_name";

ALTER TABLE "user"
DROP COLUMN "age";

ALTER TABLE "user"
ADD "email" varchar(255) NOT NULL;

ALTER TABLE "user"
ADD "location" varchar(255);

ALTER TABLE "user"
ADD "birthday" DATE;

