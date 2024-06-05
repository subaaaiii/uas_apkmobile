require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const bookRoutes = require('./routes/books.js');
const userRoutes = require('./routes/users.js');
const favoriteRoutes = require('./routes/favorite.js');
const categoriesRoutes = require('./routes/categories.js');
const loginRegister = require('./routes/loginRegister.js')

const app = express();

// app.method(path,handler);
app.use(cors());
app.use(express.json()); //middleware biar bisa nerima json
app.use(cookieParser());
// app.use(express.static(join(__dirname, "images")));
app.use("/images/book", express.static('./images/book'))
app.use("/images/user", express.static('./images/user'))
app.use(express.urlencoded({ extended: false }));


app.use('/books', bookRoutes)
app.use('/users', userRoutes)
app.use('/categories', categoriesRoutes)
app.use('/favorite', favoriteRoutes)
app.use('/', loginRegister)

app.listen(process.env.APP_PORT, ()=>{
    console.log(`Server Running at Port ${process.env.APP_PORT}`)
})