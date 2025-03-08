-- Drop the database if it exists and create a new one
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Connect to the new database
\c employees_db;

-- Create the departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- Create the roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL
);

-- Create the employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  manager_id INTEGER REFERENCES employees(id) ON DELETE SET NULL
);


-- to see if is filled the tables correctly.--
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;