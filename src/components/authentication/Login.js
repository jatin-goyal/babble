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
import { UserAuth } from '../../context/AuthContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { login } = UserAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      toast({
        title: 'Logged in successfully',
        status: 'success',
        duration: 5000,
      });
      navigate('/');
    } catch (e) {
      console.log(e.message);
      toast({
        title: e.message,
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
        flexDirection="column"
      >
        <Box w="80%" boxShadow="lg" px={6} py={8} rounded="lg">
          <Text fontSize="2xl" fontWeight="semibold" mb={4}>
            Log In
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

          <Button
            w="100%"
            mt={4}
            py={6}
            colorScheme="red"
            onClick={handleLogin}
            isLoading={loading}
          >
            Log in
          </Button>
          {/* <Text mt={8} fontWeight="normal" fontSize="lg">
            <Link to="/forgotpassword" style={{ color: '#028ddd' }}>
              Forgot password ?
            </Link>
          </Text> */}
        </Box>
        <Text mt={4} fontWeight="normal" fontSize="lg">
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#fd4f05' }}>
            Sign up
          </Link>
        </Text>
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

export default Login;
