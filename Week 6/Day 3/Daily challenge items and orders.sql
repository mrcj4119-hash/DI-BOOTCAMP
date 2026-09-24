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
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Relationship: One user can have many product_orders (One-to-Many)
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

-- Relationship: One order can have many items, but an item belongs to only one order (One-to-Many)
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    order_id INT REFERENCES product_orders(order_id) ON DELETE CASCADE
);

-- Insert users
INSERT INTO users (username, email) VALUES
('alice_w', 'alice@example.com'),
('bob_m', 'bob@example.com');

-- Insert product orders
INSERT INTO product_orders (order_id, order_date, user_id) VALUES
(1, '2026-09-20', 1), -- Order 1 belongs to Alice
(2, '2026-09-22', 1), -- Order 2 belongs to Alice
(3, '2026-09-24', 2); -- Order 3 belongs to Bob

-- Insert items for orders
INSERT INTO items (item_name, price, order_id) VALUES
('Wireless Mouse', 25.50, 1),
('Mechanical Keyboard', 75.00, 1),
('USB-C Cable', 12.00, 1),
('Gaming Monitor', 200.00, 2),
('Desk Mat', 20.00, 3);

CREATE OR REPLACE FUNCTION get_order_total(target_order_id INT)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_price DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(price), 0.00)
    INTO total_price
    FROM items
    WHERE order_id = target_order_id;
    
    RETURN total_price;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_order_total(target_user_id INT, target_order_id INT)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_price DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(items.price), 0.00)
    INTO total_price
    FROM items
    JOIN product_orders ON items.order_id = product_orders.order_id
    WHERE product_orders.user_id = target_user_id 
      AND product_orders.order_id = target_order_id;
    
    RETURN total_price;
END;
$$ LANGUAGE plpgsql;

-- Test 1: Get total price for order_id = 1
SELECT get_order_total(1) AS order_1_total;

-- Test 2 (Bonus): Get total price for user_id = 1 and order_id = 1 (Alice's Order 1)
SELECT get_user_order_total(1, 1) AS alice_order_1_total;

-- Test 3 (Bonus): Check non-matching user/order combo (should return 0.00)
SELECT get_user_order_total(2, 1) AS bob_order_1_total;