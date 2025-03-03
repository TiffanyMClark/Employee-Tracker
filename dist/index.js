import dotenv from "dotenv";
dotenv.config();
import MainMenu from "./db/mainMenu.js";
const mainMenu = new MainMenu();
mainMenu.start();
