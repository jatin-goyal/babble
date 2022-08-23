import React from 'react';
import { Box } from '@chakra-ui/react';

import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';
import RecentArticles from './RecentArticles';

const Dashboard = () => {
  return (
    <Box>
      <Box>
        <NavBar />
        {/* dashboard */}

        <RecentArticles />
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
