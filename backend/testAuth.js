const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'hotel_booking'
});

conn.query('SELECT * FROM users WHERE role = "admin"', (err, results) => {
  if(err) {
    console.error('Error:', err);
  } else {
    console.log('Admin users:', results);
  }
  conn.end();
});
