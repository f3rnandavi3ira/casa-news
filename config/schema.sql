-- CasaNews - Database Schema
-- MySQL / MariaDB

CREATE DATABASE IF NOT EXISTS casa_news
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE casa_news;

-- --------------------------------------------------------
-- Table: users
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY email (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------
-- Table: articles
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS articles (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userId INT(11) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    imageUrl TEXT DEFAULT NULL,
    content LONGTEXT DEFAULT NULL,
    shared TINYINT(1) DEFAULT 0,
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY articles_ibfk_1 (userId),

    CONSTRAINT articles_ibfk_1
        FOREIGN KEY (userId)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------
-- Table: favorites
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS favorites (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userId INT(11) NOT NULL,
    url TEXT DEFAULT NULL,
    title VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    urlToImage TEXT DEFAULT NULL,
    source VARCHAR(100) DEFAULT NULL,
    publishedAt DATETIME DEFAULT NULL,
    note TEXT DEFAULT NULL,
    savedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY unique_user_article (userId, url(255)),
    KEY favorites_ibfk_1 (userId),

    CONSTRAINT favorites_ibfk_1
        FOREIGN KEY (userId)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;