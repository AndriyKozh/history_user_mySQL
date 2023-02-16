const mysql2 = require("mysql2");
const arrHystory = require("./arr");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const { HOST, USER, DATABASE, PASSWORD } = process.env;

// конфігурація текмта

const conection = mysql2.createConnection({
  host: HOST,
  user: "root",
  database: DATABASE,
  password: PASSWORD,
});

conection.connect(function (err) {
  if (err) {
    return console.error("помилка" + err.message);
  } else {
    console.log("підключення успішне");
  }
});

conection.execute("SELECT * FROM `test_two`", function (err, results) {
  console.log(err);
  console.table(results);
});

// ================ ADD LINE INFO_HISTORY ==================

// const history = [];

// function resultArr(arrHistory) {
//   for (let i = 0; i < arrHistory.length; i++) {
//     const arrIndx = arrHistory[i];

//     // console.log(title);
//     const titleUrl = arrIndx.titleUrl;
//     const time = arrIndx.time;

//     const nullItem = uuidv4();

//     if (titleUrl) {
//       const id = titleUrl?.slice(32, 47);
//       history.push([id, titleUrl, time]);
//     } else {
//       history.push([nullItem, null, null]);
//     }
//   }

//   for (let i = 0; i < history.length; i++) {
//     const a = history[i];
//     console.log(a);

//     const sql = "INSERT INTO test_two VALUE (?,?,?)";

//     conection.execute(sql, a, function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("УСПІШНО ДОБАВЛЕНО");
//       }
//     });
//   }
// }

// const resultAdd = resultArr(arrHystory);

// console.log(resultAdd);
