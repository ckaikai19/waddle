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
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update Employee",
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

                case "Add A Department":
                    addDepartment();
                    break;

                case "Add A Role":
                    addRole();
                    break;

                case "Add An Employee":
                    addEmployee();
                    break;

                case "Update Employee":
                    updateEmployee();
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

function addDepartment(){
    inquirer
        .prompt([
            {
                type:"input",
                name: "depatmentName",
                message: "Enter the department name"
            }
        ])
        .then((answer) => {

            db_connection.query(`INSERT INTO department (name) VALUES ("${answer.depatmentName}")`, function (err, res) {
                if (err) throw(err)
                firstPrompt();
            });
            
        })
}

function addRole(){
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "Role title?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "Role Salary"
            },
            {
                type: "input",
                name: "departmentId",
                message: "DepartmentId?"
            }
        ]).then((answer) => {
            db_connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleTitle}", ${parseInt(answer.roleSalary)}, ${parseInt(answer.departmentId)})`, function (err, res) {
                if (err) throw(err);
                firstPrompt();
            });
        }) 
}

function addEmployee(){
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "Enter first name:"
            },
            {
                type: "input",
                name: "lastname",
                message: "Enter last name:"
            },
            {
                type: "input",
                name: "roleid",
                message: "enter role id:"
            },
            {
                type: "input",
                name: "managerid",
                message: "enter manager id:"
            }
        ]).then((answer) => {
            db_connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstname}", "${answer.lastname}", ${parseInt(answer.roleid)}, ${parseInt(answer.managerid)})`, function (err, res) {
                if (err) throw(err);
                firstPrompt();
            });
        }) 
}

function updateEmployee(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "empoyeid",
            message: "Enter the employee's id:"
        },
        {
            type: "input",
            name: "fistname",
            message: "Enter a NEW first name"
        },
        {
            type: "input",
            name: "lastname",
            message: "Enter a NEW last name"
        },
        {
            type: "input",
            name: "roleid",
            message: "enter a NEW role id:"
        },
        {
            type: "input",
            name: "managerid",
            message: "enter manager id:"
        }
        

    ])
    .then((answer) => {
        db_connection.query(`UPDATE employee SET first_name = "${answer.fistname}", last_name = "${answer.lastname}", role_id = ${parseInt(answer.roleid)}, manager_id = ${parseInt(answer.managerid)} WHERE id = ${parseInt(answer.empoyeid)}`, function (err, res) {
            if (err) throw(err);
            firstPrompt();
        });
    })
}