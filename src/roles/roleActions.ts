import { Pool } from "pg";
import inquirer from "inquirer";

// View all roles with error handling
export async function viewAllRoles(pool: Pool): Promise<void> {
  try {
    const res = await pool.query("SELECT * FROM roles");
    console.table(res.rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching roles:", error.message);
    } else {
      console.error("An unknown error occurred while fetching roles.");
    }
  }
}

// Add a new role with error handling and retry option
export async function addRole(pool: Pool): Promise<void> {
  let success = false;

  while (!success) {
    try {
      const answers = await inquirer.prompt([
        { type: "input", name: "title", message: "Enter role title:" },
        { type: "input", name: "salary", message: "Enter salary:" },
        {
          type: "input",
          name: "department_id",
          message: "Enter department ID:",
        },
      ]);

      // Insert new role into the database
      await pool.query(
        "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
        [answers.title, answers.salary, answers.department_id]
      );

      console.log("Role added successfully!");
      success = true; // Set success to true to break the loop
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding role:", error.message);
      } else {
        console.error("An unknown error occurred while adding the role.");
      }

      // Ask the user if they want to retry or cancel
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
        success = true; // Exit the loop if the user decides not to retry
      }
    }
  }
}
