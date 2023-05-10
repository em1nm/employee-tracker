const inquirer = require('inquirer');
const db = require('../config/connection');
//function to add an employee
async function addEmployee() {
    try {
        const roleResults = await db.promise().query('SELECT id, title FROM role;');
        const roles = roleResults[0].map(role => {
            return {
                name: role.title,
                value: role.id
            };
        });
        // select employee by id, first name, last name from employee
        const managerResults = await db.promise().query('SELECT id, first_name, last_name FROM employee;');
        const managers = managerResults[0].map(manager => {
            return {
                name: manager.first_name + " " + manager.last_name,
                value: manager.id
            };
        });
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Employee first name:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Employeelast name:',
            },
            {
                type: 'list',
                name: 'departments',
                message: 'Employee role:',
                choices: roles
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Employees manager:',
                choices: ['None', ...managers]
            },
        ]);
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES(
        "${answer.firstName}",
        "${answer.lastName}",
        "${answer.departments}",
        ${answer.manager === 'None' ? 'NULL' : answer.manager});`
        await db.promise().query(query);
        console.log(`${answer.firstName} ${answer.lastName} added`);
        return;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = addEmployee;