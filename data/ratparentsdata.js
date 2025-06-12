const ratparentsdata = [
  {
    pid: 1,
    name: "Cheesy Parent",
    age: "12",
  },
  {
    pid: 2,
    name: "Edam Elder",
    age: "14",
  },
  {
    pid: 3,
    name: "Gouda Guardian",
    age: "10",
  },
  {
    pid: 4,
    name: "Brie Breeder",
    age: "8",
  },
  {
    pid: 5,
    name: "Camembert Caretaker",
    age: "16",
  },
];

function initTableratparents(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS ratparentsdata (
      pid INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      age TEXT NOT NULL
    )`,
    (error) => {
      if (error) {
        console.log("Error creating ratparentsdata table:", error);
      } else {
        console.log("---> ratparentsdata table created!");

        // Clear existing data to avoid duplicates
        db.run("DELETE FROM ratparentsdata", () => {
          // Insert all sample data
          ratparentsdata.forEach((parent) => {
            db.run(
              `INSERT INTO ratparentsdata (pid, name, age)
              VALUES (?, ?, ?)`,
              [parent.pid, parent.name, parent.age],
              (err) => {
                if (err) {
                  console.log("Insert error (ratparentsdata):", err);
                }
              }
            );
          });
          console.log("---> ratparents data inserted.");
        });
      }
    }
  );
}

module.exports = { initTableratparents };
