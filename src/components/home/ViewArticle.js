import { StarIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, HStack, Text, useToast } from '@chakra-ui/react';

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseDatabase } from '../../context/DbContext';

import Navbar from '../layout/NavBar';
import Comments from './Comments';
import Loading from '../layout/Loading';

const ViewArticle = () => {
  const { getArticle, article, updateArticle, loading } = UseDatabase();
  const { documentId } = useParams();

  useEffect(() => {
    getArticle(documentId);
  }, []);

  const toast = useToast();

  const updateStar = async documentId => {
    await updateArticle(documentId, {
      stars: article?.stars + 1,
    });

    getArticle(documentId);

    toast({
      title: 'Glad you like it :)',
      status: 'success',
      duration: 3000,
    });
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Article link copied to clipboard',
      status: 'success',
      duration: 3000,
    });
  };

  let date = new Date(article?.time).toString();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
    >
      <Navbar />

      {loading ? (
        <Loading />
      ) : (
        <Box
          w={['100vw', null, null, '65vw']}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box px={['6', '10']} mt="2">
            <Text fontSize={['4xl', '5xl']}>{article?.context?.title}</Text>
            <Text fontSize={['xl', '2xl']} opacity="0.8">
              {article?.context?.subtitle}
            </Text>
            <HStack mt="6" justifyContent={'space-between'}>
              <HStack>
                <Text
                  color="blue.500"
                  fontSize={['lg', 'xl']}
                  mr="4"
                >{`@${article?.autherName}`}</Text>
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
                  {article?.stars}
                </Text>
                <StarIcon color="yellow.500" fontSize={['lg', 'xl']} mx="2" />
              </HStack>
            </HStack>
            <Divider my="6" />
            <Text fontSize={['lg', 'xl']} style={{ whiteSpace: 'pre-wrap' }}>
              {article?.context?.content}
            </Text>
            <Divider my="6" />
            <HStack>
              <Button
                rightIcon={<StarIcon />}
                colorScheme="yellow"
                variant="solid"
                mr="2"
                onClick={() => updateStar(documentId)}
              >
                Give a star
              </Button>
              <Button
                rightIcon={<LinkIcon />}
                colorScheme="blue"
                onClick={handleShareArticle}
              >
                Share
              </Button>
            </HStack>
            <Comments />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ViewArticle;
