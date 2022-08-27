import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { DeleteIcon, EditIcon, LockIcon, StarIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { UseDatabase } from '../../context/DbContext';

const ArticleCard = ({ article }) => {
  const [scale, setScale] = useState(1.0);
  const { showTags, deleteArticle, getArticle } = UseDatabase();

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

  let navigate = useNavigate();

  let randomColor = Math.floor(Math.random() * colorScheme.length);
  let date = new Date(article?.time).toString();

  const handleDelete = id => {
    // deleteArticle(id);
  };

  return (
    <Box
      minW={['82vw', '80vw', '42vw', '42vw', '30vw']}
      w={['75vw', '45vw', '30vw']}
      maxW={['100vw', '46vw', '30vw']}
      minH={['25vh', null, '25vh']}
      boxShadow="xl"
      px={6}
      pt={8}
      rounded="lg"
      mx={'4'}
      my={'4'}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      border={'4px'}
      borderColor={colorScheme[randomColor]}
      cursor={'pointer'}
      transform={`scale(${scale})`}
      transition={'all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s'}
      onMouseEnter={() => setScale(1.03)}
      onMouseLeave={() => setScale(1.0)}
      onClick={() => navigate(`/article/${article?.articleId}`)}
    >
      <Box textAlign={'start'} mb={4}>
        {showTags &&
          (article?.visibility === 'private' ? (
            <Badge
              variant="solid"
              fontSize={['sm', 'sm']}
              colorScheme="blue"
              mb="2"
            >
              Private {<LockIcon mb="1" ml="1" />}
            </Badge>
          ) : (
            <Badge
              variant="solid"
              fontSize={['sm', 'sm']}
              colorScheme="green"
              mb="2"
            >
              Public
            </Badge>
          ))}

        <Text fontSize={['xl', '2xl']}>{article?.context.title}</Text>
        <Text fontSize={['lg', 'xl']} opacity="0.8">
          {article?.context.subtitle}
        </Text>
      </Box>
      <Box>
        <Divider my={'2'} />
        <HStack justifyContent={'space-between'} mb={3}>
          <Text fontSize={['sm']}>{`${date.slice(4, 15)}`}</Text>
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
          <Text fontSize={['sm']}>{`@${
            article.autherName.length > 10
              ? article?.autherName.slice(0, 8) + '...'
              : article?.autherName
          }`}</Text>
        </HStack>
        {showTags && (
          <Box display="flex" justifyContent="space-between">
            <Button
              mb="4"
              mr="2"
              variant="outline"
              as={Link}
              rightIcon={<EditIcon />}
              colorScheme="blue"
              to={`/edit-article/${article?.articleId}`}
              onClick={e => {
                e.stopPropagation();
                getArticle(article?.articleId);
              }}
            >
              Edit
            </Button>

            <Button
              mb="4"
              rightIcon={<DeleteIcon />}
              colorScheme="red"
              variant="outline"
              onClick={e => {
                e.stopPropagation();
                handleDelete(article?.articleId);
              }}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ArticleCard;
