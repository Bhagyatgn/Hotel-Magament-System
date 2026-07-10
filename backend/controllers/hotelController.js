const Hotel = require('../models/hotelMOdel');
const db = require('../utils/db');

const HOTEL_SELECT = `
  SELECT h.*,
         (SELECT MIN(price_per_night) FROM rooms WHERE hotel_id = h.id) AS min_price
  FROM hotels h
`;

exports.createHotel = (req, res) => {
  const { name, city, address, latitude, longitude, rating, description, image_url } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: 'Hotel name and city are required' });
  }

  const hotelData = [
    name,
    city,
    address || '',
    latitude || '',
    longitude || '',
    rating || 0,
    description || '',
    image_url || '',
  ];

  Hotel.createHotel(hotelData, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Hotel created successfully', hotelId: results.insertId });
  });
};

exports.getHotels = (req, res) => {
  const { city, budget } = req.query;
  const hasCity = city && city.trim() !== '';
  const budgetNum = Number(budget);
  const hasBudget = !Number.isNaN(budgetNum) && budgetNum > 0;

  if (hasCity || hasBudget) {
    let sql = `${HOTEL_SELECT} WHERE 1=1`;
    const params = [];

    if (hasCity) {
      sql += ' AND h.city LIKE ?';
      params.push(`%${city.trim()}%`);
    }

    if (hasBudget) {
      sql += ` AND (
        (SELECT MIN(price_per_night) FROM rooms WHERE hotel_id = h.id) IS NULL
        OR (SELECT MIN(price_per_night) FROM rooms WHERE hotel_id = h.id) <= ?
      )`;
      params.push(budgetNum);
    }

    sql += ' ORDER BY h.rating DESC, h.name ASC';

    db.query(sql, params, (err, hotels) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(hotels);
    });
    return;
  }

  db.query(`${HOTEL_SELECT} ORDER BY h.rating DESC, h.name ASC`, (err, hotels) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(hotels);
  });
};

exports.getHotelById = (req, res) => {
  const { id } = req.params;

  if (id === 'filter' || id === 'add') {
    return res.status(404).json({ message: 'Hotel not found' });
  }

  db.query(`${HOTEL_SELECT} WHERE h.id = ?`, [id], (err, hotel) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!hotel.length) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel[0]);
  });
};

exports.updateHotel = (req, res) => {
  const { id } = req.params;
  const { name, city, address, latitude, longitude, rating, description, image_url } = req.body;
  const hotelData = [name, city, address, latitude, longitude, rating, description, image_url];

  Hotel.updateHotel(id, hotelData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Hotel updated successfully!' });
  });
};

exports.deleteHotel = (req, res) => {
  const { id } = req.params;

  Hotel.deleteHotel(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Hotel deleted successfully!' });
  });
};

exports.getHotelsByBudget = (req, res) => {
  const { city, minBudget, maxBudget } = req.query;

  if (!city || !minBudget || !maxBudget) {
    return res.status(400).json({ message: 'City, minBudget and maxBudget are required' });
  }

  Hotel.getHotelsByCityAndBudget(city, minBudget, maxBudget, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching hotels', error: err.message });
    res.json(results);
  });
};
