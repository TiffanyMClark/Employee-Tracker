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
// viewing all the employees
export function viewAllEmployees(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query("SELECT * FROM employees");
        console.table(res.rows);
    });
}
// adding the employees
export function addEmployee(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer.prompt([
            { type: "input", name: "first_name", message: "Enter first name:" },
            { type: "input", name: "last_name", message: "Enter last name:" },
            { type: "input", name: "role_id", message: "Enter role ID:" },
            { type: "input", name: "salary", message: "Enter salary:" },
            { type: "input", name: "department", message: "Enter department:" },
            { type: "input", name: "manager_id", message: "Enter manager (if any):" },
        ]);
        yield pool.query("INSERT INTO employees (first_name, last_name, role_id, salary, department, manager_id) VALUES ($1, $2, $3, $4)", [
            answers.first_name,
            answers.last_name,
            answers.role_id,
            answers.salary,
            answers.department,
            answers.manager_id || null,
        ]);
        console.log("Employee added!");
    });
}
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
