const { User } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { refreshToken } = require('./refreshToken')
const fs = require("fs");

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

// const loginUser = async (req, res) => {
//     try {
//         const {
//             username,
//             password
//         } = req.body;
//         const searchedUsername = username;
//         const user = await User.findOne({ where: { username: searchedUsername } });
//         if (user) {
//             const matchedPassword = await bcrypt.compare(password, user.password);
//             if (!matchedPassword) {
//                 return res.json({
//                     status: 401,
//                     message: "Password Salah"
//                 })
//             }
//             res.json({
//                 status: 200,
//                 message: "Login Berhasil",
//                 data: user
//             })
//         }
//         else {
//             res.json({
//                 status: 401,
//                 message: "username/email tidak ditemukan"
//             })
//         }
//     } catch (error) {
//         res.json({
//             status: 500,
//             message: error
//         })
//     }
// }

const updateUser = async (req, res) => {
    const {
        username,
        email,
        phone,
        dateofbirth
    } = req.body;
    const foto = req.file;
    const { id } = req.params;
    const imageBeforeUpdate = await User.findOne({
        attributes: ["profilepicture"],
        where: {
            id: id,
        },
    });
    if (foto) {
        profilepicture = foto.filename;
    } else {
        profilepicture = imageBeforeUpdate.profilepicture
    }
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
            if (foto && imageBeforeUpdate.profilepicture != "default.png") {
                fs.unlinkSync("images/user/" + imageBeforeUpdate.profilepicture);
            }
            res.status(201).json({
                message: "update user success",
                data: user

            });
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

const registerUser = async (req, res) => {
    const { username, email, password, confPassword, phone, dateofbirth } = req.body;

    if (!username.trim() || !email.trim() || !password.trim() || !confPassword.trim()) {
        return res.status(400).json({ message: "Input fields cannot be empty" });
    }

    if (password !== confPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters long, include at least one uppercase letter and one number" });
    }

    if (password !== confPassword)
        return res.status(400).json({ message: "Password not match" });

    const existingUser = await User.findAll({
        where: {
            email: email,
        },
    });
    if (existingUser.length > 0)
        return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            username: username,
            email: email,
            password: hashPassword,
            phone: phone,
            dateofbirth: dateofbirth,
            profilepicture: "default.png",
        });
        res.json({ msg: "Register Success" });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            return res.status(404).json({ message: "Email tidak ditemukan" })
        }

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return res.status(400).json({ message: "Password salah" })
        }

        const userId = user.id;
        const username = user.username;
        const email = user.email;
        const accessToken = jwt.sign(
            { userId, username, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "20s",
            }
        );

        const refresh_token = jwt.sign(
            { userId, username, email },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
        );

        await User.update(
            { refreshToken: refresh_token },
            {
                where: {
                    id: userId,
                }
            }
        );

        res.cookie("refreshToken", refresh_token, {
            httOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.json({ accessToken, refresh_token });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.query.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where: {
            refreshToken: refreshToken,
        },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update(
        { refreshToken: null },
        {
            where: {
                id: userId,
            },
        }
    );
    res.clearCookie("refreshToken");
    console.log(User.refreshToken)
    return res.sendStatus(200);
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    findUserById,
    loginUser,
    logoutUser,
    registerUser
};