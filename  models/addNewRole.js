const inquirer = require('inquirer');
const db = require('../config/connection');
// function to add a new role to the database
async function addNewRole() {
    try {
        const result = await db.promise().query('SELECT id, name FROM department;');
        const departments = result[0].map(department => {
            return {
                name: department.name,
                value: department.id
            };
        });
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'addRole',
                message: 'Role to add:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Salary of Role:',
            },
            {
                type: 'list',
                name: 'departments',
                message: 'Department of Role:',
                choices: departments
            }
        ]);
        await db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.addRole}", "${answer.salary}", "${answer.departments}");`);
        console.log(`${answer.addRole} added`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = addNewRole;