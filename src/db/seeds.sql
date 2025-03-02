
-- adding random peoples for testing--
INSERT INTO departments (name) VALUES ('Engineering'), ('HR'), ('Sales');

INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 60000, 2),
('Sales Associate', 50000, 3);

INSERT INTO employees (first_name, last_name, title_id, department_id, manager_id) VALUES 
('Alice', 'Johnson', 1, 1, NULL),
('Bob', 'Smith', 2, 2, NULL),
('Charlie', 'Brown', 3, 3, 1);




