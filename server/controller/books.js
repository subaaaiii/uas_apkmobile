const getAllBooks =(req,res)=>{
    const data ={
        id: 1,
        name: "lumpu",
        kategori: "romance"
    }
    res.json({
        message: 'get all books success',
        data: data
    })
}

const createNewBooks =(req,res)=>{
    // console.log(req.body);
    res.json({
        message: 'create new books success',
        data: req.body 
    })
}

const updateBooks = (req,res)=>{
    console.log(req.params)
    const {id} = req.params
    res.json({
        message: "update books succes",
        id: id,
        data: req.body
    })
}

const deleteBooks = (req,res) =>{
    const {id} = req.params
    res.json({
        message: "delete books success",
        id: id,
        // port: process.env.APP_PORT
    })
}

module.exports ={
    getAllBooks,
    createNewBooks,
    updateBooks,
    deleteBooks
}