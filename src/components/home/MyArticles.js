import { Box, Divider, Select, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UseDatabase } from '../../context/DbContext';
import MasonryLayout from '../layout/MasonryLayout';
import NavBar from '../layout/NavBar';

const MyArticles = () => {
  const { userArticles, getUserArticles, setShowTags } = UseDatabase();
  const [status, setStatus] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState();

  const filterHandler = () => {
    switch (status) {
      case 'all':
        setFilteredArticles(userArticles);
        break;
      case 'public':
        setFilteredArticles(
          userArticles.filter(article => article.visibility == 'public')
        );
        break;
      case 'private':
        setFilteredArticles(
          userArticles.filter(article => article.visibility == 'private')
        );
        break;
    }
  };
  setShowTags(true);

  useEffect(() => {
    getUserArticles();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [status, userArticles]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        w={['100vw', null, null, '100vw']}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <NavBar />
        <Box px={['6', '10']}>
          <Text fontSize={['2xl', '3xl']} px={['5']}>
            Articles you have written
          </Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={['5']}
            mb={['4']}
          >
            <Spacer />
            <Select
              w={['100%', null, '320px']}
              mt="6"
              onChange={e => setStatus(e.target.value)}
              value={status}
            >
              <option value="all">All articles</option>
              <option value="public">Public articles</option>
              <option value="private">Private articles</option>
            </Select>
          </Box>
          <Divider mb={'2'} />
          {userArticles && <MasonryLayout articlesList={filteredArticles} />}
        </Box>
      </Box>
    </Box>
  );
};

export default MyArticles;
