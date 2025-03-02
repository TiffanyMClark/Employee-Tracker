import chalk from "chalk";
import MainMenu from "../db/mainMenu";

async function startCLI() {
  console.log(chalk.blue.bold("===================================="));
  console.log(chalk.green.bold("   Welcome to the Employee Manager   "));
  console.log(chalk.blue.bold("===================================="));

  const mainMenu = new MainMenu();

  await mainMenu.start();
}

startCLI();
