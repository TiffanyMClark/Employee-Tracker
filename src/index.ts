import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();
import MainMenu from "./db/mainMenu.js";
const mainMenu = new MainMenu();
mainMenu.start();
