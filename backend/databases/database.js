import Sqllib from "mysql";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_DATABASE, DB_PASS, DB_USER } = process.env;
const sql = Sqllib.createConnection({
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASS,
  user: DB_USER,
});

sql.query(`Select 1+1 as solution `, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Database connected at ${new Date().toLocaleString()}`);
  }
});
const mysql = (queryString = "") =>
  new Promise((resolve, reject) => {
    sql.query(queryString, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

export { mysql };
export default sql;
// import {mysql} from "./"
