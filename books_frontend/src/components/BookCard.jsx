import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const BookCard = ({book}) => {
    
    return (
            <Link to={`/books/${book.bookId}`} style={{ textDecoration: 'none' }}>
            <Card sx={{        
                width: 200,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: 3,
                cursor: 'pointer',
                margin: '10px'
                }}>
            {book.cover_url && (
            <CardMedia
                component="img"
                image={`http://localhost:3000${book.cover_url.replace('/public', '')}`}
                alt={book.title}
                sx={{
                height: 180,
                width: '100%',
                objectFit: 'contain',
            }}
            />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
            {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {book.publicationYear} &middot; {book.category?.name}
            </Typography>
            {book.authors?.length > 0 && (
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {book.authors.map((author, index) => (
                        <span key={author.authorId}>
                            {author.first_name} {author.last_name}
                            {index < book.authors.length - 1 && <br/>}
                        </span>
                    ))}
                </Typography>
            )

            }
        </CardContent>

            </Card>
            </Link> 
    )
}

export default BookCard