const { User } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            password,
            phone,
            dateofbirth,
            profilepicture
        } = req.body;
        const rawPassword = password;
        const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
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

const loginUser = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const searchedUsername = username;
        const user = await User.findOne({ where: { username: searchedUsername } });
        if (user) {
            const matchedPassword = await bcrypt.compare(password, user.password);
            if (!matchedPassword) {
                return res.json({
                    status: 401,
                    message: "Password Salah"
                })
            }
            res.json({
                status: 200,
                message: "Login Berhasil",
                data: user
            })
        }
        else {
            res.json({
                status: 401,
                message: "username/email tidak ditemukan"
            })
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    const {
        username,
        email,
        phone,
        dateofbirth,
        profilepicture
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
                    profilepicture
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            res.status(201).json({ message: "update user success" });
        }
        else {
            res.status(404).json({ message: "user Tidak Ditemukan" });
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
    loginUser
};
