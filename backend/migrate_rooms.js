const db = require("./utils/db");

const addRoomColumns = () => {
  // First check if columns exist
  const checkSql = "SHOW COLUMNS FROM rooms LIKE 'image_url'";
  
  db.query(checkSql, (err, result) => {
    if (err) {
      console.error("Error checking columns:", err);
      process.exit(1);
    }
    
    if (result.length > 0) {
      console.log("✓ Columns already exist in rooms table");
      process.exit(0);
    }
    
    // Add columns if they don't exist
    const sql = `
      ALTER TABLE rooms 
      ADD COLUMN description TEXT AFTER status,
      ADD COLUMN image_url VARCHAR(255) AFTER description
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error adding columns:", err);
        process.exit(1);
      }
      console.log("✓ Successfully added description and image_url columns to rooms table");
      process.exit(0);
    });
  });
};

addRoomColumns();
