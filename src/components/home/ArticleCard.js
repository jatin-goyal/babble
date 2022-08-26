import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { StarIcon } from '@chakra-ui/icons';

const ArticleCard = ({ article }) => {
  let colorScheme = [
    '#E2E8F0',
    '#CBD5E0',
    '#FED7D7',
    '#FEB2B2',
    '#FEEBC8',
    '#FBD38D',
    '#FEFCBF',
    '#FAF089',
    '#C6F6D5',
    '#B2F5EA',
    '#BEE3F8',
    '#9DECF9',
    '#C4F1F9',
    '#FBB6CE',
  ];

  let randomColor = Math.floor(Math.random() * colorScheme.length);
  let date = new Date(article?.time).toString();

  return (
    <Box
      minW={['85vw', '45vw', '30vw']}
      w={['75vw', '45vw', '30vw']}
      maxW={['100vw', '46vw', '30vw']}
      minH={['25vh', null, '25vh']}
      boxShadow="xl"
      px={6}
      py={8}
      rounded="lg"
      mx={'4'}
      my={'4'}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      border={'4px'}
      borderColor={colorScheme[randomColor]}
    >
      <Box textAlign={'start'} mb={4}>
        <Text fontSize={['xl', '2xl']}>{article?.context.title}</Text>
        <Text fontSize={['lg', 'xl']} opacity="0.8">
          {article?.context.subtitle}
        </Text>
      </Box>
      <Box>
        <Divider my={'2'} />
        <HStack justifyContent={'space-between'}>
          <Text>{`${date.slice(4, 15)}`}</Text>
          <HStack>
            <Text
              fontWeight="semibold"
              color="yellow.500"
              fontSize={['md', 'lg']}
            >
              {article?.stars}
            </Text>
            <StarIcon color="yellow.500" fontSize={['md', 'lg']} />
          </HStack>
          <Text>{`@${
            article.autherName.length > 10
              ? article?.autherName.slice(0, 8) + '...'
              : article?.autherName
          }`}</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default ArticleCard;
