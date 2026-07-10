const db = require('./db');

const run = (sql) =>
  new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

const ensureSchema = async () => {
  try {

    // Check existing columns in rooms table
    const columns = await run(`SHOW COLUMNS FROM rooms`);

    const columnNames = columns.map((column) => column.Field);


    // Add description column only if it does not exist
    if (!columnNames.includes('description')) {
      await run(`
        ALTER TABLE rooms
        ADD COLUMN description TEXT
      `);

      console.log("Added description column");
    }


    // Add image_url column only if it does not exist
    if (!columnNames.includes('image_url')) {
      await run(`
        ALTER TABLE rooms
        ADD COLUMN image_url VARCHAR(255)
      `);

      console.log("Added image_url column");
    }


    // Create offers table if it does not exist
    await run(`
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
    `);


    console.log("Database schema verified successfully");

  } catch (error) {
    console.error("Schema initialization failed:", error);
    throw error;
  }
};


module.exports = ensureSchema;