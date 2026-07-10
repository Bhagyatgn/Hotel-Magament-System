const offerModel = require("../models/offerModel");

const normalizeStatus = (status) => {
  if (typeof status !== "string") {
    return null;
  }

  const normalized = status.trim().toLowerCase();
  return normalized === "inactive" ? "inactive" : "active";
};

const createOffer = async (req, res) => {
  try {
    const { title, subtitle, description, discount_label, image_url, valid_until, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Offer title is required" });
    }

    if (!discount_label || !discount_label.trim()) {
      return res.status(400).json({ message: "Offer discount label is required" });
    }

    const offerData = {
      title: title.trim(),
      subtitle: subtitle?.trim() || null,
      description: description?.trim() || null,
      discount_label: discount_label.trim(),
      image_url: image_url?.trim() || null,
      valid_until: valid_until || null,
      status: normalizeStatus(status),
    };

    const result = await offerModel.createOffer(offerData);
    res.status(201).json({ message: "Offer created successfully", offerId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating offer" });
  }
};

const getOffers = async (req, res) => {
  try {
    const offers = await offerModel.getOffers(false);
    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching offers" });
  }
};

const getAllOffers = async (req, res) => {
  try {
    const offers = await offerModel.getOffers(true);
    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching all offers" });
  }
};

const getOfferById = async (req, res) => {
  try {
    const offer = await offerModel.getOfferById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching offer" });
  }
};

const updateOffer = async (req, res) => {
  try {
    const { title, subtitle, description, discount_label, image_url, valid_until, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Offer title is required" });
    }

    if (!discount_label || !discount_label.trim()) {
      return res.status(400).json({ message: "Offer discount label is required" });
    }

    const offerData = {
      title: title.trim(),
      subtitle: subtitle?.trim() || null,
      description: description?.trim() || null,
      discount_label: discount_label.trim(),
      image_url: image_url?.trim() || null,
      valid_until: valid_until || null,
      status: normalizeStatus(status),
    };

    await offerModel.updateOffer(req.params.id, offerData);
    res.json({ message: "Offer updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating offer" });
  }
};

const deleteOffer = async (req, res) => {
  try {
    await offerModel.deleteOffer(req.params.id);
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting offer" });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
};