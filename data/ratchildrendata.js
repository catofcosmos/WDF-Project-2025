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

function initTableratchildren(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS ratchildrendata (
      pid INTEGER,
      cid INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      age TEXT NOT NULL,
      FOREIGN KEY (pid) REFERENCES ratparentsdata(pid)
    )`,
    (error) => {
      if (error) {
        console.log("Error creating ratchildrendata table:", error);
      } else {
        console.log("---> ratchildrendata table created!");

        // Clear existing data to avoid duplicates
        db.run("DELETE FROM ratchildrendata", () => {
          // Insert all sample data
          ratchildrendata.forEach((child) => {
            db.run(
              `INSERT INTO ratchildrendata (pid, cid, name, age)
              VALUES (?, ?, ?, ?)`,
              [child.pid, child.cid, child.name, child.age],
              (err) => {
                if (err) {
                  console.log("Insert error (ratchildrendata):", err);
                }
              }
            );
          });
          console.log("---> ratchildren data inserted.");
        });
      }
    }
  );
}

module.exports = { initTableratchildren };
