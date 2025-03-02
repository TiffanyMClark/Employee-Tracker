var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import MainMenu from "../db/mainMenu";
function startCLI() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.blue.bold("===================================="));
        console.log(chalk.green.bold("   Welcome to the Employee Manager   "));
        console.log(chalk.blue.bold("===================================="));
        const mainMenu = new MainMenu();
        yield mainMenu.start();
    });
}
startCLI();
