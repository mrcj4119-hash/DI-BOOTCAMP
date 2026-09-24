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
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--
/* EXERCISE 1: ITEMS AND CUSTOMERS 
*/

-- 1. All items, ordered by price (lowest to highest)
SELECT * FROM items 
ORDER BY price ASC;

-- 2. Items with price >= 80, ordered by price (highest to lowest)
SELECT * FROM items 
WHERE price >= 80 
ORDER BY price DESC;

-- 3. First 3 customers (A-Z) excluding PK
SELECT first_name, last_name 
FROM customers 
ORDER BY first_name ASC 
LIMIT 3;

-- 4. Last names in reverse alphabetical order
SELECT last_name 
FROM customers 
ORDER BY last_name DESC;


-----------------------------------------------------------


/* EXERCISE 2: DVD RENTAL DATABASE 
*/

-- 1. All columns from customer
SELECT * FROM customer;

-- 2. Full name alias
SELECT first_name || ' ' || last_name AS full_name 
FROM customer;

-- 3. Distinct creation dates
SELECT DISTINCT create_date FROM customer;

-- 4. Customer details ordered by first name DESC
SELECT * FROM customer 
ORDER BY first_name DESC;

-- 5. Film details by rental rate ASC
SELECT film_id, title, description, release_year, rental_rate 
FROM film 
ORDER BY rental_rate ASC;

-- 6. Texas addresses and phone numbers
SELECT address, phone 
FROM address 
WHERE district = 'Texas';

-- 7. Film details for ID 15 or 150
SELECT * FROM film 
WHERE film_id IN (15, 150);

-- 8. Favorite movie check (Example: 'Inception')
SELECT film_id, title, description, length, rental_rate 
FROM film 
WHERE title = 'Inception';

-- 9. Search by first two letters (Example: 'In')
SELECT film_id, title, description, length, rental_rate 
FROM film 
WHERE title LIKE 'In%';

-- 10. 10 cheapest movies
SELECT title, rental_rate 
FROM film 
ORDER BY rental_rate ASC 
LIMIT 10;

-- 11. Next 10 cheapest movies (No LIMIT bonus)
SELECT title, rental_rate 
FROM film 
ORDER BY rental_rate ASC 
OFFSET 10 ROWS 
FETCH NEXT 10 ROWS ONLY;

-- 12. Join Customer and Payment
SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
INNER JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

-- 13. Movies NOT in inventory
SELECT f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL;

-- 14. City and Country Join
SELECT city.city, country.country
FROM city
INNER JOIN country ON city.country_id = country.country_id;

-- 15. Bonus: Sales by staff member
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id;
