const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employee_tracker_DB',
});

// connection.connect(function(err) {
//   if (err) throw err;
//   afterConnection();
// });


const afterConnection = () => {
  

  inquirer
    .prompt({
      name: 'choiceType',
      type: 'rawlist',
      message: ' would you like to do?',
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
          connection.end();

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
afterConnection();



const viewFunction = () => {
  

  inquirer
    .prompt({
      name: 'viewType',
      type: 'rawlist',
      message: ' would you like to do view?',
    choices: ['EMPLOYEE','ROLE', 'DEPARTMENT', 'EXIT'],
    })
    .then((answer) => {
      switch (answer.viewType) {
        case 'EMPLOYEE':
          viewEmployee();
          break;

        case 'ROLE':
          viewRole();
          break;

        case 'DEPARTMENT':
          viewDepartment();
          break;

        case 'EXIT':
          connection.end();

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};


    const viewEmployee = () => {
    console.log('Selecting all employee...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
  };

  const viewRole = () => {
    console.log('Selecting all role...\n');
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
  };

  const viewDepartment = () => {
    console.log('Selecting all department...\n');
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
  };


console.log('-------------------------');

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
            connction.end();
  
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
        message: "what is the employee's Manager Id. Please inter the manager id that correspondes to the manager id ie.. 8 =Tim Kevin, 10 = Musa Daniel, 11 = Helen Dobrik, or null = no Manager ",
       
       },

       {
        name: "role_id",
        type: "rowlist",
        message: "what is the employee's role Id? Inter the role Id that correspondes to the   role ie. 24 = software Engineer, 25 = Finance, 26 = Sales, 27 = Purchase, 28 = human resources, 29 = IT, 30 = Intern or enter a new Role id ",
       
       },
       
     ])

     .then(function (answer){
        connection.query("INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id:answer.manager_id || 0,
            role_id: answer.role_id,
            
          },
          function(err) {
            if(err) throw err;
            console.log("----------------------");
            console.log("New employee has been added");
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
         message: "please enter the number that corresponds to the new role's you wish to enter other than the following 1, 2, 3, 4, 5, 6. 7",
        
        
        },
 
        
      ])
 
      .then(function (answer){
         connection.query("INSERT INTO role SET ?",
           {
             title: answer.title,
             salary:answer.salary,
             department_id: answer.department_id,
             
           },
           function(err) {
             if(err) throw err;
             console.log("----------------------");
             console.log("New role has been added");
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
 
      .then(function (answer){
         connection.query("INSERT INTO department SET ?",
           {
            name: answer.name,
            
             
           },
           function(err) {
             if(err) throw err;
             console.log("----------------------");
             console.log("New department has been added");
             console.log("----------------------");
             afterConnection();
             
           }
         );
      })
     }



     const updateEmployee = () => {
      inquirer
        .prompt([
        {
         name: "first_name_employee",
         type: "input",
         message: "please chose the name of the empoyee whose role you wish to update?",
        
        },
        {
          name: "new_role_id",
          type: "input",
          message: "Please enter the number that correspondes to the new role you wish to update?",
          
        
         
         },
 
       
        
      ])
 
      .then(function(answer){
         connection.query(" UPDATE  employee SET ? WHERE ?",
           [
             {
              role_id: answer.new_role_id,
             },
             {
               first_name: answer.first_name_employee
             },
           
            
             
            ],
           function(err, res) {
             if(err) throw err;
             console.log("----------------------");
             console.log(`${res.affectedRows} employee role updated!\n`);
             console.log("New role_id has been updated");
             console.log("----------------------");
            afterConnection();
             
           }
         );
      })
     };

    
    
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