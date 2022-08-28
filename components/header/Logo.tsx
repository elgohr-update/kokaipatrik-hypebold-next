import React from 'react';

import HyperLogo from '@/assets/svg/logo.svg';

const Logo: React.FC = () => {
  return <img src={HyperLogo.src} alt="Hyper" title="Hyper" />;
}

export default Logo;
