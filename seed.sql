DROP DATABASE IF EXISTS employee_db;

USE employees_db;



INSERT INTO department(name)
VALUES ("sales"), ("finance"), ("engineering"), ("legal");

INSERT INTO roles(title, salary, department_id)
VALUES ("accountant", 100000, 1), ("lawyer", 150000, 2), ("mechanic", 70000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Will", "Woodburn", 1, 2), ("John", "Doe", 3, NULL), ("Jane", "Smith", 2, 1)


