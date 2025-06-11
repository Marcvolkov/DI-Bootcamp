-- Database: public

-- DROP DATABASE IF EXISTS public;

-- CREATE DATABASE public
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'C'
--     LC_CTYPE = 'C'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- Удаляем таблицы, если они уже существуют
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS customers;

-- Создаём таблицы
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100)
);

-- Вставляем данные в таблицу items
INSERT INTO items (name, price) VALUES
    ('Small Desk', 100),
    ('Large Desk', 300),
    ('Fan', 80);

-- Вставляем данные в таблицу customers
INSERT INTO customers (firstname, lastname) VALUES
    ('Greg', 'Jones'),
    ('Sandra', 'Jones'),
    ('Scott', 'Scott'),
    ('Trevor', 'Green'),
    ('Melanie', 'Johnson');

-- Запрос 1: Все товары, отсортированные по возрастанию цены (от меньшей к большей)
SELECT *
FROM items
ORDER BY price ASC;

-- Запрос 2: Товары с ценой 80 и выше (80 включено), отсортированные по убыванию цены (от большей к меньшей)
SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC;

-- Запрос 3: Первые 3 клиента в алфавитном порядке по имени (A-Z), без первичного ключа (id)
SELECT firstname, lastname
FROM customers
ORDER BY firstname ASC
LIMIT 3;

-- Запрос 4: Все фамилии (только столбец lastname), отсортированные в обратном алфавитном порядке (Z-A)
SELECT lastname
FROM customers
ORDER BY lastname DESC;





