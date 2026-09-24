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
--

-- 1. Find out how many films there are for each rating
SELECT rating, COUNT(*) AS total_films
FROM film
GROUP BY rating;

-- 2. Get a list of all movies that have a rating of G or PG-13
SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13');

-- 3. Filter further: under 2 hours (120 mins), rental_rate < 3.00, sorted alphabetically
SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;

-- 4. Find a customer in the customer table and update details to your own
-- (Using customer_id = 1 as an example)
UPDATE customer
SET first_name = 'YourFirstName',
    last_name = 'YourLastName',
    email = 'your.email@example.com'
WHERE customer_id = 1;

-- 5. Find the customer's address and update it
UPDATE address
SET address = '123 Main Street',
    district = 'Some District',
    postal_code = '12345'
WHERE address_id = (
    SELECT address_id 
    FROM customer 
    WHERE customer_id = 1
);


-- --- UPDATE ---
-- 1. Update birth_dates for twins 'Lea Benichou' and 'Marc Benichou' to 02/11/1998
UPDATE students
SET birth_date = '1998-11-02'
WHERE (first_name = 'Lea' AND last_name = 'Benichou')
   OR (first_name = 'Marc' AND last_name = 'Benichou');

-- 2. Change last_name of David from 'Grez' to 'Guez'
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David' AND last_name = 'Grez';


-- --- DELETE ---
-- 1. Delete student named 'Lea Benichou'
DELETE FROM students
WHERE first_name = 'Lea' AND last_name = 'Benichou';


-- --- COUNT ---
-- 1. Count how many students are in the table
SELECT COUNT(*) AS total_students 
FROM students;

-- 2. Count how many students were born after 1/01/2000
SELECT COUNT(*) AS students_born_after_2000 
FROM students
WHERE birth_date > '2000-01-01';


-- --- INSERT / ALTER ---
-- 1. Add column math_grade to student table
ALTER TABLE students 
ADD COLUMN math_grade INT;

-- 2. Add 80 to student with id = 1
UPDATE students 
SET math_grade = 80 
WHERE id = 1;

-- 3. Add 90 to students with ids 2 or 4
UPDATE students 
SET math_grade = 90 
WHERE id IN (2, 4);

-- 4. Add 40 to student with id = 6
UPDATE students 
SET math_grade = 40 
WHERE id = 6;

-- 5. Count how many students have a grade bigger than 83
SELECT COUNT(*) AS high_scoring_students 
FROM students 
WHERE math_grade > 83;

-- 6 & 7. Add another 'Omer Simpson' with the same birth_date as existing one and grade 70
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT 'Omer', 'Simpson', birth_date, 70
FROM students
WHERE first_name = 'Omer' AND last_name = 'Simpson'
LIMIT 1;

-- Bonus: Count how many grades each student has
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;


-- --- SUM ---
-- Find the sum of all student grades
SELECT SUM(math_grade) AS sum_all_grades 
FROM students;


-- --- PART I ---
-- 1. Create purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    item_id INT REFERENCES items(id),
    quantity_purchased INT
);

-- 2. Insert purchases using subqueries
-- Scott Scott bought one fan
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT id FROM items WHERE item_name ILIKE '%fan%'),
    1
);

-- Melanie Johnson bought ten large desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
    (SELECT id FROM items WHERE item_name ILIKE '%large desk%'),
    10
);

-- Greg Jones bought two small desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
    (SELECT id FROM items WHERE item_name ILIKE '%small desk%'),
    2
);


-- --- PART II ---
-- 1.1 All purchases (Not very useful on its own because IDs lack readable details)
SELECT * FROM purchases;

-- 1.2 All purchases, joining with customers table
SELECT purchases.id, customers.first_name, customers.last_name, purchases.quantity_purchased
FROM purchases
JOIN customers ON purchases.customer_id = customers.id;

-- 1.3 Purchases of customer with ID equal to 5
SELECT * FROM purchases 
WHERE customer_id = 5;

-- 1.4 Purchases for a large desk AND a small desk
SELECT purchases.*, items.item_name
FROM purchases
JOIN items ON purchases.item_id = items.id
WHERE items.item_name ILIKE '%large desk%' 
   OR items.item_name ILIKE '%small desk%';

-- 2. Show all customers who have made a purchase (first_name, last_name, item_name)
SELECT customers.first_name, customers.last_name, items.item_name
FROM purchases
JOIN customers ON purchases.customer_id = customers.id
JOIN items ON purchases.item_id = items.id;

-- 3. Add a row referencing a customer by ID, but without referencing an item ID
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 1);

-- Answer to 3:
-- YES, this works because the item_id foreign key permits NULL values unless 
-- a NOT NULL constraint was explicitly set on that column during creation.
