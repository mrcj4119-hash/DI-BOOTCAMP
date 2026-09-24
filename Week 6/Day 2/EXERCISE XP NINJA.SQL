
-- 1. Fetch the last 2 customers in alphabetical order (A-Z) – exclude 'id' from the results
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC, last_name ASC
OFFSET (SELECT COUNT(*) FROM customers) - 2;


-- 2. Use SQL to delete all purchases made by Scott
DELETE FROM purchases
WHERE customer_id = (
    SELECT id 
    FROM customers 
    WHERE first_name = 'Scott' AND last_name = 'Scott'
);


-- 3. Does Scott still exist in the customers table, even though his purchases were deleted? Try and find him.
SELECT * 
FROM customers 
WHERE first_name = 'Scott';
-- Answer: YES, Scott still exists in the customers table because only his records in the 'purchases' table were deleted, not his entry in 'customers'.


-- 4. Use SQL to find all purchases. Join purchases with the customers table, 
-- so that Scott's order will appear, although instead of the customer's first and last name, you should only see empty/blank.
-- (Which kind of join should you use?)
SELECT 
    purchases.id AS purchase_id,
    purchases.item_id,
    purchases.quantity_purchased,
    COALESCE(customers.first_name, '') AS first_name,
    COALESCE(customers.last_name, '') AS last_name
FROM purchases
LEFT JOIN customers ON purchases.customer_id = customers.id;
-- Answer: You should use a LEFT JOIN (or LEFT OUTER JOIN). This keeps all rows from the 'purchases' table even if there is no matching record in 'customers'.


-- 5. Use SQL to find all purchases. Join purchases with the customers table, so that Scott's order will NOT appear.
-- (Which kind of join should you use?)
SELECT 
    purchases.id AS purchase_id,
    customers.first_name,
    customers.last_name,
    purchases.item_id,
    purchases.quantity_purchased
FROM purchases
INNER JOIN customers ON purchases.customer_id = customers.id;
-- Answer: You should use an INNER JOIN. It only returns records where there is a matching customer_id present in both tables.