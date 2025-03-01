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
// view all departments..
export function viewAllDepartments(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query("SELECT * FROM departments");
        console.table(res.rows);
    });
}
// adding departments
export function addDepartment(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer.prompt([
            { type: "input", name: "name", message: "Enter department name:" },
        ]);
        yield pool.query("INSERT INTO departments (name) VALUES ($1)", [
            answers.name,
        ]);
        console.log("Department added successfully!");
    });
}
