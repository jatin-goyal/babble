import { Box, IconButton, Input, Text, useToast } from '@chakra-ui/react';
import { StarIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { UseDatabase } from '../../context/DbContext';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';

const Comments = () => {
  const { article, postCommment, comments } = UseDatabase();
  const [comment, setComment] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  const handlePostComment = async () => {
    if (!comment) {
      toast({
        title: "Can't post empty comment",
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box mt={12}>
      <Text fontSize={['2xl', '3xl']}>Comments</Text>

      <Box display={'flex'} my={5}>
        <Box display={'flex'} w={['90%', '100%']}>
          <Input
            variant="unstyled"
            placeholder="Write your comment here"
            fontSize={['xl', '2xl']}
            onChange={e => setComment(e.target.value)}
            value={comment}
          />
          <IconButton icon={<AddIcon />} ml={2} onClick={handlePostComment} />
        </Box>
      </Box>

      <Box>
        {comments &&
          comments.map(comment => (
            <Comment comment={comment} key={comment.commentId} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
