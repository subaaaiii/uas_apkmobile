const { Favorite, Book, User } = require("../models");

module.exports = {
  getAllFavorite: async (req, res) => {
    try {
      const { id } = req.params;
      const favorite = await Favorite.findAll({
        where: {
          id_user: id,
        },
        include: [Book],
      });
      res.status(201).json({
        message: "get favorite success",
        data: favorite,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  addToFavorite: async (req, res) => {
    try {
      const { id_book, id_user } = req.body;
      const data = await Favorite.create({
        id_book,
        id_user,
      });
      res.status(201).json({
        message: "added to favorite success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  removeFromFavorite: async (req, res) => {
    try {
      const { id_book, id_user } = req.body;
      await Favorite.destroy({
        where: {
          id_book,
          id_user,
        },
      });
      res.status(201).json({
        message: "Remove from favorite success",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
