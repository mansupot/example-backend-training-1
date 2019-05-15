const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  // host: "localhost",
  host: "",
  user: "",
  password: "",
  database: ""
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Database is connected !");
  }
});

app.listen(port, function() {
  console.log("Sever is running port : " + port);
});
// =======================================================
app.get("/", function(req, res) {
  res.send({
    message: "Hello Web Service",
    Writing: "Supot Patsaithong"
  });
});

app.post("/post/number", function(req, res) {
  let firstNumber = parseInt(req.body.firstNumber);
  let secondNumber = parseInt(req.body.secondNumber);
  let _result = firstNumber + secondNumber;
  res.send({ result: _result });
});

app.post("/post/calculate", function(req, res) {
  let firstNumber = parseInt(req.body.firstNumber);
  let secondNumber = parseInt(req.body.secondNumber);
  let operator = req.body.operator;
  let _result = null;
  if (operator === "add") {
    _result = firstNumber + secondNumber;
  } else if (operator === "subtract") {
    _result = firstNumber - secondNumber;
  } else if (operator === "multiply") {
    _result = firstNumber * secondNumber;
  } else if (operator === "divide") {
    _result = firstNumber / secondNumber;
  } else {
    _result = "Please input operator 'add , subtract , multiply , divide'";
  }
  res.send({ result: _result });
});

app.post("/post/add/department", (req, res) => {
  let department_name = req.body.department_name;
  let department_tel = req.body.department_tel;
  let command = "INSERT INTO tbl_department SET ?";
  connection.query(
    command,
    {
      department_name: department_name,
      department_tel: department_tel
    },
    function(error, results) {
      if (error) throw error;
      res.send({ message: "insert success" });
    }
  );
});

app.get("/get/show/department", (req, res) => {
  connection.query(
    "SELECT * FROM tbl_department ORDER BY department_id DESC",
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.post("/post/update/department", function(req, res) {
  let department_name = req.body.department_name;
  let department_tel = req.body.department_tel;
  let department_id = req.body.department_id;
  let command =
    "UPDATE tbl_department SET department_name = ? , department_tel = ? WHERE department_id = ?";
  connection.query(
    command,
    [department_name, department_tel, department_id],
    function(error, results) {
      if (error) throw error;
      res.send({ message: "Update success" });
    }
  );
});

app.get("/post/delete/department/:department_id", function(req, res) {
  let department_id = req.params.department_id;
  let command = "DELETE FROM tbl_department WHERE department_id = ?";
  connection.query(command, [department_id], function(error, results) {
    if (error) throw error;
    res.send({ message: "delete success" });
  });
});

app.get("/get/department", function(req, res) {
  let command = "SELECT * FROM tbl_department";
  connection.query(command, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/get/student", (req, res) => {
  let command =
    "SELECT * FROM tbl_student LEFT JOIN tbl_department ON tbl_student.department_id = tbl_department.department_id";
  connection.query(command, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/post/student/add", (req, res) => {
  let student_title = req.body.student_title;
  let student_name = req.body.student_name;
  let edu_level = req.body.edu_level;
  let student_year = req.body.student_year;
  let department_id = req.body.department_id;
  let command = "INSERT INTO tbl_student SET ?";
  connection.query(
    command,
    {
      student_title: student_title,
      student_name: student_name,
      edu_level: edu_level,
      student_year: student_year,
      department_id: department_id
    },
    (error, results) => {
      if (error) throw error;
      res.send({ message: "Insert Success" });
    }
  );
});

app.post("/post/student/edit", (req, res) => {
  let student_title = req.body.student_title;
  let student_name = req.body.student_name;
  let edu_level = req.body.edu_level;
  let student_year = req.body.student_year;
  let department_id = req.body.department_id;
  let student_id = req.body.student_id;
  let command =
    "UPDATE tbl_student SET student_title =? ,student_name = ? , edu_level = ? , student_year = ? , department_id = ? WHERE student_id = ?";
  connection.query(
    command,
    [
      student_title,
      student_name,
      edu_level,
      student_year,
      department_id,
      student_id
    ],
    (error, results) => {
      if (error) throw error;
      res.send({ message: "Update Success" });
    }
  );
});

app.post("/post/student/delete", (req, res) => {
  let student_id = req.body.student_id;
  let command = "DELETE FROM tbl_student WHERE student_id = ?";
  connection.query(command, [student_id], (error, results) => {
    if (error) throw error;
    res.send({ message: "Delete Success" });
  });
});
