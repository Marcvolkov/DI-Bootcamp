-- Удаляем таблицу (если существует)
DROP TABLE IF EXISTS students;

-- Создаем таблицу
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    birth_date DATE
);

-- Вставляем данные; id будет генерироваться автоматически
INSERT INTO students (first_name, last_name, birth_date) VALUES
    ('Marc',   'Benichou', '1998-11-02'),
    ('Yoan',   'Cohen',    '2010-12-03'),
    ('Lea',    'Benichou', '1987-07-27'),
    ('Amelia', 'Dux',      '1996-04-07'),
    ('David',  'Grez',     '2003-06-14'),
    ('Omer',   'Simpson',  '1980-10-03'),
    ('Ivan',   'Ivanov',   '2000-01-01');

-- ============ Запросы ============

-- 1. Выбрать все данные
SELECT * FROM students;

-- 2. Выбрать только first_name и last_name
SELECT first_name, last_name FROM students;

-- 3. Выбрать студента, у которого id = 2
SELECT first_name, last_name FROM students WHERE id = 2;

-- 4. Выбрать студента с last_name 'Benichou' И first_name 'Marc'
SELECT first_name, last_name FROM students
WHERE last_name = 'Benichou' AND first_name = 'Marc';

-- 5. Выбрать студентов, у которых last_name 'Benichou' ИЛИ first_name 'Marc'
SELECT first_name, last_name FROM students
WHERE last_name = 'Benichou' OR first_name = 'Marc';

-- 6. Выбрать студентов, чьи first_name содержат букву 'a'
SELECT first_name, last_name FROM students
WHERE first_name ILIKE '%a%';

-- 7. Выбрать студентов, чьи first_name начинаются с буквы 'a'
SELECT first_name, last_name FROM students
WHERE first_name ILIKE 'a%';

-- 8. Выбрать студентов, чьи first_name заканчиваются на букву 'a'
SELECT first_name, last_name FROM students
WHERE first_name ILIKE '%a';

-- 9. Выбрать студентов, у которых предпоследняя буква в first_name равна 'a'
SELECT first_name, last_name FROM students
WHERE first_name LIKE '%a_';

-- 10. Выбрать студентов, у которых id равны 1 или 3
SELECT first_name, last_name FROM students
WHERE id IN (1, 3);

-- 11. Выбрать студентов, у которых birth_date равна или позже 2000-01-01 (показываем всю информацию)
SELECT * FROM students
WHERE birth_date >= '2000-01-01';

