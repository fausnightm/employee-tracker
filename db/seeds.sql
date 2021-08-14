USE employeesDB;

INSERT INTO department (id, name)
VALUES (101, "Human Resources"),
        (102, "Accounting"),
        (103,"Sales");


INSERT INTO role (id, title, salary, department_id)
VALUES (201, "Manager", 100000, 101),
        (202, "Sales Representative", 98000, 103),
        (203, "Accountant", 87000, 102);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (301, "Bob", "Johnson", 201, NULL),
        (302, "Daren", "Smith", 202, 301),
        (303, "Karl", "Andrews", 203, 301);

       