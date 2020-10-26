const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "abcd1234",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees?",
                "Add Employee?",
                "Update Employee Roles?"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View all employees?":
                    employeeView();
                    break;

                case "Add Employee?":
                    employeeAdd();
                    break;

                case "Update Employee Roles?":
                    employeeUpdate();
                    break;
            }
        });
};

function employeeView() {
    console.log("hello");

}

function employeeAdd() {
    console.log("hey");

}

function employeeUpdate() {
    console.log("hi");

}