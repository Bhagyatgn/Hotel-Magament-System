const Hotel=require('../models/hotelMOdel');
exports.createHotel=(req,res)=>{
    const {name,city,address,latitude,longitude,rating,description,image_url}=req.body;
    const hotelData=[name,city,address,latitude,longitude,rating,description,image_url];
    Hotel.createHotel(hotelData,(err,results)=>{
        if(err) return res.status(500).json({error:err});
        res.status(201).json({message:"Hotel created successfully",hotelId:results.insertId});
    });
};
exports.getHotels=(req,res)=>{
    const { city, budget } = req.query;
    
    if (city || budget) {
        // If search parameters provided, use filtered query
        let sql = `
            SELECT DISTINCT h.*, 
                   (SELECT MIN(price_per_night) FROM rooms WHERE hotel_id = h.id) as min_price
            FROM hotels h
            LEFT JOIN rooms r ON h.id = r.hotel_id
            WHERE 1=1
        `;
        let params = [];
        
        if (city && city.trim() !== '') {
            sql += ` AND h.city LIKE ?`;
            params.push(`%${city}%`);
        }
        
        if (budget && budget > 0) {
            sql += ` AND (SELECT MIN(price_per_night) FROM rooms WHERE hotel_id = h.id) <= ?`;
            params.push(budget);
        }
        
        const db = require('../utils/db');
        db.query(sql, params, (err, hotels) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(hotels);
        });
    } else {
        // If no search params, return all hotels
        Hotel.getAllHotels((err, hotels) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(hotels);
        });
    }
};

exports.getHotelById = (req, res) => {
    const {id}=req.params;
    Hotel.getHotelById(id, (err, hotel) => {
    if (err) return res.status(500).json({ error: err.message });
    if (hotel.length === 0) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel[0]);
  });
};
exports.updateHotel = (req, res) => {
  const { id } = req.params;
  const { name, city, address, latitude, longitude, rating, description, image_url } = req.body;

  const hotelData = [name, city, address, latitude, longitude, rating, description, image_url];

  Hotel.updateHotel(id, hotelData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Hotel updated successfully!" });
  });
};
exports.deleteHotel = (req, res) => {
  const { id } = req.params;

  Hotel.deleteHotel(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Hotel deleted successfully!" });
  });
};

exports.getHotelsByBudget = (req, res) => {
  const { city, minBudget, maxBudget } = req.query;

  if (!city || !minBudget || !maxBudget) {
    return res.status(400).json({ message: "City, minBudget and maxBudget are required" });
  }

  Hotel.getHotelsByCityAndBudget(city, minBudget, maxBudget, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching hotels", error: err });
    res.json(results);
  });
};



