USE employee_tracker_DB;


INSERT INTO department (  name)
VALUES ("engineering"), ( "finance"),("sales"),("purchase"),( "it"),( "human resources");

INSERT INTO role ( title, salary, department_id)
VALUES ( "Software Engineering", 120000.00,1), ( "Finance", 100000.00, 2), ("Sales", 45000.00, 3);

INSERT INTO role ( title, salary, department_id)
VALUES( "Purchase", 60000.00, 4), ( "Human Resources", 160000.00, 6), ( "It", 140000.00, 5), ( "Intern", 20000.00, 5);

INSERT INTO employee ( first_name, last_name, manager_id, role_id)
VALUES ( "Tim", "Kevin", 3, 2),( "Solomon", "Fassil", 1, 3), ( "Musa", "Daniel", 4, 1);

INSERT INTO employee ( first_name, last_name, manager_id, role_id)
VALUES( "Helen", "Dobrik", NULL ,5), ( "Salem", "David", 3,7), ( "Hanna", "Samchez", 1,4), ( "Navi", "Rhanda", 1, 4);

