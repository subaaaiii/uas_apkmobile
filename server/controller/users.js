const { User } = require("../models");

const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(201).json({
            message: "get all users success",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const findUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (user) {
            res.status(201).json({
                message: "get user success",
                data: user,
            });
        } else {
            res.status(201).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createNewUser = async (req, res) => {
    try {
        const {
            username,
            email,
            phone,
            dateofbirth,
            profilepicture
        } = req.body;
        const user = await User.create({
            username,
            email,
            phone,
            dateofbirth,
            profilepicture
        });
        res.status(201).json({
            message: "add user success",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    const {
        username,
        email,
        phone,
        dateofbirth,
        profilepicure
    } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update(
                {
                    username,
                    email,
                    phone,
                    dateofbirth,
                    profilepicure
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            res.status(201).json({ message: "update book success" });
        }
        else {
            res.status(404).json({ message: "Buku Tidak Ditemukan" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.destroy({
                where: {
                    id: id,
                },
            });
            res.status(201).json({ message: "delete user success" });
        }
        else {
            res.status(404).json({ message: "user Tidak Ditemukan" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    findUserById,
};
