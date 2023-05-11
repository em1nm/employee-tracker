const cTable = require('console.table');
const db = require('../config/connection');

async function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(rows);
        return;
    });
}

module.exports = viewDepartments;