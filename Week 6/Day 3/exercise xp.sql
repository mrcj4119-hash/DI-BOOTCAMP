--
-- PostgreSQL database dump
--

\restrict KZ99LOO1c2V3kDLJRSsDQIGfpMYNxp9IqtmuswCXalYTbHfzU9f6oeOXvfV6eFc

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-23 09:09:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16446)
-- Name: language; Type: TABLE; Schema: public; Owner: postgres
--
-- 1. Get a list of all the languages, from the language table
SELECT * FROM language;


-- 2. Get a list of all films joined with their languages (film title, description, and language name)
SELECT 
    film.title, 
    film.description, 
    language.name AS language_name
FROM film
INNER JOIN language ON film.language_id = language.language_id;


-- 3. Get all languages, even if there are no films in those languages
SELECT 
    film.title, 
    film.description, 
    language.name AS language_name
FROM language
LEFT JOIN film ON language.language_id = film.language_id;


-- 4. Create a new table called new_film and add some new films
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES 
('Inception'),
('Interstellar'),
('The Dark Knight');


-- 5. Create a new table called customer_review with ON DELETE CASCADE
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INT REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INT CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 6. Add 2 movie reviews linked to valid objects in the other tables
INSERT INTO customer_review (film_id, language_id, title, score, review_text) 
VALUES 
(
    (SELECT id FROM new_film WHERE name = 'Inception'),
    (SELECT language_id FROM language WHERE name = 'English'),
    'Mind Bending!',
    9,
    'An absolute masterpiece of visual storytelling.'
),
(
    (SELECT id FROM new_film WHERE name = 'Interstellar'),
    (SELECT language_id FROM language WHERE name = 'English'),
    'Out of this world',
    10,
    'Incredible visuals and soundtrack.'
);


-- 7. Delete a film that has a review from new_film table
DELETE FROM new_film WHERE name = 'Inception';

-- Answer to Question 7:
-- Because we defined `film_id` with `ON DELETE CASCADE`, deleting 'Inception' from `new_film` 
-- automatically deletes all associated reviews in the `customer_review` table as well.



-- 1. Use UPDATE to change the language of some films
UPDATE film 
SET language_id = (SELECT language_id FROM language WHERE name = 'Italian')
WHERE film_id IN (1, 2, 3);


-- 2. Which foreign keys are defined for the customer table?
/*
Answer:
The foreign keys defined on the `customer` table are:
- `address_id` (references `address.address_id`)
- `store_id` (references `store.store_id`)

Impact on INSERT:
When inserting a new row into `customer`, the values provided for `address_id` and `store_id` 
MUST already exist in the `address` and `store` tables respectively, otherwise PostgreSQL will throw a foreign key constraint error.
*/


-- 3. Drop customer_review table. Is this an easy step or does it need extra checking?
DROP TABLE customer_review;

/*
Answer:
It is an easy step (`DROP TABLE customer_review;`) because no other tables depend on `customer_review` as a foreign key target.
However, it is always good practice to check if dependent views or triggers rely on it before dropping.
*/


-- 4. Find out how many rentals are still outstanding (not returned yet)
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;


-- 5. Find the 30 most expensive movies which are outstanding (not returned yet)
SELECT DISTINCT 
    film.title, 
    film.replacement_cost, 
    rental.rental_date
FROM rental
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE rental.return_date IS NULL
ORDER BY film.replacement_cost DESC
LIMIT 30;


-- 6. Help your friend find the 4 movies:

-- 6.1 The 1st film: About a sumo wrestler, acting by Penelope Monroe
SELECT film.title, film.description
FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON film_actor.actor_id = actor.actor_id
WHERE actor.first_name = 'PENELOPE' 
  AND actor.last_name = 'MONROE'
  AND film.description ILIKE '%sumo%';

-- 6.2 The 2nd film: Short documentary (< 1 hr), rated "R"
SELECT film.title, film.length, film.rating, category.name AS category
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE category.name = 'Documentary'
  AND film.length < 60
  AND film.rating = 'R';

-- 6.3 The 3rd film: Rented by Matthew Mahan, paid > $4.00, returned between July 28 & Aug 1, 2005
SELECT DISTINCT film.title
FROM rental
JOIN customer ON rental.customer_id = customer.customer_id
JOIN payment ON rental.rental_id = payment.rental_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE customer.first_name = 'MATTHEW' 
  AND customer.last_name = 'MAHAN'
  AND payment.amount > 4.00
  AND rental.return_date BETWEEN '2005-07-28' AND '2005-08-01';

-- 6.4 The 4th film: Rented by Matthew Mahan, has "boat" in title/description, high replacement cost
SELECT DISTINCT film.title, film.description, film.replacement_cost
FROM rental
JOIN customer ON rental.customer_id = customer.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE customer.first_name = 'MATTHEW' 
  AND customer.last_name = 'MAHAN'
  AND (film.title ILIKE '%boat%' OR film.description ILIKE '%boat%')
ORDER BY film.replacement_cost DESC;