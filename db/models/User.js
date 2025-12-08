import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

import { emailRegExp } from "../constants/authConstants.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: emailRegExp,
      },
    },
    unique: {
      args: true,
      msg: "Email address already exists!",
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  avatarURL: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync({ alter: true })
//   .then(() => {
//     console.log("User table synced");
//   })
//   .catch((err) => {
//     console.error("User sync error:", err);
//   });

export default User;
