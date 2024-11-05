const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.post("/addEmployee", (req, res) => {
  const newEmployee = req.body;

  fs.readFile("./ajax/data/object_salary.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    let employees = JSON.parse(data);
    employees.data.push(newEmployee);

    fs.writeFile(
      "./ajax/data/object_salary.txt",
      JSON.stringify(employees),
      (err) => {
        if (err) {
          return res.status(500).send("Error writing file");
        }
        res.send("Employee Added Successfully");
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
