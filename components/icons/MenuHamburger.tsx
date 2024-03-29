import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function MenuHamburger(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M3 8V6H21V8H3Z' fill='#A3A8AF' />
        <path d='M3 13H21V11H3V13Z' fill='#A3A8AF' />
        <path d='M3 18H21V16H3V18Z' fill='#A3A8AF' />
      </svg>
    </SvgIcon>
  );
}
