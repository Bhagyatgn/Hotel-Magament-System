const db = require("./utils/db");

// Different room images from Unsplash
const roomImages = [
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop', // Deluxe room
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop', // Twin room
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop', // Suite
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop', // Double room
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop', // Luxury room
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop', // Modern room
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=300&fit=crop', // Single room
];

const updateRoomImages = () => {
  // First, get all rooms
  db.query('SELECT id FROM rooms ORDER BY id', (err, rooms) => {
    if (err) {
      console.error("Error fetching rooms:", err);
      process.exit(1);
    }

    if (rooms.length === 0) {
      console.log("No rooms found to update");
      process.exit(0);
    }

    let updated = 0;
    let errors = 0;

    // Update each room with a different image
    rooms.forEach((room, index) => {
      const imageUrl = roomImages[index % roomImages.length];
      const sql = 'UPDATE rooms SET image_url = ? WHERE id = ?';
      
      db.query(sql, [imageUrl, room.id], (err, result) => {
        if (err) {
          console.error(`Error updating room ${room.id}:`, err);
          errors++;
        } else {
          updated++;
          console.log(`✓ Room ${room.id} updated with image ${index % roomImages.length + 1}`);
        }

        // Check if all updates are done
        if (updated + errors === rooms.length) {
          console.log(`\n✓ Updated ${updated} rooms with unique images`);
          if (errors > 0) {
            console.log(`✗ ${errors} errors occurred`);
          }
          process.exit(errors > 0 ? 1 : 0);
        }
      });
    });
  });
};

updateRoomImages();
