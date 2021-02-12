
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection');
const promisemysql = require("promise-mysql");
const connectionProperties = require('./config/connectionProperties')

const afterConnection = () => {
  

  inquirer
    .prompt({
      name: 'choiceType',
      type: 'rawlist',
      message: ' what would you like to do?',
      choices: ['ADD','VIEW', 'UPDATE','DELETE', 'EXIT'],
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

          case 'DELETE':
          deleteEmployee();
          break;

        case 'EXIT':
          console.log('-----------GOOD BYE--------');
          connection.end();

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

      }
    });
};






// Add employee
function addEmployee(){
  // Create two global array to hold 
  let roleArr = [];
  let managerArr = [];
  // Create connection using promise-sql
  promisemysql.createConnection(connectionProperties
  ).then((conn) => {
      // Query  all roles and all manager. Pass as a promise
      return Promise.all([
          conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
          conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
      ]);
  }).then(([roles, managers]) => {
      // Place all roles in array
      for (i=0; i < roles.length; i++){
          roleArr.push(roles[i].title);
      }
      // place all managers in array
      for (i=0; i < managers.length; i++){
          managerArr.push(managers[i].Employee);
      }
      return Promise.all([roles, managers]);
  }).then(([roles, managers]) => {
      // add option for no manager
      managerArr.unshift('--');
      inquirer.prompt([
          {
              // Prompt user of their first name
              name: "firstName",
              type: "input",
              message: "what is the employee's first name ",
              // Validate field is not blank
              validate: function(input){
                  if (input === ""){
                      console.log("**FIELD REQUIRED**");
                      return false;
                  }
                  else{
                      return true;
                  }
              }
          },
          {
              // Prompt user of their last name
              name: "lastName",
              type: "input",
              message: "what is the employee's last name ",
              // Validate field is not blank
              validate: function(input){
                  if (input === ""){
                      console.log("**FIELD REQUIRED**");
                      return false;
                  }
                  else{
                      return true;
                  }
              }
          },
          {
              // Prompt user of their role
              name: "role",
              type: "list",
              message: "What is the employee's role?",
              choices: roleArr
          },{
              // Prompt user for manager
              name: "manager",
              type: "list",
              message: "who is the employee's Manager?",
              choices: managerArr
          }]).then((answer) => {
              // Set variable for IDs
              let roleID;
              // Default Manager value as null
              let managerID = null;
              // Get ID of role selected
              for (i=0; i < roles.length; i++){
                  if (answer.role == roles[i].title){
                      roleID = roles[i].id;
                  }
              }
              // get ID of manager selected
              for (i=0; i < managers.length; i++){
                  if (answer.manager == managers[i].Employee){
                      managerID = managers[i].id;
                  }
              }
              // Add employee
              connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
                  if(err) return err;
                  // Confirm employee has been added
                  console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
                  afterConnection();
              });
          });
  });
}


//  Add Role
function addRole(){
    // Create array of departments
    let departmentArr = [];
    // Create connection using promise-sql
    promisemysql.createConnection(connectionProperties)
    .then((conn) => {
        // Query all departments
        return conn.query('SELECT id, name FROM department ORDER BY name ASC');
    }).then((departments) => {
        
        // Place all departments in array
        for (i=0; i < departments.length; i++){
            departmentArr.push(departments[i].name);
        }
        return departments;
    }).then((departments) => {
        
        inquirer.prompt([
            {
                // Prompt user role title
                name: "roleTitle",
                type: "input",
                message: "Role title: "
            },
            {
                // Prompt user for salary
                name: "salary",
                type: "number",
                message: "Salary: "
            },
            {   
                // Prompt user to select department role is under
                name: "dept",
                type: "list",
                message: "Department: ",
                choices: departmentArr
            }]).then((answer) => {
                // Set department ID variable
                let deptID;
                // get id of department selected
                for (i=0; i < departments.length; i++){
                    if (answer.dept == departments[i].name){
                        deptID = departments[i].id;
                    }
                }
                // Added role to role table
                connection.query(`INSERT INTO role (title, salary, department_id)
                VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                    if(err) return err;
                    console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);
                    afterConnection();
                });
            });
    });
    
}


// Add Department
function addDepartment(){
  inquirer.prompt({
          // Prompt user for name of department
          name: "deptName",
          type: "input",
          message: "Department Name: "
      }).then((answer) => {
              
          // add department to the table
          connection.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (err, res) => {
              if(err) return err;
              console.log("\n DEPARTMENT ADDED...\n ");
              afterConnection();
          });
      });
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
              // get ID of role selected
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



function deleteEmployee(){
  // Create global employee array
  let employeeArr = [];
  // Create connection using promise-sql
  promisemysql.createConnection(connectionProperties
  ).then((conn) => {
      // Query all employees
      return  conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS employee FROM employee ORDER BY Employee ASC");
  }).then((employees) => {
      // Place all employees in array
      for (i=0; i < employees.length; i++){
          employeeArr.push(employees[i].employee);
      }
      inquirer.prompt([
          {
              // prompt user of all employees
              name: "employee",
              type: "list",
              message: "Who would you like to delete?",
              choices: employeeArr
          }, {
              // confirm delete of employee
              name: "yesNo",
              type: "list",
              message: "Confirm deletion",
              choices: ["NO", "YES"]
          }]).then((answer) => {
              if(answer.yesNo == "YES"){
                  let employeeID;
                  // if confirmed, get ID of employee selected
                  for (i=0; i < employees.length; i++){
                      if (answer.employee == employees[i].employee){
                          employeeID = employees[i].id;
                      }
                  }
                  
                  // deleted selected employee
                  connection.query(`DELETE FROM employee WHERE id=${employeeID};`, (err, res) => {
                      if(err) return err;
                      // confirm deleted employee
                      console.log(`\n EMPLOYEE '${answer.employee}' DELETED...\n `);
                      
                      // back to main menu
                      afterConnection();
                  });
              } 
              else {
                  
                  // if not confirmed, go back to main menu
                  console.log(`\n EMPLOYEE '${answer.employee}' NOT DELETED...\n `);
                  // back to main menu
                  afterConnection();
              }
              
          });
  });
};