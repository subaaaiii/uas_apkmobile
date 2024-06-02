const { Book } = require("../models");
const fs = require("fs");

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
      category1,
      category2,
      category3,
      rating,
      pages,
      cover,
      year,
      description,
    } = req.body;
    const foto = req.file;
    console.log(foto);
    if (foto) {
      image = foto.filename;
    } else image = "noimage.png";
    const book = await Book.create({
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
  try {
    const {
      name,
      author,
      category1,
      category2,
      category3,
      rating,
      pages,
      cover,
      year,
      description,
    } = req.body;
    const foto = req.file;
    if (foto) {
      image = foto.filename;
    } else image = null;
    const { id } = req.body;
    const imageBeforeUpdate = await Book.findOne({
      attributes: ["image"],
      where: {
        id: id,
      },
    });
    await Book.update(
      {
        name,
        author,
        ...(image !== null && { image: image }),
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
    if (foto && imageBeforeUpdate.image != "noimage.png") {
      fs.unlinkSync("images/book/" + imageBeforeUpdate.image);
    }
    res.status(201).json({ message: "update book success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const imageBeforeDelete = await Book.findOne({
      attributes: ["image"],
      where: {
        id: id,
      },
    });
    await Book.destroy({
      where: {
        id: id,
      },
    });
    if (imageBeforeDelete.image != "noimage.png") {
      fs.unlinkSync("images/book/" + imageBeforeDelete.image);
    }
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
