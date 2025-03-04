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
// View all roles with error handling
export function viewAllRoles(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield pool.query("SELECT * FROM roles");
            console.table(res.rows);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching roles:", error.message);
            }
            else {
                console.error("An unknown error occurred while fetching roles.");
            }
        }
    });
}
// Add a new role with error handling and retry option
export function addRole(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        let success = false;
        while (!success) {
            try {
                const answers = yield inquirer.prompt([
                    { type: "input", name: "title", message: "Enter role title:" },
                    { type: "input", name: "salary", message: "Enter salary:" },
                    {
                        type: "input",
                        name: "department_id",
                        message: "Enter department ID:",
                    },
                ]);
                // Insert new role into the database
                yield pool.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [answers.title, answers.salary, answers.department_id]);
                console.log("Role added successfully!");
                success = true; // Set success to true to break the loop
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error adding role:", error.message);
                }
                else {
                    console.error("An unknown error occurred while adding the role.");
                }
                // Ask the user if they want to retry or cancel
                const { retry } = yield inquirer.prompt([
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
    });
}
