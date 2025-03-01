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
// View all roles
export function viewAllRoles(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query("SELECT * FROM roles");
        console.table(res.rows);
    });
}
// Add a new role
export function addRole(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer.prompt([
            { type: "input", name: "title", message: "Enter role title:" },
            { type: "input", name: "salary", message: "Enter salary:" },
            { type: "input", name: "department_id", message: "Enter department ID:" },
        ]);
        yield pool.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [answers.title, answers.salary, answers.department_id]);
        console.log("Role added successfully!");
    });
}
