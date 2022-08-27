import { StarIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseDatabase } from '../../context/DbContext';

import Navbar from '../layout/NavBar';
import Comments from './Comments';

const ViewArticle = () => {
  const { getArticle, article } = UseDatabase();
  const { articleId } = useParams();

  useEffect(() => {
    getArticle(articleId);
  }, []);

  let date = new Date(article[0]?.time).toString();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
    >
      <Navbar />
      <Box
        w={['100vw', null, null, '80vw']}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Box px={['6', '10']} mt="2">
          <Text fontSize={['4xl', '5xl']}>{article[0]?.context.title}</Text>
          <Text fontSize={['xl', '2xl']} opacity="0.8">
            {article[0]?.context.subtitle}
          </Text>
          <HStack mt="6" justifyContent={'space-between'}>
            <HStack>
              <Text
                color="blue.500"
                fontSize={['lg', 'xl']}
                mr="4"
              >{`@${article[0]?.autherName}`}</Text>
              <Text opacity="0.5" fontSize={['lg', 'xl']}>{`${date?.slice(
                4,
                15
              )}`}</Text>
            </HStack>
            <HStack mt={[2, null, 0]}>
              <Text
                fontWeight="semibold"
                color="yellow.500"
                fontSize={['lg', 'xl']}
              >
                {article[0]?.stars}
              </Text>
              <StarIcon color="yellow.500" fontSize={['lg', 'xl']} mx="2" />
            </HStack>
          </HStack>
          <Divider my="6" />
          <Text fontSize={['lg', 'xl']} style={{ whiteSpace: 'pre-wrap' }}>
            {article[0]?.context.content}
          </Text>
          <Divider my="6" />
          <HStack>
            <Button
              rightIcon={<StarIcon />}
              colorScheme="yellow"
              variant="solid"
              mr="2"
            >
              Give a star
            </Button>
            <Button rightIcon={<LinkIcon />} colorScheme="blue">
              Share
            </Button>
          </HStack>
          {/* <Comments /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewArticle;
