import { Pool } from "pg";
import inquirer from "inquirer";

// viewing all the employees
export async function viewAllEmployees(pool: Pool): Promise<void> {
  const res = await pool.query("SELECT * FROM employees");
  console.table(res.rows);
}

// adding the employees
export async function addEmployee(pool: Pool): Promise<void> {
  const answers = await inquirer.prompt([
    { type: "input", name: "first_name", message: "Enter first name:" },
    { type: "input", name: "last_name", message: "Enter last name:" },
    { type: "input", name: "role_id", message: "Enter role ID:" },
    { type: "input", name: "salary", message: "Enter salary:" },
    { type: "input", name: "department", message: "Enter department:" },
    { type: "input", name: "manager_id", message: "Enter manager (if any):" },
  ]);

  await pool.query(
    "INSERT INTO employees (first_name, last_name, role_id, salary, department, manager_id) VALUES ($1, $2, $3, $4)",
    [
      answers.first_name,
      answers.last_name,
      answers.role_id,
      answers.salary,
      answers.department,
      answers.manager_id || null,
    ]
  );
  console.log("Employee added!");
}
export async function updateEmployeeRole(pool: Pool): Promise<void> {
  const employeesRes = await pool.query(
    "SELECT id, first_name, last_name FROM employees"
  );
  const employees = employeesRes.rows.map(
    (employee: { id: number; first_name: string; last_name: string }) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    })
  );

  const { selectedEmployeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedEmployeeId",
      message: "Select an employee to update role:",
      choices: employees,
    },
  ]);

  const rolesRes = await pool.query("SELECT id, title FROM roles");
  const roles = rolesRes.rows.map((role: { id: number; title: string }) => ({
    name: role.title,
    value: role.id,
  }));

  const { selectedRoleId } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedRoleId",
      message: "Select a new role for the employee:",
      choices: roles,
    },
  ]);
  await pool.query("UPDATE employees SET role_id = $1 WHERE id = $2", [
    selectedRoleId,
    selectedEmployeeId,
  ]);

  console.log("Employee role updated successfully!");
}
