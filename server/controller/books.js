const { Book } = require("../models");
const getAllBooks = async (req, res) => {
  try {
    const book = await Book.findAll();
    res.status(201).json({
      message: "get all books success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (book) {
      res.status(201).json({
        message: "get book success",
        data: book,
      });
    } else {
      res.status(201).json({ message: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewBooks = async (req, res) => {
  try {
    const {
      name,
      author,
      image,
      category1,
      category2,
      category3,
      rating,
      pages,
      cover,
      year,
      description,
    } = req.body;
    const book = await Book.create({
      name,
      author,
      image: image || "default.png",
      category1,
      category2,
      category3,
      rating,
      pages,
      cover,
      year,
      description,
    });
    res.status(201).json({
      message: "create book success",
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBooks = async (req, res) => {
  const {
    name,
    author,
    image,
    category1,
    category2,
    category3,
    rating,
    pages,
    cover,
    year,
    description,
  } = req.body;
  const { id } = req.params;
  try {
    await Book.update(
      {
        name,
        author,
        ...(image && { image: image }),
        category1,
        category2,
        category3,
        rating,
        pages,
        cover,
        year,
        description,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).json({ message: "update book success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBooks = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json({ message: "delete book success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  createNewBooks,
  updateBooks,
  deleteBooks,
  findBookById,
};
