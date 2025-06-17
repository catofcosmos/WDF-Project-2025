const ratchildrendata = [
  {
    pid: 1,
    cid: 1,
    name: "Ratis Chedders",
    age: "3",
    cimgURL: "",
    description: "A little energetic rat child",
    action: "Enlist child",
  },
  {
    pid: 2,
    cid: 2,
    name: "Rathon Edamers",
    age: "5",
    cimgURL: "",
    description: "A little energetic rat child",
    action: "Enlist child",
  },
  {
    pid: 3,
    cid: 3,
    name: "Raters Gouda",
    age: "4",
    cimgURL: "",
    description: "A little energetic rat child",
    action: "Enlist child",
  },
  {
    pid: 4,
    cid: 4,
    name: "Ratty Brie",
    age: "2",
    cimgURL: "",
    description: "A little energetic rat child",
    action: "Enlist child",
  },
  {
    pid: 5,
    cid: 5,
    name: "Ratels Camamberta",
    age: "6",
    cimgURL: "",
    description: "A little energetic rat child",
    action: "Enlist child",
  },
];

function initTableratchildren(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS ratchildrendata (
      pid INTEGER,
      cid INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      age TEXT NOT NULL,
      description TEXT,
      action TEXT,
      cimgURL TEXT,
      FOREIGN KEY (pid) REFERENCES ratparentsdata(pid)
    )`,
    (error) => {
      if (error) {
        console.log("Error creating ratchildrendata table:", error);
      } else {
        console.log("---> ratchildrendata table created or already exists!");

        // Check if table already has data
        db.get("SELECT COUNT(*) AS count FROM ratchildrendata", (err, row) => {
          if (err) {
            console.log("Error counting ratchildrendata rows:", err);
          } else if (row.count > 0) {
            console.log(
              "---> ratchildrendata table already has data, skipping insert."
            );
          } else {
            // Insert all sample data
            ratchildrendata.forEach((child) => {
              db.run(
                `INSERT INTO ratchildrendata (pid, cid, name, age, description, action, cimgURL)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                  child.pid,
                  child.cid,
                  child.name,
                  child.age,
                  child.description,
                  child.action,
                  child.cimgURL,
                ],
                (err) => {
                  if (err) {
                    console.log("Insert error (ratchildrendata):", err);
                  }
                }
              );
            });
            console.log("---> ratchildren data inserted.");
          }
        });
      }
    }
  );
}

module.exports = { initTableratchildren };
