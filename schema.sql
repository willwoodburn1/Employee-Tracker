DROP DATABASE IF EXISTS employees_db;


CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);


CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NULL,
    salary INTEGER NULL,
    department_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);


CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);


INSERT INTO department(name)
VALUES ("sales"), ("finance"), ("engineering"), ("legal");

INSERT INTO roles(title, salary, department_id)
VALUES ("accountant", 100000, 1), ("lawyer", 150000, 2), ("mechanic", 70000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Will", "Woodburn", 1, NULL), ("John", "Doe", 3, 1), ("Jane", "Smith", 2, NULL);


SELECT * FROM department;

SELECT * FROM roles;

SELECT * FROM employee;

SELECT id AS "key", title AS "value" FROM roles;
   
SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, department.name
FROM employee
RIGHT JOIN department ON employee.id = department.id ;

-- SELECT department.name, roles.title, roles.salary
-- FROM department
-- RIGHT JOIN roles on department.id = roles.id;

-- SELECT *
-- FROM employee
-- RIGHT JOIN roles ON employee.id = roles.id;