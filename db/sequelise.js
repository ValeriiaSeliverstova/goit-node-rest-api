import { Sequelize } from "sequelize";
import { dbConfig } from "../config.js";

const sequelize = new Sequelize(dbConfig);

export default sequelize;
