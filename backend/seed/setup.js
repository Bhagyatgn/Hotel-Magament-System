#!/usr/bin/env node

const bcrypt = require('bcrypt');
const db = require('../utils/db');

console.log('🚀 Setting up Hotel Management System...\n');

async function setupDatabase() {
  return new Promise((resolve) => {
    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(50) UNIQUE,
        password VARCHAR(255),
        role ENUM('user','admin') DEFAULT 'user'
      )
    `;

    db.query(createUsersTable, (err) => {
      if (err) {
        console.error('❌ Error creating users table:', err.message);
        resolve(false);
      } else {
        console.log('✓ Users table created/verified');
        resolve(true);
      }
    });
  });
}

async function createAdminUser() {
  return new Promise(async (resolve) => {
    db.query('SELECT * FROM users WHERE email = ?', ['admin@example.com'], async (err, results) => {
      if (err) {
        console.error('❌ Error checking admin user:', err.message);
        resolve(false);
        return;
      }

      if (results && results.length > 0) {
        console.log('✓ Admin user already exists');
        resolve(true);
        return;
      }

      try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        db.query(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          ['Admin', 'admin@example.com', hashedPassword, 'admin'],
          (err) => {
            if (err) {
              console.error('❌ Error creating admin user:', err.message);
              resolve(false);
            } else {
              console.log('✓ Admin user created successfully');
              resolve(true);
            }
          }
        );
      } catch (error) {
        console.error('❌ Error hashing password:', error.message);
        resolve(false);
      }
    });
  });
}

async function setup() {
  const dbSetup = await setupDatabase();
  if (!dbSetup) {
    console.error('\n❌ Database setup failed');
    process.exit(1);
  }

  const adminSetup = await createAdminUser();
  if (!adminSetup) {
    console.error('\n❌ Admin user setup failed');
    process.exit(1);
  }

  console.log('\n✅ Setup completed successfully!\n');
  console.log('📝 Login Credentials:');
  console.log('   Email: admin@example.com');
  console.log('   Password: admin123\n');
  console.log('🚀 Next steps:');
  console.log('   1. Start backend: node server.js');
  console.log('   2. Start frontend: npm start');
  console.log('   3. Go to http://localhost:3000/admin-login\n');
  
  process.exit(0);
}

setup();
