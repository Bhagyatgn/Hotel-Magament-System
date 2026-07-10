#!/usr/bin/env node

const bcrypt = require('bcrypt');
const db = require('../utils/db');

const hotels = [
  {
    name: 'Aurora Grand',
    city: 'Dubai',
    address: 'Downtown Boulevard',
    latitude: '25.2048',
    longitude: '55.2708',
    rating: 4.9,
    description: 'High-rise suites, skyline views, and a rooftop pool designed for long stays and special weekends.',
    image_url: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2104d?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      { type: 'Skyline King', price_per_night: 220, capacity: 2 },
      { type: 'Executive Suite', price_per_night: 360, capacity: 4 },
    ],
  },
  {
    name: 'Harbor House',
    city: 'Goa',
    address: 'Coconut Bay',
    latitude: '15.2993',
    longitude: '74.1240',
    rating: 4.7,
    description: 'Coastal boutique rooms with warm interiors, quick beach access, and slow mornings.',
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      { type: 'Sea Breeze Deluxe', price_per_night: 120, capacity: 3 },
      { type: 'Garden Villa', price_per_night: 95, capacity: 2 },
    ],
  },
  {
    name: 'Glassline Retreat',
    city: 'Singapore',
    address: 'Marina District',
    latitude: '1.2838',
    longitude: '103.8591',
    rating: 4.8,
    description: 'Minimal luxury with smart-room controls, elevated dining, and efficient service.',
    image_url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      { type: 'Urban Capsule', price_per_night: 190, capacity: 2 },
      { type: 'Marina Suite', price_per_night: 280, capacity: 3 },
    ],
  },
  {
    name: 'Colombo Pearl',
    city: 'Colombo',
    address: 'Galle Face Green',
    latitude: '6.9271',
    longitude: '79.8612',
    rating: 4.6,
    description: 'Oceanfront luxury with infinity pool, spa, and fine dining overlooking the Indian Ocean.',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    rooms: [
      { type: 'Ocean View King', price_per_night: 150, capacity: 2 },
      { type: 'Pearl Suite', price_per_night: 250, capacity: 4 },
    ],
  },
];

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

async function seed() {
  console.log('Seeding hotel database...\n');

  await query(`
    ALTER TABLE users MODIFY email VARCHAR(100);
  `).catch(() => {});

  await query(`
    ALTER TABLE users ADD UNIQUE INDEX unique_email (email);
  `).catch(() => {});

  const existingHotels = await query('SELECT COUNT(*) AS count FROM hotels');
  if (existingHotels[0].count > 0) {
    console.log('Hotels already seeded. Skipping hotel data.');
  } else {
    for (const hotel of hotels) {
      const result = await query(
        `INSERT INTO hotels (name, city, address, latitude, longitude, rating, description, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [hotel.name, hotel.city, hotel.address, hotel.latitude, hotel.longitude, hotel.rating, hotel.description, hotel.image_url],
      );
      const hotelId = result.insertId;
      for (const room of hotel.rooms) {
        await query(
          'INSERT INTO rooms (hotel_id, type, price_per_night, capacity, status) VALUES (?, ?, ?, ?, ?)',
          [hotelId, room.type, room.price_per_night, room.capacity, 'available'],
        );
      }
      console.log(`  + ${hotel.name} (${hotel.city}) with ${hotel.rooms.length} rooms`);
    }
  }

  const adminRows = await query('SELECT id FROM users WHERE email = ?', ['admin@example.com']);
  if (!adminRows.length) {
    const hashed = await bcrypt.hash('admin123', 10);
    await query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      'Admin',
      'admin@example.com',
      hashed,
      'admin',
    ]);
    console.log('  + Admin user created (admin@example.com / admin123)');
  } else {
    console.log('  Admin user already exists');
  }

  const demoRows = await query('SELECT id FROM users WHERE email = ?', ['demo@example.com']);
  if (!demoRows.length) {
    const hashed = await bcrypt.hash('demo123', 10);
    await query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      'Demo User',
      'demo@example.com',
      hashed,
      'user',
    ]);
    console.log('  + Demo user created (demo@example.com / demo123)');
  }

  console.log('\nSeed complete.\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
