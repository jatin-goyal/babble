import React from 'react';
import { Spinner, Box } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" w="100%">
      <Spinner m="10" color="red.500" h={10} w={10} />
    </Box>
  );
};
export default Loading;
