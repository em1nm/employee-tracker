const cTable = require('console.table');
const db = require('../config/connection');

async function viewEmployees() {
    // Name, Salary, Department to add role to
    const query = `
SELECT 
e.id AS "ID",
e.first_name AS "First Name",
e.last_name AS "Last Name",
r.title AS "Title",
d.name AS "Department",
r.salary AS "Salary",
COALESCE(CONCAT(m.first_name, ' ', m.last_name), "None") AS "Manager"
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;`;
    db.query(query, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(rows);
        return;
    });
}

module.exports = viewEmployees;