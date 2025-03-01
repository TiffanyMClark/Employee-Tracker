import { Pool } from "pg";
import inquirer from "inquirer";

// view all departments..

export async function viewAllDepartments(pool: Pool): Promise<void> {
  const res = await pool.query("SELECT * FROM departments");
  console.table(res.rows);
}
// adding departments
export async function addDepartment(pool: Pool): Promise<void> {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter department name:" },
  ]);
  await pool.query("INSERT INTO departments (name) VALUES ($1)", [
    answers.name,
  ]);

  console.log("Department added successfully!");
}
