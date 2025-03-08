import { Pool } from "pg";
import inquirer from "inquirer";

// Viewing all the employees
export async function viewAllEmployees(pool: Pool): Promise<void> {
  const res = await pool.query("SELECT * FROM employees");
  console.table(res.rows);
}

// Adding the employees with error handling for invalid role_id
export async function addEmployee(pool: Pool): Promise<void> {
  let success = false;

  while (!success) {
    try {
      const answers = await inquirer.prompt([
        { type: "input", name: "first_name", message: "Enter first name:" },
        { type: "input", name: "last_name", message: "Enter last name:" },
        { type: "input", name: "role_id", message: "Enter role ID:" },
        {
          type: "input",
          name: "manager_id",
          message: "Enter manager ID (or leave blank if none):",
        },
      ]);

      // Check if the role_id is valid (exists in the roles table)
      const roleRes = await pool.query("SELECT id FROM roles WHERE id = $1", [
        answers.role_id,
      ]);

      if (roleRes.rows.length === 0) {
        throw new Error("Invalid role ID. Please enter a valid role ID.");
      }

      // Insert the new employee
      await pool.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
        [
          answers.first_name,
          answers.last_name,
          answers.role_id,
          answers.manager_id || null, // Allow NULL for manager_id
        ]
      );
      console.log("Employee added!");
      success = true; // Break the loop if no error occurs
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding employee:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }

      // Ask the user if they want to retry
      const { retry } = await inquirer.prompt([
        {
          type: "confirm",
          name: "retry",
          message: "Would you like to try again?",
          default: true,
        },
      ]);

      if (!retry) {
        console.log("Operation cancelled.");
        success = true; // Exit the loop if the user cancels
      }
    }
  }
}

// Updating employee role
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
