import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { UseDatabase } from '../../context/DbContext';
import MasonryLayout from '../layout/MasonryLayout';
import Loading from '../layout/Loading';

const RecentArticles = () => {
  const { getPublicArticles, articlesList, loading } = UseDatabase();

  useEffect(() => {
    try {
      getPublicArticles();
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          w={'100%'}
          display="flex"
          flexDirection={['column', 'row']}
          flexWrap={['wrap']}
          justifyContent={['center']}
        >
          <MasonryLayout articlesList={articlesList} />
        </Box>
      )}
    </>
  );
};

export default RecentArticles;
