CREATE DATABASE lfgmapidb;

USE lfgmapidb;

 CREATE TABLE IF NOT EXISTS `stores` (
    `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
    `name` VARCHAR(200) COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

INSERT INTO stores(address, name) VALUES('Somewhere over the rainbow1', 'Super Store1');
INSERT INTO stores(address, name) VALUES('Somewhere over the rainbow2', 'Super Store2');

CREATE TABLE IF NOT EXISTS `articles` (
    `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
    `name` VARCHAR(200) COLLATE utf8_unicode_ci NOT NULL,
    `price` FLOAT COLLATE utf8_unicode_ci NOT NULL,
    `total_in_shelf` INT(3) COLLATE utf8_unicode_ci NOT NULL,
    `total_in_vault` INT(3) COLLATE utf8_unicode_ci NOT NULL,
    `store_name` VARCHAR(200) COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

INSERT INTO articles(description, name, price, total_in_shelf, total_in_vault, store_name) VALUES('The best quality of shoes in a green color1', 'green shoes1', 20.15, 25, 40, 'Super Store1');
INSERT INTO articles(description, name, price, total_in_shelf, total_in_vault, store_name) VALUES('The best quality of shoes in a green color2', 'green shoes2', 10.15, 30, 10, 'Super Store2');
INSERT INTO articles(description, name, price, total_in_shelf, total_in_vault, store_name) VALUES('The best quality of shoes in a green color3', 'green shoes3', 14.15, 10, 20, 'Super Store2');
