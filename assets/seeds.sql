USE employee_tracker_DB;


INSERT INTO department (department_id, name)
VALUES (1, "engineering"), (2, "finance"),(3, "sales"),(4, "purchase"),(5, "it"),(6, "human resources");

INSERT INTO employee (employee_id, first_name, last_name, manager_id, role_id)
VALUES (8, "Tim", "Kevin", 10, 25),(9, "Solomon", "Fassil", 8, 26), (10, "Musa", "Daniel", 11, 24);

INSERT INTO employee (employee_id, first_name, last_name, manager_id, role_id)
VALUES(11, "Helen", "Dobrik", NULL , 28), (12, "Salem", "David", 10, 30), (13, "Hanna", "Samchez", 8, 27), (14, "Navi", "Rhanda", 8, 27);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (24, "Software Engineering", 120000,1), (25, "Finance", 100000, 2), (26, "Sales", 45000, 3);

INSERT INTO role (role_id, title, salary, department_id)
VALUES(27, "Purchase", 60000, 4), (28, "Human Resources", 160000, 6), (29, "It", 140000, 5), (30, "Intern", 20000, 5);