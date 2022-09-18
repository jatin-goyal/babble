import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  IconButton,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import { UseDatabase } from '../../context/DbContext';

const Comment = ({ comment }) => {
  const toast = useToast();

  const { deleteComment } = UseDatabase();
  const { user } = UserAuth();

  const handleDeleteComment = () => {
    try {
      deleteComment(comment?.commentId);
      toast({ title: 'Comment deleted', status: 'success', duration: 5000 });
    } catch (err) {
      console.log(err.message);
    }
  };

  let date = new Date(comment?.time).toString().slice(4, 21);

  return (
    <Box w={['90%', null, '80%']}>
      <Box display={'flex'} mt={2}>
        <Text mr={2} color={'blue.300'}>{`@${comment?.authorUsername}`}</Text>
        <Text>{date}</Text>
        <Spacer />
        {user.uid === comment.authorId && (
          <IconButton onClick={handleDeleteComment}>
            <DeleteIcon color={'red.300'} />
          </IconButton>
        )}
      </Box>
      <Text mx={2} opacity={0.8}>
        {comment?.comment}
      </Text>
      <Divider my={4} />
    </Box>
  );
};

export default Comment;
