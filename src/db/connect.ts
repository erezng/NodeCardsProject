import mongoose from "mongoose";
import dbConfig from "./config/db.config.js";
import { Role } from "./models/role.js";

const { HOST, DB, PORT, ROLES } = dbConfig;

const connect = async () => {
  //mongoose 7 update:
  mongoose.set("strictQuery", false);
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
  console.log(`Succesfully connected to the database ${DB}`);
};

const initDB = () => {
  //create the User/Admin/Mod roles
  //if Role collection is Empty:
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.map((s) => new Role({ name: s })).forEach((role) => {
        role.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added ", role.name, "to Roles collection");
          }
        });
      });
    }
  });
};
export { connect };
