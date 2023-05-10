// create prompts
const inquirer = require('inquirer');

// database models
const addEmployee = require('./addEmployee');
const viewEmployees = require('./viewEmployees');
const updateEmployee = require('./updateEmployee');
const addNewRole = require('./addNewRole');
const viewRoles = require('./viewRoles');
const newDepartment = require('./newDepartment');
const viewDepartments = require('./viewDepartments');

// end service
const db = require('../config/connection');

async function promptUser() {
    answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'actions',
            message: 'Please choose option to execute:',
            choices: [
                'Add Employee',
                'View All Employees',
                'Add Role',
                'Update Employee Role',
                'View All Roles',
                'Add Department',
                'View All Departments',
                'Quit'],
        },
    ])
    // exit the application
    let shouldExit = false;

    let result;
    switch (answers.actions) {

        case 'Add Employee':
            result = await addEmployee();
            break;

        case 'View All Employees':
            result = await viewEmployees();
            break;

        case 'Add Role':
            result = await addNewRole();
            break;

        case 'Update Employee Role':
            result = await updateEmployee();
            break;

        case 'View All Roles':
            result = await viewRoles();
            break;

        case 'Add Department':
            result = await newDepartment();
            break;

        case 'View All Departments':
            result = await viewDepartments();
            break;

        case 'Quit':
            console.log(`\x1b[33mGoodbye!\x1b[0m`);
            shouldExit = true;
            break;

        default:
            console.log('You must pick an option.');
    }

    if (shouldExit) {
        // close connection to database
        await db.end();
        // close application
        await process.exit(0);
    } else {
        // used to call promptUser function
        promptUser();
    }
}

module.exports = promptUser;