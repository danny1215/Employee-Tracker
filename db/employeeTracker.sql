-- -- DROP DATABASE IF EXISTS employee_tracker_DB;
-- -- CREATE DATABASE employee_tracker_DB;

-- -- USE employee_tracker_DB;

-- -- CREATE TABLE department(
-- --   department_id INT NOT NULL AUTO_INCREMENT,
-- --   name VARCHAR(30) NOT NULL,
-- --   PRIMARY KEY (department_id)
-- -- );

-- -- CREATE TABLE role(
-- --   role_id INT NOT NULL AUTO_INCREMENT,
-- --   title VARCHAR(30) NOT NULL,
-- --   salary DECIMAL (10,2) NOT NULL,
-- --   department_id INT NOT NULL,
-- --   PRIMARY KEY (role_id),
-- --   FOREIGN KEY(department_id) REFERENCES department(department_id)
-- -- );

-- -- CREATE TABLE employee(
-- --   employee_id INT NOT NULL AUTO_INCREMENT,
-- --   first_name VARCHAR(30) NOT NULL,
-- --   last_name VARCHAR(30) NOT NULL,
-- --   manager_id INT NULL,
-- --   role_id INT NOT NULL,
-- --   PRIMARY KEY (employee_id),
-- --   FOREIGN KEY(role_id) REFERENCES role(role_id),
-- --   FOREIGN KEY(manager_id) REFERENCES employee(employee_id)
-- -- );




-- DROP DATABASE IF EXISTS employee_tracker_DB;
-- CREATE DATABASE employee_tracker_DB;

-- USE employee_tracker_DB;

-- CREATE TABLE department(
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(30) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE role(
--   id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(30) NOT NULL,
--   salary DECIMAL (10,2) NOT NULL,
--   department_id INT NOT NULL,
--   PRIMARY KEY (id),
--   CONSTRAINT fk_dept FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
-- );

-- CREATE TABLE employee(
--   id INT NOT NULL AUTO_INCREMENT,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   manager_id INT NULL,
--   role_id INT NOT NULL,
--   PRIMARY KEY (employee_id),
--   CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id),
--   CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id)
-- );




DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_dept FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
  
);
 



DROP DATABASE IF EXISTS dannyemp_db;
CREATE DATABASE danny_db;
USE employee_db;
CREATE TABLE departments(
id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30)
);
CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(8,2),
department_id INT,
FOREIGN KEY(department_id) REFERENCES departments(id)
);
CREATE TABLE employees(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
);


INSERT INTO departments(department_name)

VALUES 
('Management'),
('Sales'),
('Warehouse'),
('Human Resources'),
('Quality Control');
('Quality Control'),
('Office Management'),
('Accounting');

INSERT INTO roles(title, salary, department_id)
VALUES
('Regional Manager', 100000, 1),
('Sales Rep', 67000, 2),
('HR Rep', 72000, 4),
('Warehouse Worker', 45000, 3),
('Receptionist', 47000, 6),
('Accountant', 89000, 7);

INSERT INTO employees(first_name, last_name, role_id) 
VALUES
('Michael', 'Scott', 1),
('Pam', 'Beesly', 5),
('Jim', 'Halpert', 2),
('Toby', 'Flenderson', 3),
('Stanley', 'Hudson', 6),
('Darryl', 'Philbin', 3);