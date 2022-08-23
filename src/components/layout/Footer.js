import { Box, IconButton } from '@chakra-ui/react';
import { FiGithub } from 'react-icons/fi';
import React from 'react';

const Footer = () => {
  return (
    <Box
      w="100%"
      d="flex"
      justifyContent="center"
      alignItems="center"
      mb="10"
      py={5}
    >
      <IconButton icon={<FiGithub />} variant="ghost" />
    </Box>
  );
};

export default Footer;
