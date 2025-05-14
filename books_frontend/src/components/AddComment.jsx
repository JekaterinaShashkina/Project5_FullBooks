import React, { useState } from 'react';
import {
  Modal, Box, Typography, TextField, Button
} from '@mui/material';
import axios from 'axios';
import { API_URL } from '../constants/env';

const AddCommentModal = ({ open, handleClose, bookId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');
  const user =localStorage.getItem('user')

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/comments/${bookId}`, {
        body: comment,
        bookId,
        userId: user.id
      }, {
        headers: {
          Authorization: token,
        },
      });
      setComment('');
      onCommentAdded(); 
      handleClose();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper', p: 4, borderRadius: 2, width: 400
      }}>
        <Typography variant="h6" mb={2}>Add Comment</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={!comment.trim()}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCommentModal;
