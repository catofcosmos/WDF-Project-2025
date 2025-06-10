const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3");

const port = 8080;

const app = express();

/*const ratparentsdata = [
  { id: 1, name: "Rathew Chedders", age: 34, email: "R-Chedders@ratlook.com" },
  { id: 2, name: "Ratticus Edamers", age: 29, email: "bitrat@ratlook.com" },
  { id: 3, name: "Rathilda Gouda", age: 45, email: "R.Gouda@ratlook.com" },
  { id: 4, name: "Rattin Brie", age: 38, email: "BrieBoy@ratlook.com" },
  { id: 5, name: "Ratoline Camamberta", age: 50, email: "Rat.Cam@ratlook.com" },
];

const ratchildrendata = [
  { id: 1, name: "Ratis Chedders", age: 5, parentid: "1" },
  { id: 2, name: "Rathon Edamers", age: 3, parentid: "2" },
  { id: 3, name: "Raters Gouda", age: 4, parentid: "3" },
  { id: 4, name: "Ratty Brie", age: 3, parentid: "4" },
  { id: 5, name: "Ratels Camamberta", age: 4, parentid: "5" },
];
*/
/*app.use(express.static(__dirname + '/public'));*/

const dbFile = "my-project-data.sqlite3.db";
const db = new sqlite3.Database(dbFile);

app.get("/", function (req, res) {
  res.render("home");
});
/*HERE*/

/*app.get("/home", function (req, res) {
  res.render("home.handlebars");
});*/

app.get("/contact", function (req, res) {
  res.render("contact.handlebars");
});

app.get("/ratparents", function (req, res) {
  res.render("ratparents.handlebars");
});

app.get("/ratchildren", function (req, res) {
  res.render("ratchildren.handlebars");
  res.send("Hello filthy Rat!");
});

app.use(express.static("public"));

app.listen(port, function () {
  console.log(`server upp and running, listening to port ${port}`);
});

/*app.use(express.static("views"));*/

app.get("/about", function (req, res) {
  res.render("about.handlebars");
});
/* source Hannah jansson & Kacper Paska, 10/6-2025 */
const { initTableratparents } = require(__dirname + "/data/ratparentsdata");
const { initTableratchildren } = require(__dirname + "/data/ratchildrendata");

//initTableAuthors(db);
//initTableMovies(db);

/*db.run(
app.get("/cv", function (req, res) {
  res.sendFile(__dirname + "/views/mycv-01.html");
});

app.use(express.static("public"));
app.use(express.static("views"));

db.run(
  `
  CREATE TABLE Person (
    pid INTEGER PRIMARY KEY,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    age INTEGER,
    email TEXT
  )
`,
  (error) => {
    if (error) {
      console.log("---> ERROR:", error);
    } else {
      console.log("---> Table created!");

      db.run(
        `
<<<<<<< HEAD
      INSERT INTO ratparentsdata (pid,name, age, email)
      VALUES 
        ('1','Rathew Chedders','34', 'R-Chedders@ratlook.com'),
        ('2', 'Ratticus Edamers', '29','bitrat@ratlook.com'),
        ('3', 'Rathilda Gouda', '45', 'R.Gouda@ratlook.com'),
        ('4', 'Rattin Brie', '38', 'BrieBoy@ratlook.com'),
        ('5', 'Ratoline Camamberta', '50','Rat.Cam@ratlook.com')`,

=======
      INSERT INTO Person (fname, lname, age, email)
      VALUES 
        ('John', 'Smith', 25, 'john.smith@example.com'),
        ('Jane', 'Doe', 30, 'jane.doe@mail.com'),
        ('Alex', 'Johnson', 40, 'alex.johnson@company.com'),
        ('Emily', 'Brown', 35, 'emily.brown@business.org'),
        ('Michael', 'Davis', 50, 'michael.davis@email.net'),
        ('Sarah', 'Miller', 28, 'sarah.miller@example.com'),
        ('David', 'Garcia', 45, 'david.garcia@mail.com'),
        ('Laura', 'Rodriguez', 32, 'laura.rodriguez@company.com'),
        ('Chris', 'Wilson', 27, 'chris.wilson@business.org'),
        ('Anna', 'Martinez', 22, 'anna.martinez@email.net'),
        ('James', 'Taylor', 53, 'james.taylor@example.com'),
        ('Patricia', 'Anderson', 44, 'patricia.anderson@mail.com'),
        ('Robert', 'Thomas', 38, 'robert.thomas@company.com'),
        ('Linda', 'Hernandez', 55, 'linda.hernandez@business.org'),
        ('William', 'Moore', 26, 'william.moore@email.net'),
        ('Barbara', 'Jackson', 37, 'barbara.jackson@example.com'),
        ('Richard', 'White', 49, 'richard.white@mail.com'),
        ('Susan', 'Lee', 24, 'susan.lee@company.com'),
        ('Joseph', 'Clark', 41, 'joseph.clark@business.org'),
        ('Jessica', 'Walker', 29, 'jessica.walker@email.net')
    `,
>>>>>>> parent of 3133b13 (continuation lab 4 project)
        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("---> Rows inserted in the table Person.");
          }
        }
      );
    }
  }
);

app.get("/rawpersons", function (req, res) {
  db.all("SELECT * FROM Person", [], (err, rawPersons) => {
    if (err) {
      console.log("Error: " + err);
    } else {
<<<<<<< HEAD
      console.log("---> Table created!");

      db.run(
        `
      INSERT INTO ratchildrendata (pid,name, age, parentid)
      VALUES 
        ('1', 'Ratis Chedders', '5', '1'),
        ('2', 'Rathon Edamers','3','2'),
        ('3','Raters Gouda','4','3'),
        ('4','Ratty Brie', '3', '4' ),
        ('5', 'Ratels Camamberta', '4', '5')
        
    `,
        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("---> Rows inserted in the table ratchildrendata.");
          }
        }
      );
=======
      console.log("Data retrieved successfully");
      res.send(rawPersons);
>>>>>>> parent of 3133b13 (continuation lab 4 project)
    }
  });
});

/*app.get("/listpersons", function (req, res) {
  db.all("SELECT * FROM Person", function (err, rawPersons) {
    if (err) {
      console.log("Error: " + err);
    } else {
      listPersonsHTML = "<ul>";
      rawPersons.forEach(function (onePerson) {
        listPersonsHTML += `<li>
            ${onePerson.fname} ${onePerson.lname}, Age: ${onePerson.age}, Email:
            ${onePerson.email}
          </li>`;
      });
      listPersonsHTML += "</ul>";
      res.send(listPersonsHTML);
    }
  });
});
/*source: Code help from classmate, Kacper Paska, 4/6-2025*/



app.get("/ratparentsdata", function (req, res) {
  db.all("SELECT * FROM ratparentsdata", (err, listOfParents) => {
    if (err) {
      console.log("Error: ", err); //error display in terminal
    } else {
      model = { ratparentsdata: listOfParents };
      res.render("ratparents.handlebars", model); //model for handlebars
    }
  });
});

const ratchildrendata = require(__dirname + "/data/ratchildrendata");

app.get("/ratchildrendata", function (req, res) {
  db.all("SELECT * FROM ratchildrendata", (err, listOfChildren) => {
    if (err) {
      console.log("Error: ", err); //error display in terminal
    } else {
      model = { ratchildrendata: listOfChildren };
      res.render("ratchildren.handlebars", model); //model for handlebars
    }
  });
});
