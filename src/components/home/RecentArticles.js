import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UseDatabase } from '../../context/DbContext';
import MasonryLayout from '../layout/MasonryLayout';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import Loading from '../layout/Loading';

const RecentArticles = () => {
  const [loading, setLoading] = useState(false);
  const { getPublicArticles, articlesList } = UseDatabase();

  useEffect(() => {
    try {
      setLoading(true);
      getPublicArticles();
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  }, []);

  return (
    <Box
      w={'100%'}
      display="flex"
      flexDirection={['column', 'row']}
      flexWrap={['wrap']}
      justifyContent={['center']}
    >
      <MasonryLayout articlesList={articlesList} />
    </Box>
  );
};

export default RecentArticles;
