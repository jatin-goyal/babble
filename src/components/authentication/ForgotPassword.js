import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);

  const { resetPassword } = UserAuth();

  const handlePasswordChange = async e => {
    e.preventDefault();

    try {
      await resetPassword(emailRef.current.value);
    } catch (err) {
      console.log(err.message);
    }
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
            Forgot Password
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

          <Button
            w="100%"
            mt={4}
            py={6}
            colorScheme="red"
            onClick={handlePasswordChange}
            isLoading={loading}
          >
            Reset password
          </Button>
        </Box>
        <Text mt={8} fontWeight="normal" fontSize="lg">
          Remember now ?{' '}
          <Link to="/forgotpassword" style={{ color: '#028ddd' }}>
            Login
          </Link>
        </Text>
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

export default ForgotPassword;
