import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

import { ColorModeSwitcher } from '../ColorModeSwitcher.js';
import { Logo } from '../Logo.js';

const NavBar = () => {
  const [width, setWidth] = useState(window.screen.width);
  const toast = useToast();
  // const navigate = useNavigate();

  window.addEventListener('resize', () => {
    setWidth(window.screen.width);
  });

  return (
    <>
      <Box py="10" px={['6', '10']} w="100%" h={130}>
        <Flex justify="center">
          <Logo h="12" pointerEvents="none" />
          <Text fontSize={['3xl', '4xl']} fontWeight="semibold" to="/">
            Babble
          </Text>
          <Spacer />
          <IconButton icon={<FiGithub />} variant="ghost" />
          <ColorModeSwitcher />

          <Box>
            <Menu>
              {width < 768 ? (
                <MenuButton as={IconButton} icon={<GiHamburgerMenu />} />
              ) : (
                <MenuButton as={Button}>My Profile</MenuButton>
              )}
              {/*  currentuser check*/}

              <MenuList>
                <MenuGroup>
                  <MenuItem>Write Article</MenuItem>
                  <MenuItem>My Articles</MenuItem>
                </MenuGroup>
                {/* currentuser stuff */}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
