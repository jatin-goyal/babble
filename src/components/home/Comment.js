import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

const Comment = ({ comment }) => {
  const deleteComment = () => {};
  return (
    <Box>
      <Box>
        <Text>{comment?.authorUsername}</Text>
        <Text></Text>
        <IconButton icon={DeleteIcon} onClick={deleteComment} />
      </Box>
    </Box>
  );
};

export default Comment;
