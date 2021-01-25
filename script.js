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
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res)

        runSearch()

    })

}


function employeeAdd() {

    connection.query("SELECT id AS 'value', title AS 'name' FROM roles", function (err, roles) {
        connection.query("SELECT id AS 'value', title AS 'name' FROM roles", function (err, managers) {
            const questions = [
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's first name?"

                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's surname?"

                },
                {
                    name: "role_id",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: roles
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "What is the employee's manager's role?",
                    choices: managers
                }
            ]

            inquirer
                .prompt(questions)
                .then(function (answers) {
                    connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function (err, res) {
                        if (err) throw err;

                        console.table(res)
                    })

                }).then(employeeView)
        });


    })


}

function employeeUpdate() {
    inquirer
        .prompt({
            name: "update",
            type: "input",
            message: "Which employee would you like to update?"
        })
        .then(function (answer) {
            console.log(answer.update)
            // connection.query("SELECT(first_name, last_name, role_id, department_id) FROM employee WHERE id=(?)", function (err, res) {
            connection.query("SELECT * FROM employee WHERE ?", {worker: answer.update}, function (err, data) {
                if (err) throw err;

                console.table(data);
            })

            // })
        })

}