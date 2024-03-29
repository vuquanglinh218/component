import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function LogoutIcon(props: SvgIconProps) {
  return (
    <SvgIcon width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M12 17L17 13L12 9V12H3V14H12V17Z' fill='#A3A8AF' />
      <path
        d='M19 4H10C8.897 4 8 4.897 8 6V10H10V6H19V20H10V16H8V20C8 21.103 8.897 22 10 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4Z'
        fill='#A3A8AF'
      />
    </SvgIcon>
  );
}
