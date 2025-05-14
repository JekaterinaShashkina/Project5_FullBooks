const { Comment, User, Book } = require('../models')
const asyncHandler = require('express-async-handler');
const logAction = require('../utils/logAction');
// POST new comment
exports.createComment = asyncHandler(async (req, res) => {
    console.log('req: ', req);
    const userId = req.user.userId;
    const bookId = req.params.bookId;
    const { body } = req.body;

    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);
    

    if(!book) {return res.status(404).send({ message: "Book Not found." })}
    
    if (!body) {
       return res.status(400).json({message: "Body is required"});
    }

    const comment = await Comment.create({ 
        body,   
        user_id: user.id,      
        book_id: book.bookId 
    });
    await comment.setUser(user);
    await comment.setBook(book);
    logAction(`[${req.user.role}] ${req.user.username} - Added new comment to book (${book.title})`)
    res.status(201).json({ comment });
})

// GET all comments
exports.getAllComments = async (req, res) => {   

    try {     
        const comments = await Comment.findAll()      
        res.status(200).json(comments)    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching books comments' })    
    } }  