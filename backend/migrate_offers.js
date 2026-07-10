const db = require("./utils/db");

const sql = `
  CREATE TABLE IF NOT EXISTS offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(150),
    description TEXT,
    discount_label VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    valid_until DATE,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(sql, (err) => {
  if (err) {
    console.error("Error creating offers table:", err);
    process.exitCode = 1;
  } else {
    console.log("Offers table is ready");
  }

  db.end();
});