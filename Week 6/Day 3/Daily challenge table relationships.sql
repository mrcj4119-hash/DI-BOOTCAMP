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
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--
-- 1. Create tables
CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT false,
    customer_id INT UNIQUE REFERENCES Customer(id) ON DELETE CASCADE
);

-- 2. Insert customers
INSERT INTO Customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

-- 3. Insert customer profiles using subqueries
-- John is loggedIn
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (
    true, 
    (SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe')
);

-- Jerome is not logged in
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (
    false, 
    (SELECT id FROM Customer WHERE first_name = 'Jerome' AND last_name = 'Lalu')
);

-- 4. Display queries using JOINs

-- 4.1 The first_name of the LoggedIn customers
SELECT Customer.first_name
FROM Customer
JOIN Customer_profile ON Customer.id = Customer_profile.customer_id
WHERE Customer_profile.isLoggedIn = true;

-- 4.2 All customers first_name and isLoggedIn columns (even those without a profile)
SELECT Customer.first_name, Customer_profile.isLoggedIn
FROM Customer
LEFT JOIN Customer_profile ON Customer.id = Customer_profile.customer_id;

-- 4.3 The number of customers that are not LoggedIn (includes customers with no profile or isLoggedIn = false)
SELECT COUNT(*) AS not_logged_in_count
FROM Customer
LEFT JOIN Customer_profile ON Customer.id = Customer_profile.customer_id
WHERE Customer_profile.isLoggedIn IS NOT TRUE;


-- 1. Create Book table
CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

-- 2. Insert books
INSERT INTO Book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- 3. Create Student table with CHECK constraint on age <= 15
CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

-- 4. Insert students
INSERT INTO Student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

-- 5. Create Library junction table
CREATE TABLE Library (
    book_fk_id INT REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INT REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id)
);

-- 6. Add 4 records to Library using subqueries
-- John borrowed Alice In Wonderland on 15/02/2022
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE name = 'John'),
    '2022-02-15'
);

-- Bob borrowed To kill a mockingbird on 03/03/2021
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
    (SELECT student_id FROM Student WHERE name = 'Bob'),
    '2021-03-03'
);

-- Lera borrowed Alice In Wonderland on 23/05/2021
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM Student WHERE name = 'Lera'),
    '2021-05-23'
);

-- Bob borrowed Harry Potter on 12/08/2021
INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM Book WHERE title = 'Harry Potter'),
    (SELECT student_id FROM Student WHERE name = 'Bob'),
    '2021-08-12'
);

-- 7. Display the data

-- 7.1 Select all columns from the junction table
SELECT * FROM Library;

-- 7.2 Select the name of the student and the title of the borrowed books
SELECT Student.name AS student_name, Book.title AS book_title
FROM Library
JOIN Student ON Library.student_fk_id = Student.student_id
JOIN Book ON Library.book_fk_id = Book.book_id;

-- 7.3 Select the average age of children that borrowed 'Alice in Wonderland'
SELECT ROUND(AVG(Student.age), 2) AS average_age
FROM Library
JOIN Student ON Library.student_fk_id = Student.student_id
JOIN Book ON Library.book_fk_id = Book.book_id
WHERE Book.title = 'Alice In Wonderland';

-- 7.4 Delete a student from the Student table
DELETE FROM Student WHERE name = 'John';

-- Question Answer:
-- Because student_fk_id has the ON DELETE CASCADE constraint, deleting 'John' from Student
-- automatically deletes all records associated with John from the Library junction table as well.