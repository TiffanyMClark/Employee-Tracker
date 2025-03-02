import inquirer from "inquirer";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
import {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
} from "../employee/employeeActions.js";
import { viewAllRoles, addRole } from "../roles/roleActions.js";
import {
  viewAllDepartments,
  addDepartment,
} from "../departments/department.js";

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

// Main menu class
class MainMenu {
  exit: boolean = false;

  async start(): Promise<void> {
    while (!this.exit) {
      const { menuOption } = await inquirer.prompt([
        {
          type: "list",
          name: "menuOption",
          message: "Main Menu - Select an option:",
          choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
          ],
        },
      ]);

      switch (menuOption) {
        case "View All Employees":
          await viewAllEmployees(pool);
          break;
        case "Add Employee":
          await addEmployee(pool);
          break;
        case "Update Employee Role":
          await updateEmployeeRole(pool);
          break;
        case "View All Roles":
          await viewAllRoles(pool);
          break;
        case "Add Role":
          await addRole(pool);
          break;
        case "View All Departments":
          await viewAllDepartments(pool);
          break;
        case "Add Department":
          await addDepartment(pool);
          break;
        case "Quit":
          this.exit = true;
          await pool.end();
          console.log("Goodbye!");
          break;
      }
    }
  }
}

export default MainMenu;
