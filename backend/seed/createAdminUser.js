const bcrypt = require('bcrypt');
const db = require('../utils/db');

async function createAdminUser() {
  try {
    console.log('Checking for admin user...');
    
    db.query('SELECT * FROM users WHERE email = ?', ['admin@example.com'], async (err, results) => {
      if (err) {
        console.error('Error checking admin:', err);
        process.exit(1);
      }

      if (results && results.length > 0) {
        console.log('✓ Admin user already exists');
        process.exit(0);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      // Insert admin user
      db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin', 'admin@example.com', hashedPassword, 'admin'],
        (err, results) => {
          if (err) {
            console.error('Error creating admin user:', err);
            process.exit(1);
          }
          console.log('✓ Admin user created successfully');
          console.log('Email: admin@example.com');
          console.log('Password: admin123');
          process.exit(0);
        }
      );
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdminUser();
