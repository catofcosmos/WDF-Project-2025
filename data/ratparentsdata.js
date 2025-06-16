const ratparentsdata = [
  { pid: 1, name: "Cheesy Parent", age: "30" },
  { pid: 2, name: "Edam Elder", age: "45" },
  { pid: 3, name: "Gouda Guardian", age: "10" },
  { pid: 4, name: "Brie Briers", age: "8" },
  { pid: 5, name: "Camembert Caretaker", age: "16" },
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
        console.log("---> ratparentsdata table created or already exists!");

        // Check if the table is empty
        db.get("SELECT COUNT(*) AS count FROM ratparentsdata", (err, row) => {
          if (err) {
            console.log("Error counting ratparentsdata rows:", err);
          } else if (row.count === 0) {
            // Insert default data only if table is empty
            const insert = db.prepare(
              `INSERT INTO ratparentsdata (pid, name, age) VALUES (?, ?, ?)`
            );
            ratparentsdata.forEach((parent) => {
              insert.run(parent.pid, parent.name, parent.age);
            });
            insert.finalize(() => {
              console.log("---> ratparents default data inserted.");
            });
          } else {
            console.log("---> ratparentsdata table already has data, skipping insert.");
          }
        });
      }
    }
  );
}

module.exports = { initTableratparents };
