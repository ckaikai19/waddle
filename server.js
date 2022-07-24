const inquirer = require('inquirer');
const db_connection = require('./db/connection');
require('console.table');

db_connection.connect(() => {
    console.log(`Welcome Employee Manager\n`)
    firstPrompt();
});


function firstPrompt() {
    inquirer
        .prompt({
            type: "list",
            name: "task",
            message: "Would you like to do?",
            choices: [
                "View Employees",
                "View Employees by Department",
                "Add Employee",
                "Remove Employees",
                "Update Employee Role",
                "Add Role",
                "End"]
        })
        .then(function ({ task }) {
            switch (task) {
                case "View Employees":
                    viewEmployee();
                    break;

                case "View Employees by Department":
                    viewEmployeeByDepartment();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employees":
                    removeEmployees();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "End":
                    connection.end();
                    break;
            }
        });
}

function viewEmployee() {

    console.log("Viewing employees\n");
    db_connection.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!\n");

    });
  
}
