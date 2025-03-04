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
// Viewing all the employees
export function viewAllEmployees(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query("SELECT * FROM employees");
        console.table(res.rows);
    });
}
// Adding the employees with error handling for invalid role_id
export function addEmployee(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        let success = false;
        while (!success) {
            try {
                const answers = yield inquirer.prompt([
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
                const roleRes = yield pool.query("SELECT id FROM roles WHERE id = $1", [
                    answers.role_id,
                ]);
                if (roleRes.rows.length === 0) {
                    throw new Error("Invalid role ID. Please enter a valid role ID.");
                }
                // Insert the new employee
                yield pool.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [
                    answers.first_name,
                    answers.last_name,
                    answers.role_id,
                    answers.manager_id || null, // Allow NULL for manager_id
                ]);
                console.log("Employee added!");
                success = true; // Break the loop if no error occurs
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error adding employee:", error.message);
                }
                else {
                    console.error("An unknown error occurred.");
                }
                // Ask the user if they want to retry
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
                    success = true; // Exit the loop if the user cancels
                }
            }
        }
    });
}
// Updating employee role
export function updateEmployeeRole(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeesRes = yield pool.query("SELECT id, first_name, last_name FROM employees");
        const employees = employeesRes.rows.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        const { selectedEmployeeId } = yield inquirer.prompt([
            {
                type: "list",
                name: "selectedEmployeeId",
                message: "Select an employee to update role:",
                choices: employees,
            },
        ]);
        const rolesRes = yield pool.query("SELECT id, title FROM roles");
        const roles = rolesRes.rows.map((role) => ({
            name: role.title,
            value: role.id,
        }));
        const { selectedRoleId } = yield inquirer.prompt([
            {
                type: "list",
                name: "selectedRoleId",
                message: "Select a new role for the employee:",
                choices: roles,
            },
        ]);
        yield pool.query("UPDATE employees SET role_id = $1 WHERE id = $2", [
            selectedRoleId,
            selectedEmployeeId,
        ]);
        console.log("Employee role updated successfully!");
    });
}
