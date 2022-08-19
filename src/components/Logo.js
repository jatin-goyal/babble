import React from 'react';
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import logoB from '../assets/logoB.jpg';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(1360deg); }
`;

export const Logo = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return (
    <Image
      animation={animation}
      src={logoB}
      {...props}
      style={{ borderRadius: '50%' }}
    />
  );
};
