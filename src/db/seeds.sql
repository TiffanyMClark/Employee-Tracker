-- Insert departments
INSERT INTO departments (name) VALUES 
('Engineering'), 
('HR'), 
('Sales');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 60000, 2),
('Sales Associate', 50000, 3);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Johnson', 1, NULL), 
('Bob', 'Smith', 2, NULL),      
('Charlie', 'Brown', 3, 1);     
