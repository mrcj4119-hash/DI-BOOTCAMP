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
-- Name: film; Type: TABLE; Schema: public; Owner: postgres
--
-- 1. Retrieve all films rated 'G' or 'PG' that are NOT currently rented out
-- (They have either been returned or have never been borrowed)
SELECT DISTINCT 
    film.film_id, 
    film.title, 
    film.rating
FROM film
JOIN inventory ON film.film_id = inventory.film_id
WHERE film.rating IN ('G', 'PG')
  AND inventory.inventory_id NOT IN (
      SELECT inventory_id 
      FROM rental 
      WHERE return_date IS NULL
  );


-- 2. Create a waiting list table for children's movies
-- Table references to include:
-- - film_id (REFERENCES film.film_id): links the entry to the specific movie
-- - customer_id / child_id (REFERENCES customer.customer_id): links the entry to the child/customer
CREATE TABLE children_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL REFERENCES film(film_id) ON DELETE CASCADE,
    customer_id INT NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. Test the waiting list table by inserting test rows and retrieving the wait counts

-- Insert sample waiting list records (e.g., customers waiting for films with film_id 1 and 2)
INSERT INTO children_waiting_list (film_id, customer_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5);

-- Retrieve the number of people waiting for each children's DVD
SELECT 
    film.film_id,
    film.title,
    film.rating,
    COUNT(children_waiting_list.waiting_id) AS total_waiting
FROM children_waiting_list
JOIN film ON children_waiting_list.film_id = film.film_id
GROUP BY film.film_id, film.title, film.rating
ORDER BY total_waiting DESC;