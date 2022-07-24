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
                "View All Departments",
                "View All Roles",
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

                case "View All Departments":
                    viewAllDepartment();
                    break;

                case "View All Roles":
                    viewAllRoles();
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
    firstPrompt()
    });

  
}

function viewAllDepartment(){
    console.log("Viewing Departments\n");
    db_connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Departments viewed!\n");
    firstPrompt()
    });
}

function viewAllRoles(){
    console.log("Viewing Roles\n");
    db_connection.query('SELECT * FROM Role', function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Roles viewed!\n");
    firstPrompt()
    });
}