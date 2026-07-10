const db = require("../utils/db");

const createOffer = (offerData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO offers (title, subtitle, description, discount_label, image_url, valid_until, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      offerData.title,
      offerData.subtitle || null,
      offerData.description || null,
      offerData.discount_label,
      offerData.image_url || null,
      offerData.valid_until || null,
      offerData.status || "active",
    ];

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getOffers = (includeInactive = false) => {
  return new Promise((resolve, reject) => {
    const sql = includeInactive
      ? "SELECT * FROM offers ORDER BY created_at DESC, id DESC"
      : "SELECT * FROM offers WHERE status = 'active' ORDER BY created_at DESC, id DESC";

    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getOfferById = (offerId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM offers WHERE id = ?";
    db.query(sql, [offerId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const updateOffer = (offerId, offerData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE offers
      SET title = ?, subtitle = ?, description = ?, discount_label = ?, image_url = ?, valid_until = ?, status = ?
      WHERE id = ?
    `;
    const params = [
      offerData.title,
      offerData.subtitle || null,
      offerData.description || null,
      offerData.discount_label,
      offerData.image_url || null,
      offerData.valid_until || null,
      offerData.status || "active",
      offerId,
    ];

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteOffer = (offerId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM offers WHERE id = ?";
    db.query(sql, [offerId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  createOffer,
  getOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
};