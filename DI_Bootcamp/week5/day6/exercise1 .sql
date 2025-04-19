-- ============ Всё выполняется в базе dvdrental ============

-- 1. Список всех языков
SELECT *
FROM language;

-- 2. Все фильмы с их языком (только фильмы, у которых задан язык)
SELECT
  f.film_id,
  f.title,
  f.description,
  l.name AS language
FROM film AS f
JOIN language AS l
  ON f.language_id = l.language_id
ORDER BY f.film_id;

-- 3. Все языки, даже если в них нет фильмов
SELECT
  f.film_id,
  f.title,
  f.description,
  l.name AS language
FROM language AS l
LEFT JOIN film AS f
  ON f.language_id = l.language_id
ORDER BY l.language_id;

-- 4. Создание таблицы new_film и вставка примеров
DROP TABLE IF EXISTS new_film;

CREATE TABLE new_film (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES
  ('The Next Big Thing'),
  ('Adventure Awaits'),
  ('Coding in Space');

-- 5. Создание таблицы customer_review с каскадным удалением рецензий при удалении фильма
DROP TABLE IF EXISTS customer_review;

CREATE TABLE customer_review (
  review_id   SERIAL PRIMARY KEY,
  film_id     INTEGER NOT NULL
                REFERENCES new_film(id)
                ON DELETE CASCADE,
  language_id SMALLINT NOT NULL
                REFERENCES language(language_id),
  title       VARCHAR(255) NOT NULL,
  score       SMALLINT       NOT NULL CHECK (score BETWEEN 1 AND 10),
  review_text TEXT,
  last_update TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Добавление двух рецензий
INSERT INTO customer_review
  (film_id, language_id, title, score, review_text)
VALUES
  (1, 1, 'Amazing Premiere', 9,  'Очень понравился сюжет!'),
  (2, 2, 'Buona Avventura', 8, 'Хороший фильм, рекомендую.');

-- Проверяем содержимое рецензий
SELECT * FROM customer_review;

-- 7. Удаляем фильм с id = 1 из new_film
DELETE FROM new_film
WHERE id = 1;

-- После удаления, рецензия с film_id = 1 удалится автоматически
SELECT * FROM customer_review;
