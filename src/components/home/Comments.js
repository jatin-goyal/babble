import {
  Box,
  Divider,
  IconButton,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { UseDatabase } from '../../context/DbContext';
import Comment from './Comment';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Comments = () => {
  const [comment, setComment] = useState('');
  const [articleComments, setArticleComments] = useState([]);
  const { article, postComment, comments, getComments } = UseDatabase();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const toast = useToast();

  const handlePostComment = async () => {
    const data = {
      articleId: article.articleId,
      authorId: user?.uid,
      authorEmail: user?.email,
      authorUsername: user?.email.split('@')[0],
      comment: comment,
      time: Date.now(),
    };
    if (!comment) {
      toast({
        title: "Can't post empty comment",
        status: 'error',
        duration: 3000,
      });

      return;
    }

    if (user?.uid === undefined || user?.uid === null) {
      toast({
        title: 'Sign In First',
        status: 'error',
        duration: 5000,
      });

      navigate('/signup');

      return;
    }
    await postComment(data);

    setComment('');
    getComments();

    toast({
      title: 'Comment posted',
      status: 'success',
      duration: 5000,
    });
  };

  useEffect(() => {
    setArticleComments(
      comments.filter(comment => comment.articleId === article.articleId)
    );
  }, [article, comments]);

  return (
    <Box mt={12}>
      <Text fontSize={['2xl', '3xl']}>Comments</Text>

      <Box display={'flex'} my={5} mb={6}>
        <Box display={'flex'} w={['90%', '100%']}>
          <Input
            variant="unstyled"
            placeholder="Write your comment here"
            fontSize={['xl', '2xl']}
            onChange={e => setComment(e.target.value)}
            value={comment}
          />
          <IconButton icon={<AddIcon />} ml={2} onClick={handlePostComment} />
        </Box>
      </Box>
      <Divider mb={8} />
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        {articleComments &&
          articleComments.map(comment => (
            <Comment comment={comment} key={comment.commentId} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
