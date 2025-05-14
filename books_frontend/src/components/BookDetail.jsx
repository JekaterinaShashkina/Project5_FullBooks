import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBookById } from "../services/BookService";
import { Box, Typography, Button, Divider, CardMedia } from "@mui/material";
import { useAuth } from '../context/AuthContext';
import { deleteBook } from "../services/BookService";
import AddCommentModal from "./AddComment";

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentModalOpen, setCommentModalOpen] = useState(false);    
    const { user } = useAuth();
    const navigate = useNavigate()

    const loadBook = async () => {
      try {
          const data = await fetchBookById(id)
          setBook(data)
      } catch (error) {
          console.error('Error with fetching book', error);
      }finally {
          setLoading(false)
      }
  }
    useEffect(()=> {
        loadBook()
    }, [id])

    const handleDelete = async () => {
      if (!window.confirm('Are you sure that you delete this book?')) return;
    
      try {
        await deleteBook(book.bookId);
        alert('Book is deleted');
        navigate('/'); // или куда тебе нужно
      } catch (error) {
        console.error('Deleting error:', error);
        alert('Book deleting error');
      }
    };

    if (loading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <Box sx={{ maxWidth: '1280px', margin: 'auto', p: 4 }}>
          {/* Заголовок */}
          <Typography variant="h4" align="center" gutterBottom>
            {book.title}
          </Typography>
    
          {/* Основной контент */}
          <Box sx={{ display: 'flex', gap: 20, mt: 6 }}>
            {/* Левая колонка — обложка и кнопка */}
            <Box sx={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {book.cover_url && (
                    <CardMedia
                        component="img"
                        image={`http://localhost:3000${book.cover_url.replace('/public', '')}`}
                        alt={book.title}
                        sx={{
                        height: 240,
                        width: '100%',
                        objectFit: 'contain',
                        }}
                    />
                )}

              {user?.role === 'admin' && (
                <Box sx={{display: 'flex', gap: '10px'}}>
                <Button
                    variant="contained"                    
                    onClick={() => navigate(`/edit/${book.bookId}`)}
                    sx={{ mt: 2, backgroundColor:'#2c3755' }}>
                    Change
                  </Button>                
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ mt: 2 }}
                  >
                    Delete
                  </Button>
              </Box>
              )}

            </Box>
    
            {/* Правая колонка — описание */}
            <Box sx={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Authors:</strong>{' '}
                {book.authors.map((a, i) => (
                  <span key={a.authorId}>
                    {a.first_name} {a.last_name}
                    {i < book.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </Typography>
    
              <Typography variant="subtitle1" gutterBottom>
                <strong>Publication Year:</strong> {book.publicationYear}
              </Typography>
    
              <Typography variant="subtitle1" gutterBottom>
                <strong>Category:</strong> {book.category?.name}
              </Typography>
    
              <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Description:</strong> {book.description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', mt: '40px', gap: '10px'}}>
          <Typography variant="h4">Comments</Typography>
          {book.comment?.map((com) => (
              <Box key={com.commentId} sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', padding: '10px 0'}}>
              <Typography><strong>Username: </strong>{com.user?.username || 'Anonymous'}</Typography>
              <Typography sx={{mb:'10px'}}>{com.body}</Typography>
              <Divider />
            </Box>
            
          ))}
          {user && (
            <>
            <Button
                    variant="contained"                    
                    sx={{ padding: '10px 30px', margin: '0 auto', backgroundColor:'#2c3755' }}
                    onClick={() => setCommentModalOpen(true)}
                  >Add Comment
          </Button>
          <AddCommentModal
            open={commentModalOpen}
            handleClose={() => setCommentModalOpen(false)}
            bookId={book.bookId}
            onCommentAdded={loadBook} 
          />  
          </>
          )}
          </Box>
        </Box>
      );
}

export default BookDetail