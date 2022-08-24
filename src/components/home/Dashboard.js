import React from 'react';
import { Box, Button, Divider, Image, Text } from '@chakra-ui/react';

import NavBar from '../layout/NavBar';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import RecentArticles from './RecentArticles';
import second_pic from '../../assets/second_pic.png';

const Dashboard = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        w={['90vw', null, null, '100vw']}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <NavBar />

        <Box px={['10', '5', '0', '36']}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={['column-reverse', null, 'row']}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              flexDirection="column"
              w={['80vw', null, '40vw']}
            >
              <Text fontSize={['4xl', '5xl']} mt={['6', null, 'none']}>
                A place to write, read, and connect
              </Text>
              <Text fontSize={['lg', '2xl']} mt="4" px="1">
                Babble freely on any topic and connect with millions of readers.
              </Text>

              <Button
                // as={Link}
                // to="/write"
                colorScheme="red"
                w={'100%'}
                py="8"
                mt="6"
                fontSize="xl"
              >
                Start babbling
              </Button>
            </Box>
            <Box
              px={['0', '10']}
              display="flex"
              justifyContent="center"
              alignItems="center"
              w={['80vw', null, '40vw']}
            >
              <Image src={second_pic} />
            </Box>
          </Box>
          <Divider my={['10', '16']} />
        </Box>

        <RecentArticles />
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
