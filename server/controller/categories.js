const { Categories } = require("../models");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Categories.findAll();
      res.status(201).json({
        message: "get all categories success",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
