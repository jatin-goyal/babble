import {
  Box,
  Button,
  Divider,
  HStack,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { UseDatabase } from '../../context/DbContext';
import NavBar from '../layout/NavBar';
import { v4 as uuidV4 } from 'uuid';

const WriteArticle = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('public');

  const { user } = UserAuth();
  const { publishArticle } = UseDatabase();
  const toast = useToast();
  const navigate = useNavigate();

  const handlePublish = async e => {
    if (!title || !subtitle || !content) {
      toast({
        title: 'Fill all the fields',
        status: 'error',
        timeout: 3000,
      });

      return;
    }

    if (title.length > 100 || subtitle.length > 100) {
      if (title.length > 100) {
        toast({
          title: 'Limit exceeded: Write title under 100 characters',
          status: 'error',
          timeout: 3000,
        });
      }
      if (subtitle.length > 100) {
        toast({
          title: 'Limit exceeded: Write subtitle under 100 characters',
          status: 'error',
          timeout: 3000,
        });
      }
      return;
    }
    try {
      await publishArticle({
        context: {
          title,
          subtitle,
          content,
        },
        visibility,
        time: Date.now(),
        stars: 0,
        autherName: user.email.split('@')[0],
        autherEmail: user.email,
        autherId: user.uid,
        articleId: uuidV4(),
      });
      toast({
        title: 'Article published',
        status: 'success',
        timeout: 3000,
      });

      navigate('/');
    } catch (err) {
      console.log(err.message);
      toast({
        title: err.message,
        status: 'error',
        timeout: 3000,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        w={['100vw', null, null, '70vw']}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <NavBar />
        <Box px={['6', '10']}>
          <Text fontSize={['2xl', '3xl']} textAlign="center">
            Write your article freely
          </Text>
          <Text fontSize={['sm', 'md']} textAlign="center">
            writing as {`@${user.email.split('@')[0]}`}
          </Text>
          <Textarea
            variant="unstyled"
            placeholder="Title"
            fontSize={['4xl', '5xl']}
            mt="10"
            resize="vertical"
            rows={1}
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            variant="unstyled"
            placeholder="Subtitle"
            fontSize={['xl', '2xl']}
            resize="vertical"
            rows={1}
            onChange={e => setSubtitle(e.target.value)}
          />
          <Divider />
          <Textarea
            placeholder="Write your thoughts here"
            variant="unstyled"
            fontSize={['md', 'lg']}
            resize="vertical"
            onChange={e => setContent(e.target.value)}
            rows={8}
          />
          <Divider />

          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              flexDirection={['column', null, 'row']}
              justifyContent="flex-start"
              alignItems={[null, null, 'center']}
            >
              <Text fontSize={['xl', '2xl']} mr="4" mb={[2, 2, 0]}>
                Choose your article's visibility
              </Text>
              <RadioGroup
                onChange={setVisibility}
                defaultValue="public"
                mb={[2, 2, 0]}
              >
                <HStack>
                  <Radio mr="2" size="lg" value="public">
                    Public
                  </Radio>
                  <Radio size="lg" value="private">
                    Private
                  </Radio>
                </HStack>
              </RadioGroup>
            </Box>
            <Text fontSize={['sm', 'md']} opacity="0.4" mb="2">
              {visibility === 'private'
                ? 'Your article will not be shared with the community and will be visible only to you. You can change it later anytime.'
                : 'Your article will be shared with the community and anyone could read it. You can change it later anytime.'}
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={['column-reverse', null, 'row']}
            my="6"
          >
            <Button
              fontSize={['md', 'lg']}
              py={8}
              w={['100%', null, '50%']}
              mr={['0', '0', '4']}
              mt={['4', '0']}
              as={Link}
              to="/"
            >
              Discard
            </Button>
            <Button
              fontSize={['md', 'lg']}
              py={8}
              w={['100%', null, '50%']}
              colorScheme="red"
              onClick={() => handlePublish()}
            >
              Publish {visibility === 'private' ? 'privately' : 'publicly'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WriteArticle;
