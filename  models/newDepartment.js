const db = require('../config/connection');
const inquirer = require('inquirer');
// function to add new department to database
async function newDepartment() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'New department:',
        }
    ])
    db.query(`INSERT INTO department (name) VALUES ("${answer.addDepartment}");`, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            return `${answer.addDepartment} added`;

        }
    })
}

module.exports = newDepartment;