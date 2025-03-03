import { Pool } from "pg";
import inquirer from "inquirer";

// View all roles
export async function viewAllRoles(pool: Pool): Promise<void> {
  const res = await pool.query("SELECT * FROM roles");
  console.table(res.rows);
}

// Add a new role
export async function addRole(pool: Pool): Promise<void> {
  const answers = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter role title:" },
    { type: "input", name: "salary", message: "Enter salary:" },
    { type: "input", name: "department_id", message: "Enter department ID:" },
  ]);

  await pool.query(
    "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
    [answers.title, answers.salary, answers.department_id]
  );

  console.log("Role added successfully!");
}
