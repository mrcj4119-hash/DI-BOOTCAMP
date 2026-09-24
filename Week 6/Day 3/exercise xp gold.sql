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
-- Name: rental.rental-id; Type: TABLE; Schema: public; Owner: postgres
--
-- 1. Get a list of all rentals which are out (have not been returned).
-- How do we identify these films? We look for rows in the 'rental' table where 'return_date' IS NULL.
SELECT rental.rental_id, rental.rental_date, film.title, customer.first_name, customer.last_name
FROM rental
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
JOIN customer ON rental.customer_id = customer.customer_id
WHERE rental.return_date IS NULL;


-- 2. Get a list of all customers who have not returned their rentals (grouped results)
SELECT 
    customer.customer_id, 
    customer.first_name, 
    customer.last_name, 
    COUNT(rental.rental_id) AS total_unreturned_rentals
FROM customer
JOIN rental ON customer.customer_id = rental.customer_id
WHERE rental.return_date IS NULL
GROUP BY customer.customer_id, customer.first_name, customer.last_name
ORDER BY total_unreturned_rentals DESC;


-- 3. Get a list of all Action films starring Joe Swank
-- Shortcut/View check: The standard Sakila database includes built-in views like 'actor_info' or 'nicer_list'
-- which pre-join films, categories, and actors. Here is the direct SQL query:
SELECT film.title, film.description, category.name AS category
FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON film_actor.actor_id = actor.actor_id
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE actor.first_name = 'JOE' 
  AND actor.last_name = 'SWANK'
  AND category.name = 'Action';


-- 1. How many stores there are, and in which city and country they are located
SELECT 
    store.store_id, 
    city.city, 
    country.country
FROM store
JOIN address ON store.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id;


-- 2 & 3. Total viewing time (sum of length) for each store, excluding unreturned inventory items
-- (Only includes inventory items that have been returned or were never rented out)
SELECT 
    store.store_id, 
    SUM(film.length) AS total_minutes,
    ROUND(SUM(film.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(film.length) / 1440.0, 2) AS total_days
FROM inventory
JOIN store ON inventory.store_id = store.store_id
JOIN film ON inventory.film_id = film.film_id
WHERE inventory.inventory_id NOT IN (
    SELECT inventory_id 
    FROM rental 
    WHERE return_date IS NULL
)
GROUP BY store.store_id;


-- 4. A list of all customers in the cities where the stores are located
SELECT 
    customer.customer_id, 
    customer.first_name, 
    customer.last_name, 
    city.city
FROM customer
JOIN address ON customer.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
WHERE city.city_id IN (
    SELECT address.city_id 
    FROM store 
    JOIN address ON store.address_id = address.address_id
);


-- 5. A list of all customers in the countries where the stores are located
SELECT 
    customer.customer_id, 
    customer.first_name, 
    customer.last_name, 
    country.country
FROM customer
JOIN address ON customer.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id
WHERE country.country_id IN (
    SELECT city.country_id 
    FROM store 
    JOIN address ON store.address_id = address.address_id
    JOIN city ON address.city_id = city.city_id
);


-- 6 & 7. Safe list of movies (Excluding 'Horror' and scary keywords) + Total Viewing Time in minutes, hours, and days
-- Demonstrating CHECK constraint pattern / filtering criteria:
SELECT 
    SUM(film.length) AS safe_total_minutes,
    ROUND(SUM(film.length) / 60.0, 2) AS safe_total_hours,
    ROUND(SUM(film.length) / 1440.0, 2) AS safe_total_days
FROM inventory
JOIN film ON inventory.film_id = film.film_id
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE category.name != 'Horror'
  AND film.title NOT ILIKE ALL (ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
  AND film.description NOT ILIKE ALL (ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
  AND inventory.inventory_id NOT IN (
      SELECT inventory_id 
      FROM rental 
      WHERE return_date IS NULL
  );