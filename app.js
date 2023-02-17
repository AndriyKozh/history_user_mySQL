const mysql2 = require("mysql2");

require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const arrHystory = require("./arr");
const { HOST, USER, DATABASE, PASSWORD } = process.env;

const conection = mysql2.createConnection({
  host: HOST,
  user: "root",
  database: DATABASE,
  password: PASSWORD,
});

//===================== table connection ============  watch_history - table =========

conection.connect(function (err) {
  if (err) {
    return console.error("помилка" + err.message);
  } else {
    console.log("підключення успішне");
  }
});

conection.execute("SELECT * FROM `watch_history`", function (err, results) {
  console.log(err);
  console.table(results);
});

// ================ ADD LINE INFO_HISTORY ==================

const history = [];

function resultArr(arrHistory) {
  for (let i = 0; i < arrHistory.length; i++) {
    const arrIndx = arrHistory[i];

    const titleUrl = arrIndx.titleUrl;

    let time = arrIndx.time.split("");
    const timeOne = time.splice(10, 1, " ");
    const timeTwo = time.join("");
    const dateWathVideo = timeTwo.slice(0, 18);

    const titles = arrIndx.title;
    const titleVideo = titles.slice(18);

    if (titleUrl) {
      const id = titleUrl?.slice(32, 47);
      history.push([id, titleVideo, titleUrl, dateWathVideo, i]);
    } else {
      continue;
    }
  }
  for (let i = 0; i < history.length; i++) {
    const a = history[i];
    console.log(a);

    const sql = "INSERT INTO watch_history VALUE (?,?,?,?,?)"; // watch_history - table

    conection.execute(sql, a, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("УСПІШНО ДОБАВЛЕНО");
      }
    });
  }
}

resultArr(arrHystory);
