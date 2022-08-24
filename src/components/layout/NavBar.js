import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FiGithub } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import { ColorModeSwitcher } from '../ColorModeSwitcher.js';
import { Logo } from '../Logo.js';
import { UserAuth } from '../../context/AuthContext.js';

const NavBar = () => {
  const [width, setWidth] = useState(window.screen.width);
  const toast = useToast();
  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  window.addEventListener('resize', () => {
    setWidth(window.screen.width);
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 5000,
      });
      navigate('/');
    } catch (e) {
      console.log(e.message);
      toast({
        title: 'Failed to logout',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Box py="10" px={['6', '24']} w="100%" h={130}>
        <Flex justify="center">
          <Logo h="12" pointerEvents="none" />
          <Text
            fontSize={['3xl', '4xl']}
            fontWeight="semibold"
            to="/"
            as={Link}
          >
            Babble
          </Text>
          <Spacer />
          <IconButton
            icon={<FiGithub />}
            variant="ghost"
            onClick={() =>
              window.open('https://github.com/jatin-goyal/babble', '_blank')
            }
          />
          <ColorModeSwitcher />

          <Box>
            {user ? (
              <Menu>
                {width < 768 ? (
                  <MenuButton as={IconButton} icon={<GiHamburgerMenu />} />
                ) : (
                  <MenuButton as={Button}>My Profile</MenuButton>
                )}
                {/*  currentuser check*/}

                <MenuList>
                  <MenuGroup>
                    <MenuItem as={Link} to="/write">
                      Write Article
                    </MenuItem>
                    <MenuItem as={Link} to="/my-articles">
                      My Articles
                    </MenuItem>
                  </MenuGroup>
                  {/* currentuser stuff */}
                  <MenuDivider />
                  <MenuGroup title={user?.email}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <Button as={Link} to="/login" colorScheme="red">
                Sign in
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
