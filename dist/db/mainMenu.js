var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();
import { viewAllEmployees, addEmployee, updateEmployeeRole, } from "../employee/employeeActions.js";
import { viewAllRoles, addRole } from "../roles/roleActions.js";
import { viewAllDepartments, addDepartment, } from "../departments/department.js";
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
    constructor() {
        this.exit = false;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Display the chalk title here
            console.log(chalk.blue.bold("===================================="));
            console.log(chalk.green.bold("   Welcome to the Employee Manager   "));
            console.log(chalk.blue.bold("===================================="));
            while (!this.exit) {
                const { menuOption } = yield inquirer.prompt([
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
                        yield viewAllEmployees(pool);
                        break;
                    case "Add Employee":
                        yield addEmployee(pool);
                        break;
                    case "Update Employee Role":
                        yield updateEmployeeRole(pool);
                        break;
                    case "View All Roles":
                        yield viewAllRoles(pool);
                        break;
                    case "Add Role":
                        yield addRole(pool);
                        break;
                    case "View All Departments":
                        yield viewAllDepartments(pool);
                        break;
                    case "Add Department":
                        yield addDepartment(pool);
                        break;
                    case "Quit":
                        this.exit = true;
                        yield pool.end();
                        console.log("Goodbye!");
                        break;
                }
            }
        });
    }
}
export default MainMenu;
