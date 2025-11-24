import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

const { DB_HOST, DB_PASSWORD, DB_NAME, DB_USER } = process.env;

const db = {};

db.db = mysql2.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

db.db.connect((err) => {
  if (err) {
    console.log("there have a problem to connect with database");
  } else {
    console.log("database connection successfull");
  }
});

export default db.db;
