//Global definitions//
const adminName = "RatAdmin";
//const adminPassword = "Rat123";
const adminPassword =
  "$2b$12$Cis13IvUy2f9SBsF9MfoouLq2qbswu6RPEncl.NUr2HkEkeNI1SAK";

/*packages*/

const bcrypt = require("bcrypt");

const saltRounds = 12; // Number of rounds for bcrypt hashing

//bcrypt.hash(adminPassword, saltRounds, (err, hash) => {
// if (err) {
//   console.error("Error encrypting password:", err);
// } else {
//   console.log("Hashed password (GENERATE ONLY ONCE):", hash);
// You can store this hash in your database or use it as needed
// }
//});

const express = require("express");
const session = require("express-session"); // sessions in expr.
const connectSqlite3 = require("connect-sqlite3"); // session store for sqlite3
const SQLiteStore = connectSqlite3(session);
const sqlite3 = require("sqlite3").verbose(); // Using verbose() for better error messages
const port = 8080;
const app = express();

// Middleware for session management, moved up from further down with help of chatgpt, 2025.6.12
app.use(
  session({
    //define the session
    store: new SQLiteStore({ db: "session-db.db" }),
    saveUninitialized: false,
    resave: false,
    secret: "This#Is8a@Rat#Secret",
  })
);
app.use(function (req, res, next) {
  console.log("session passed to response locals....");
  res.locals.session = req.session;
  next();
});

/*Login*/
app.use(express.urlencoded({ extended: true }));
//const fs = require("fs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

// Login POST handler
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const model = { error: "Username and password are required.", message: "" };
    return res.status(400).render("login.handlebars", model);
  }
  if (username == adminName) {
    console.log("the user is a rat admin");
    // if (password == adminPassword) {
    // console.log("The password matches RatAdmin");
    //model//
    // const model = { error: "", message: "You are the Rat admin, welcome!" };

    // res.render("login.handlebars", model);
    //} else {
    // const model = { error: "Incorrect password for RatAdmin.", message: "" };
    // res.status(400).render("login.handlebars", model);
    // }
    bcrypt.compare(password, adminPassword, (err, result) => {
      if (err) {
        //build a model
        const model = {
          error: "Error while comparing passwords: " + err,
          message: "",
        };
        return res.status(500).render("login.handlebars", model);
      }
      if (result) {
        console.log("the password matches RatAdmin");
        req.session.isAdmin = true;
        req.session.isLoggedIn = true;
        req.session.name = username;
        console.log("Session information:" + JSON.stringify(req.session));
        // Set session variable to indicate admin status
        //do not go to login but /.
        res.redirect("/");
        //const model = { error: "", message: "You are the Rat admin, welcome!" };
        //return res.render("login.handlebars", model);
      } else {
        const model = {
          error: "Incorrect password for RatAdmin.",
          message: "",
        };
        return res.status(400).render("login.handlebars", model);
      }
    });
  } else {
    const model = {
      error: `Incorrect username, ${username} is not correct.`,
      message: "",
    };

    res.render("login.handlebars", model);
  }
});

// DATABASE
const dbFile = "my-project-data.sqlite3.db";
console.log("Using database at:", require("path").resolve(dbFile));
const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Initialize tables after db connection is established
const { initTableratparents } = require(__dirname + "/data/ratparentsdata");
const { initTableratchildren } = require(__dirname + "/data/ratchildrendata");

initTableratparents(db);
initTableratchildren(db);

// HANDLEBARS
const { engine } = require("express-handlebars");
const { error } = require("console");

app.engine(
  "handlebars",
  engine({
    helpers: {
      eq(a, b) {
        return a == b;
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// ROUTES

app.get("/", function (req, res) {
  // res.render("home");
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  console.log("--->Home model: " + JSON.stringify(model));
  res.render("home.handlebars", model);
});

app.get("/home", function (req, res) {
  res.render("home");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

/*Login*/
app.get("/login", function (req, res) {
  res.render("login.handlebars");
});

/*logout*/
app.get("/logout", function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session", err);
    } else {
      console.log("logged out");
      res.redirect("/");
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

//rat parents content
app.get("/ratparents", function (req, res) {
  db.all("SELECT * FROM ratparentsdata", (err, ratparentsdata) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).send("Database error");
    }
    console.log("rat parents from DB:", ratparentsdata);
    res.render("ratparents", {
      listOfParents: ratparentsdata, // Make sure this matches your template
    });
  });
});



//rat children content 
app.get('/ratchildren', function (req, res) {
  db.all("SELECT * FROM ratchildrendata", (err, ratchildrendata) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).send("Database error");
    }
    res.render("ratchildren", {
      listOfChildren: ratchildrendata, // Make sure this matches your template
    });
  });
});


//add new child / enlist new child
app.get('/ratchild/new', function (req,res) {
  res.render('new-ratchild');
})

//Modify existing child info
app.get('/ratchild/modify/:cid', function (req, res) {
  const id = req.params.cid;
  db.get("SELECT * FROM ratchildrendata WHERE cid=?", [id], (error, theChild) => {
    if (error) {
      console.log("ERROR: ", error);
      res.redirect('/ratchildren');
    } else {
      const model = { child: theChild };
      res.render('new-ratchild.handlebars', model);
    }
  });
});

app.post('/ratchild/modify/:cid', function (req, res) {
  const cid = req.params.cid;
  const name = req.body.childname;
  const year = req.body.childyear;
  const desc = req.body.childdesc;
  const type = req.body.actiontype;
  const url = req.body.URLfile || null;

  db.run(
    "UPDATE ratchildren SET name = ?, age = ?, description = ?, action = ?, cimgURL = ? WHERE cid = ?",
    [name, year, desc, type, url, cid],
    function (error) {
      if (error) {
        console.log("ERROR: ", error);
        res.redirect('/ratchildren');
      } else {
        console.log("Child successfully modified!");
        res.redirect('/ratchildren');
      }
    }
  );
});




app.get('/ratchild/:cid', function (req,res){
    console.log("ratchildren route parameter cid: "+JSON.stringify(req.params.cid))

    db.get("SELECT * FROM ratchildrendata WHERE cid=?", [req.params.cid],(error, ratchildrendata) => {
        if (error) {
            console.log("ERROR: ", error);
            return res.status(500).send("database error");


        } else {
            const model={
                child: ratchildrendata
            }
            res.render('ratchild.handlebars', model);
        }
    });
});

app.post('/ratchild/new', function (req,res) {
  const name = req.body.childname;
  const year = req.body.childyear;
  const desc = req.body.childdesc;
  const type = req.body.actiontype;
  const url = req.body.URLfile || null;

console.log("Trying to insert:", name, year, desc, type, url);

  db.run("INSERT INTO ratchildrendata (name, age, description, action, cimgURL) VALUES (?, ?, ?, ?, ?)", 
    [name, year, desc, type, url], (error) => {
      if (error) {
        console.log("ERROR: ", error)
        res.redirect('/ratchildren')

      } else {
          console.log("child added to the list!")
          res.redirect("/ratchildren")
      }
    }
  )
})

//delete rat children :C 
app.get('/ratchild/delete/:cid', function (req,res){
  console.log("rat child route parameter childid:"+JSON.stringify(req.params.cid));
  //delete in the table choosen ratchild with matching ID
  db.run("DELETE FROM ratchildrendata WHERE cid=?", [req.params.cid], (error, child) => {
    if (error) {
      console.log("ERROR: ", error); //error display terminal

    } else {
      console.log("the child" +req.params.cid+ "has been deleted.");
      //redirect to ratchildren route
      res.redirect("/ratchildren");
    }
  })
})



app.listen(port, function () {
  console.log(`Server up and running, listening to port ${port}`);
});



/*
app.get('/project/modify/:projid', function (req.res) {
  const id = req.params.projid 
  db.get("SELECT * FROM projects WHERE pid=?", [id], (error, theProject) => {
    if (error) {
      console.log("ERROR: ", error)
      res.redirect('/projects')
    }else {
      model = { project: theProject}
      res.render('project-new.handlebars', model)
    }

  })
})*/