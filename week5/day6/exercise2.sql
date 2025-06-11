UPDATE film
SET language_id = (
  SELECT language_id
  FROM language
  WHERE name = 'Japanese'
)
WHERE film_id IN (1, 2);

SELECT film_id, title, language_id
FROM film
WHERE film_id IN (1, 2);

SELECT
  tc.constraint_name,
  kcu.column_name,
  ccu.table_name   AS foreign_table,
  ccu.column_name  AS foreign_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'customer'
  AND tc.constraint_type = 'FOREIGN KEY';

DROP TABLE IF EXISTS customer_review;

SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

SELECT
  f.film_id,
  f.title,
  f.rental_rate
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f      ON i.film_id     = f.film_id
WHERE r.return_date IS NULL
GROUP BY f.film_id, f.title, f.rental_rate
ORDER BY f.rental_rate DESC
LIMIT 30;

SELECT DISTINCT
  f.film_id,
  f.title
FROM film_actor fa
JOIN actor       a ON fa.actor_id = a.actor_id
JOIN film        f ON fa.film_id  = f.film_id
WHERE (f.description ILIKE '%sumo%' OR f.title ILIKE '%sumo%')
  AND a.first_name = 'Penelope'
  AND a.last_name  = 'Monroe';

SELECT
  film_id,
  title,
  description,
  length,
  rating
FROM film
WHERE length < 60
  AND rating = 'R';

SELECT DISTINCT
  f.film_id,
  f.title
FROM customer    c
JOIN rental      r ON c.customer_id = r.customer_id
JOIN payment     p ON r.rental_id   = p.rental_id
JOIN inventory   i ON r.inventory_id= i.inventory_id
JOIN film        f ON i.film_id     = f.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name  = 'Mahan'
  AND p.amount > 4.00
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

SELECT DISTINCT
  f.film_id,
  f.title,
  f.replacement_cost
FROM customer    c
JOIN rental      r ON c.customer_id = r.customer_id
JOIN inventory   i ON r.inventory_id= i.inventory_id
JOIN film        f ON i.film_id     = f.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name  = 'Mahan'
  AND (f.title       ILIKE '%boat%'
       OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;
