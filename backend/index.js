const server = require("./server");
const db = require("./utils/db");

db.query("SELECT 1", (err) => {
  if (err) throw err;
  console.log("Database connected!");
});

server.listen(5000, () => console.log("Server running on port 5000"));
