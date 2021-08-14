// dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password",
    database: "employeesDB"
  });

//   functions I will need
// 

// console.log(connection);

// connection.query(
//     'SELECT * FROM `department`',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//     }
//   );

inquirer
  .prompt([
      {
        type: 'list',
        message: 'What would you like to view?',
        name: 'view',
        choices:  ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
      },

    /* Pass your questions in here */
  ])
  .then((answers) => {
      
      if (answers.view == "view all departments"){

        connection.query(
            'SELECT * FROM `department`',
            function(err, results, fields) {
                console.log(cTable.getTable(results)); // results contains rows returned by server
            }
        );

      } else if (answers.view == "view all roles"){

        connection.query(
            'SELECT * FROM `role`',
            function(err, results, fields) {
                console.log(cTable.getTable(results)); // results contains rows returned by server
            }
        );

      } else if (answers.view == "view all employees"){

        connection.query(
            'SELECT * FROM `employee`',
            function(err, results, fields) {
                console.log(cTable.getTable(results)); // results contains rows returned by server
            }
        );

      }else if (answers.view == "add a department"){

        inquirer
        .prompt ([
            {
              type: 'input',
              name: 'department',
              message: 'What is the name of the department?'
            }
        ]).then ((answers) => {

            connection.query(
            'INSERT INTO `department` (name) VALUES ("' + answers.department + '");',
            function(err, results, fields) {
                console.log(results);
                console.log(err);
            }
        );
        })
        .catch((error) => {
            if (error) throw error
        });

      }else if (answers.view == "add a role"){

          inquirer
          .prompt ([
              {
                type: 'input',
                name: 'title',
                message: 'What is the role?'
              },
              {
                type: 'input',
                name: 'salary',
                message: 'What is their salary?'
              },
              {
                type: 'input',
                name: 'department',
                message: 'What is the department Id?'
              }
          ]).then ((answers) => {
            connection.query(
                'INSERT INTO `role` (title, salary, department_id) VALUES ("' + answers.title + '",' + answers.salary + ',' + answers.department + ');',
                function(err, results, fields) {
                    console.log(results);
                    console.log(err);
                }
                );          
        })
          .catch((error) => {
              if (error) throw error
          });

      }else if (answers.view == "add an employee"){
        inquirer
        .prompt ([
            {
              type: 'input',
              name: 'first',
              message: 'What is their first name?'
            },
            {
                type: 'input',
                name: 'last',
                message: 'What is their last name?'
              },
              {
                type: 'input',
                name: 'role',
                message: 'What is their role Id?'
              },
              {
                type: 'input',
                name: 'manager',
                message: 'What is their managers Id?'
              }
        ]).then ((answers) => {

            connection.query(
                'INSERT INTO `employee` (first_name, last_name, role_id, manager_id) VALUES ("' + answers.first + '","' + answers.last + '",' + answers.role + ',' + answers.manager + ');',
                function(err, results, fields) {
                    console.log(results);
                    console.log(err);
                }
                );        
            })
        .catch((error) => {
            if (error) throw error
        });
      } else if (answers.view == "update an employee role"){

        let choices = [];
        let roleChoices = [];

        connection.query(
            'SELECT * FROM `employee`',
            function(err, results, fields) {
                for(let i = 0; i < results.length; i++) {
                    choices.push(results[i]['first_name']);
                    // console.log(results[i]['first_name'])
                }

                connection.query(
                    'SELECT * FROM `role`',
                    function(err, results, fields) {
                        for(let i = 0; i < results.length; i++) {
                            roleChoices.push(results[i]['id']);
                            // console.log(results[i]['first_name'])
                        }
        

                inquirer
                .prompt ([
                    {
                      type: 'list',
                      name: 'existing',
                      message: 'Which employee are you updating?',
                      choices: choices
                    },
                    {
                        type: 'list',
                        name: 'existingRoles',
                        message: 'Which role id are you updating?',
                        choices: roleChoices
                    }
                ]).then ((answers) => {
                    connection.query(
                        'UPDATE employee SET role_id=' + answers.existingRoles + ' WHERE first_name = "' + answers.existing + '"',
                        function(err, results, fields) {
                            console.log(err);
                            
                        });


                })        
                .catch((error) => {
                    if (error) throw error
                });
            }
            ); 

            console.log(choices);});


    }
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

