import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

const SmallLoading = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </Box>
  );
};

export default SmallLoading;
