import sequelize from "./sequelise.js";

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");
  } catch (error) {
    console.error(`Unable to connect to the database:", ${error.message}`);
  }
};

export default connectDatabase;
