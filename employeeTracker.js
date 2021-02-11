const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');
const promisemysql = require("promise-mysql");
const connectionProperties = require('./db/connectionProperties')

const afterConnection = () => {
  

  inquirer
    .prompt({
      name: 'choiceType',
      type: 'rawlist',
      message: ' what would you like to do?',
      choices: ['ADD','VIEW', 'UPDATE', 'EXIT'],
    })
    .then((answer) => {
      switch (answer.choiceType) {
        case 'ADD':
          addFunction();
          break;

        case 'VIEW':
          viewFunction();
          break;

        case 'UPDATE':
          updateEmployee();
          break;

        case 'EXIT':
          console.log('-----------GOOD BYE--------');
          connection.end();

        // default:
        //   console.log(`Invalid action: ${answer.action}`);
        //   break;
      }
    });
};
afterConnection();



const addFunction = () => {
  

  inquirer
    .prompt({
      name: 'addType',
      type: 'rawlist',
      message: ' what would you like to add?',
    choices: ['EMPLOYEE','ROLE', 'DEPARTMENT', 'EXIT'],
    })
    .then((answer) => {
      switch (answer.addType) {
        case 'EMPLOYEE':
          addEmployee();
          break;

        case 'ROLE':
          addRole();
          break;

        case 'DEPARTMENT':
          addDepartment();
          break;

        case 'EXIT':
          console.log('-----------GOOD BYE--------');
          connection.end();

        // default:
        //   console.log(`Invalid action: ${answer.action}`);
        //   break;
      }
    });
};

 const addEmployee = () => {
   inquirer
   .prompt([
     {
      name: "first_name",
      type: "input",
      message: "what is the employee's first name"
     },

     {
      name: "last_name",
      type: "input",
      message: "what is the employee's last name"
     },

    {
      name: "manager_id",
      type: "rowlist",
      message: "what is the employee's Manager Id ",
     
     },

     {
      name: "role_id",
      type: "rowlist",
      message: "what is the employee's role Id? ",
     
     },
     
   ])
   
   .then((answer) => {
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          manager_id:answer.manager_id || 0,
          role_id: answer.role_id,
          
        },
        function(err, res) {
          if(err) throw err;
          console.log("----------------------");
          console.log(`${res.affectedRows} new employee added!\n`);
          // console.log("New employee has been added");
          console.log("----------------------");
          afterConnection();
          
        }
      );
   })
  }
  
  const addRole = () => {
    inquirer
    .prompt([
      {
       name: "title",
       type: "input",
       message: "please enter the title of the new role?",
      
      },

      {
       name: "salary",
       type: "input",
       message: "what is the role's salary?"
      },

     {
       name: "department_id",
       type: "rowlist",
       message: "please enter the number that corresponds to the new department's id you wish this role to be under that being 1 = engineering, 2 = finance, 3 = sales, 4 = purchase, 5 = it, 6 = human resources, 7 = Aeronotics",
      
      },

      
    ])

    .then((answer) => {
       connection.query("INSERT INTO role SET ?",
         {
           title: answer.title,
           salary:answer.salary,
           department_id: answer.department_id,
           
         },
         function(err, res) {
           if(err) throw err;
           console.log("----------------------");
           console.log(`${res.affectedRows}  role added!\n`);
          //  console.log("New role has been added");
           console.log("----------------------");
           afterConnection();
           
         }
       );
    })
   }



   const addDepartment = () => {
    inquirer
    .prompt([
      {
       name: "name",
       type: "input",
       message: "please enter the name of the department you wish to enter?",
      
      },

     
      
    ])

    .then((answer) =>{
       connection.query("INSERT INTO department SET ?",
         {
          name: answer.name,
          
           
         },
         function(err, res) {
           if(err) throw err;
           console.log("----------------------");
           console.log(`${res.affectedRows} department added!\n`);
          //  console.log("New department has been added");
           console.log("----------------------");
           afterConnection();
           
         }
       );
    })
   }






const viewFunction = () => {
  

  inquirer
    .prompt({
      name: 'viewType',
      type: 'rawlist',
      message: ' what would you like to view?',
    choices: ['VIEW ALL EMPLOYEE','VIEW ALL ROLE', 'VIEW ALL DEPARTMENT', 'EXIT'],
    })
    .then((answer) => {
      switch (answer.viewType) {
        case 'VIEW ALL EMPLOYEE':
          viewEmployee();
          break;

        case 'VIEW ALL ROLE':
          viewRole();
          break;

        case 'VIEW ALL DEPARTMENT':
          viewDepartment();
          break;

        case 'EXIT':
          console.log('-----------GOOD BYE--------');
          connection.end();

        // default:
        //   console.log(`Invalid action: ${answer.action}`);
        //   break;
      }
    });
};


  const viewEmployee = () => {
    console.log('Selecting all employee...\n');
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    connection.query(query, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
  };

  const viewRole = () => {
    console.log('View all role...\n');
    connection.query('SELECT role.id,role.title,department.name AS department,role.salary  FROM employee_tracker_db.role inner join employee_tracker_db.department ON (role.id = department.id) ', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
  };

  const viewDepartment = () => {
    console.log(' All department...\n');
    connection.query('SELECT department.id, department.name AS department, role.salary AS Utilized_budget FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY department ASC;', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
  };


console.log('-------------------------');



// Update Employee Role
function  updateEmployee(){
  // create employee and role array
  let employeeArr = [];
  let roleArr = [];
  // Create connection using promise-sql
 promisemysql.createConnection(connectionProperties
  ).then((conn) => {
      return Promise.all([
          // query all roles and employee
          conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
          conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
      ]);
  }).then(([roles, employees]) => {
      // place all roles in array
      for (i=0; i < roles.length; i++){
          roleArr.push(roles[i].title);
      }
      // place all empoyees in array
      for (i=0; i < employees.length; i++){
          employeeArr.push(employees[i].Employee);
          //console.log(value[i].name);
      }
      return Promise.all([roles, employees]);
  }).then(([roles, employees]) => {
      inquirer.prompt([
          {
              // prompt user to select employee
              name: "employee",
              type: "list",
              message: "Who would you like to edit?",
              choices: employeeArr
          }, {
              // Select role to update employee
              name: "role",
              type: "list",
              message: "What is their new role?",
              choices: roleArr
          },]).then((answer) => {
              let roleID;
              let employeeID;
              /// get ID of role selected
              for (i=0; i < roles.length; i++){
                  if (answer.role == roles[i].title){
                      roleID = roles[i].id;
                  }
              }
              // get ID of employee selected
              for (i=0; i < employees.length; i++){
                  if (answer.employee == employees[i].Employee){
                      employeeID = employees[i].id;
                  }
              }
              
              // update employee with new role
              connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`, (err, res) => {
                  if(err) return err;
                  // confirm update employee
                  console.log(`\n ${answer.employee} ROLE UPDATED TO ${answer.role}...\n `);
                  // back to main menu
                  afterConnection();
              });
          });
  });
  
}


    
    //   const updateEmployee = () => {
    //   inquirer
    //     .prompt([
    //     {
    //      name: "first_name_employee",
    //      type: 'rawlist',
    //      message: "please choose the name of the empoyee whose role you wish to update?",
    //     choices:['Tim', 'Solomon', 'Musa',' Helen', ' Salem', 'Hanna', 'Navi', 'dawit']
         
    //     },
    //     {
    //       name: "new_role_id",
    //       type: "input",
    //       message: "Please enter the number that correspondes to the new role you wish to update?",
          
        
         
    //      },
 
       
        
    //   ])
 
    //   .then((answer) =>{
    //      connection.query(" UPDATE  employee SET ? WHERE ?",
    //        [
    //          {
    //           role_id: answer.new_role_id,
    //          },
    //          {
    //            first_name: answer.first_name_employee
    //          },
    //        ],
    //        function(err, res) {
    //          if(err) throw err;
    //          console.log("----------------------");
    //          console.log(`${res.affectedRows} employee role updated!\n`);
    //         //  console.log("New role_id has been updated");
    //          console.log("----------------------");
    //         afterConnection();
             
    //        }
    //      );
    //   })
    //  };

    
    
    //  const deleteProduct = () => {
    //   console.log('Deleting all strawberry icecream...\n');
    //   connection.query(
    //     'DELETE FROM products WHERE ?',
    //     {
    //       flavor: 'strawberry',
    //     },
    //     (err, res) => {
    //       if (err) throw err;
    //       console.log(`${res.affectedRows} products deleted!\n`);
    //       // Call readProducts AFTER the DELETE completes
    //       readProducts();
    //     }
    //   );
    // };
    




    //   const addEmployee = () => {
    //   console.log('adding all employee...\n');
    //   connection.query('SELECT * FROM employee', (err, res) => {
    //     if (err) throw err;
    //     // Log all results of the SELECT statement
    //     console.table(res);
        
    //   });
    // };
  
    // const viewRole = () => {
    //   console.log('Selecting all role...\n');
    //   connection.query('SELECT * FROM role', (err, res) => {
    //     if (err) throw err;
    //     // Log all results of the SELECT statement
    //     console.table(res);
        
    //   });
    // };
  
    // const viewDepartment = () => {
    //   console.log('Selecting all department...\n');
    //   connection.query('SELECT * FROM department', (err, res) => {
    //     if (err) throw err;
    //     // Log all results of the SELECT statement
    //     console.table(res);
    //     afterConnection();
    //   });
    // };