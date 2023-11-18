/* NOMOR 1 */
SELECT * 
FROM employees;

/* NOMOR 2 */
SELECT COUNT(job_title) 
FROM products 
WHERE job_title = 'Manager';

/* NOMOR 3 */
SELECT name, salary 
FROM employees 
WHERE department = "Sales" OR department = "Marketing";

/* NOMOR 4 */
SELECT AVG(salary) 
FROM employees 
WHERE joined_date >= '2016-01-01';

/* NOMOR 5 */
SELECT employees.name AS name, SUM(sales_data.sales) AS total_sales 
FROM employees 
INNER JOIN sales_data 
ON employees.id = sales_data.employee_id 
GROUP BY employees.id 
ORDER BY total_sales DESC 
LIMIT 5;