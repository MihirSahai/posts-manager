var mysql = require("mysql2/promise");

var dbConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "post_manager",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// dbConnection.on('error',err=>{
//     console.error(err);
//     throw err;
// })

// dbConnection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
//   });
// });

module.exports=dbConnection;