import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext.js';

import { ColorModeSwitcher } from '../ColorModeSwitcher.js';
import { Logo } from '../Logo.js';

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { signup } = UserAuth();

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    // setLoading(true);

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 5000,
      });
      return;
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      toast({
        title: 'Account successfully created',
        status: 'success',
        duration: 5000,
      });

      navigate('/');
    } catch (err) {
      console.log(err);

      toast({
        title: err.message,
        status: 'error',
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <Box h="100vh" display="flex" justifyContent="center">
      <div
        style={{
          position: 'fixed',
          left: '14%',
          top: '15px',
          display: 'flex',
        }}
      >
        <Logo h="12" pointerEvents="none" />
        <Text fontSize={['3xl', '4xl']} fontWeight="semibold" to="/" as={Link}>
          Babble
        </Text>
      </div>

      <Box
        w={['100%', null, null, '50%']}
        maxW="700px"
        minW="200px"
        textAlign="center"
        h="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="80%" boxShadow="lg" px={6} py={8} rounded="lg">
          <Text fontSize="2xl" fontWeight="semibold" mb={4}>
            Sign up
          </Text>
          <FormControl id="email" mt={4} isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              ref={emailRef}
              type="email"
              variant="filled"
              autoComplete="off"
            />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input ref={passwordRef} type="password" variant="filled" />
          </FormControl>
          <FormControl id="confirmPassword" mt={4} isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input ref={confirmPasswordRef} type="password" variant="filled" />
          </FormControl>
          <Button
            w="100%"
            mt={4}
            py={6}
            colorScheme="red"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Sign up now!
          </Button>
          <Text mt={8} fontWeight="normal" fontSize="lg">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#fd4f05' }}>
              Login
            </Link>
          </Text>
        </Box>
      </Box>

      <Box
        w={['0vw', null, null, '70vw']}
        h="100%"
        bgGradient="linear(to-br, red.700, red.400)"
        boxShadow="2xl"
      ></Box>
      <ColorModeSwitcher
        style={{ position: 'fixed', right: '15px', bottom: '15px' }}
      />
    </Box>
  );
};

export default Signup;
