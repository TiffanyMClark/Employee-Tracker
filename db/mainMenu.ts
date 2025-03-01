import inquirer from "inquirer";
import { Pool } from "pg";
import {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
} from "../Employee-Tracker/employeeActions.js";
import { viewAllRoles, addRole } from "./roleActions.js";
import { viewAllDepartments, addDepartment } from "./departmentActions.js";

// Database connection
const pool = new Pool({
  user: "your_db_user",
  host: "your_db_host",
  database: "your_db_name",
  password: "your_db_password",
  port: 3003,
});

// making the main menu for the command line
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
