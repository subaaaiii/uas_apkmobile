const { Favorite, Book, User, sequelize } = require("../models");

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
      const existingFavorite = await Favorite.findOne({
        where: {
          id_user: id_user,
          id_book: id_book,
        },
      });

      if (existingFavorite) {
        return res.status(409).json({ message: "Favorite already exists" });
      }
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
      const { id_book, id_user } = req.params;
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
  getTopBook: async (req, res) => {
    try {
      const favorite = await Favorite.findAll({
        attributes: [
          'id_book',
          [sequelize.fn('COUNT', sequelize.col('id_book')), 'count'],
        ],
        include: [Book],
        group: ['id_book', 'Book.id'], // Ensure to include 'Book.id' in the group by to avoid SQL errors
        order: [[sequelize.fn('COUNT', sequelize.col('id_book')), 'DESC']],
      });
  
      const counts = favorite.map(item => item.get('count'));

      res.status(201).json({
        message: "Get favorite success",
        data: favorite,
        counts
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
