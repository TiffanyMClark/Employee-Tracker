-- Create new databases --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
-- Use inventory_db --
\c employees_db;

-- See database in use --
SELECT current_database();

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT REFERENCES departments(id)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title_id INT REFERENCES roles(id),
  department_id INT REFERENCES departments(id),
  manager_id INT REFERENCES employees(id)
);

-- to see if is filled the tables correctly.--
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;