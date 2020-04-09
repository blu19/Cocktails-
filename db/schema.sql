DROP DATABASE IF EXISTS drinks_db;
CREATE DATABASE drinks_db;
USE drinks_db;

CREATE TABLE drinks
(
	id int NOT NULL AUTO_INCREMENT,
	drink_name varchar(255) NOT NULL,
    drink_img_url varchar(255),
	ingredients varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
    user_name varchar(20) NOT NULL,
    email varchar(255) NOT NULL,
    user_pw varchar(255) NOT NULL,
    user_dob date NOT NULL,
    user_location varchar(30),
    user_drinks varchar(255),
    user_liked_drinks varchar(255),
    user_disliked_drinks varchar(255),
    PRIMARY KEY (id)
);