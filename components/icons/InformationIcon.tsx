import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function InformationIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM11 11V5H9V11H11ZM11 15V13H9V15H11ZM2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2C5.58 2 2 5.58 2 10Z'
          fill='white'
        />
      </svg>
    </SvgIcon>
  );
}
