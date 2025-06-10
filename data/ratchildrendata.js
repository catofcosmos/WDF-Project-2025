//Code provided by Hannah Janson

const ratchildrendata = [
  {
    pid: 1,
    cid: 1,
    name: "Ratis Chedders",
    age: "3",
  },
  {
    pid: 2,
    cid: 2,
    name: "Rathon Edamers",
    age: "5",
  },
  {
    pid: 3,
    cid: 3,
    name: "Raters Gouda",
    age: "4",
  },
  {
    pid: 4,
    cid: 4,
    name: "Ratty Brie",
    age: "2",
  },
  {
    pid: 5,
    cid: 5,
    name: "Ratels Camamberta",
    age: "6",
  },
];

module.exports = ratchildren;

// Adapted from Hannah Janson's code

function ratchildren(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS ratchildren (
			pid INTEGER PRIMARY KEY,
			cid INTEGER,
			name TEXT NOT NULL,
			age TEXT NOT NULL,
	
			FOREIGN KEY (cid) REFERENCES authors(cid)
		)`,
    (error) => {
      if (error) {
        console.log("Error creating ratchildren table:", error);
      } else {
        console.log("---> ratchildren table created!");

        ratchildren.forEach((ratchildren) => {
          db.run(
            `INSERT INTO ratchildren (pid, cid, name, age,)
						VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              ratchildren.cid,
              ratchildren.pid,
              ratchildren.name,
              ratchildren.age,
            ],
            (err) => {
              if (err) {
                console.log("Insert error (ratchildren):", err);
              } else {
                console.log("---> ratchildren inserted.");
              }
            }
          );
        });
      }
    }
  );
}

module.exports = { ratchildren, initTableRatchildren };
