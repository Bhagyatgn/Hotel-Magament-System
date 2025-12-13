const db = require("./utils/db");

const updateRoomImages = () => {
  const sql = `
    UPDATE rooms 
    SET image_url = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop'
    WHERE image_url IS NULL
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error updating room images:", err);
      process.exit(1);
    }
    console.log("✓ Updated", result.affectedRows, "rooms with default images");
    process.exit(0);
  });
};

updateRoomImages();
