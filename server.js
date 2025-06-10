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
/* load handlebars package for express */
const { engine } = require("express-handlebars");

app.engine("handlebars", engine()); // set the view engine to handlebars
app.set("view engine", "handlebars"); // set the view engine to handlebars
app.set("views", __dirname + "/views"); // set the views directory

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
  `
  CREATE TABLE ratparentsdata (
    pid INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
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
      INSERT INTO ratparentsdata (pid,name, age, email)
      VALUES 
        ('1','Rathew Chedders','34', 'R-Chedders@ratlook.com'),
        ('2', 'Ratticus Edamers', '29','bitrat@ratlook.com'),
        ('3', 'Rathilda Gouda', '45', 'R.Gouda@ratlook.com'),
        ('4', 'Rattin Brie', '38', 'BrieBoy@ratlook.com'),
        ('5', 'Ratoline Camamberta', '50','Rat.Cam@ratlook.com')`,

        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("---> Rows inserted in the table ratparentsdata.");
          }
        }
      );
    }
  }
);

// two tables, one for parents and one for children of rats of course

db.run(
  `
  CREATE TABLE ratchildrendata (
    pid INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    parentid TEXT
  )
`,
  (error) => {
    if (error) {
      console.log("---> ERROR:", error);
    } else {
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
    }
  }
);

/*source: Code help from classmate, Kacper Paska, 4/6-2025*/

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
