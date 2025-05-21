CREATE DATABASE user_drag;

USE user_drag;

CREATE TABLE user (
    user_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(50),
);
CREATE TABLE user (
    image_id INT UNSIGNED NOT NULL, 
    user_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, image_id),
    filename VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);