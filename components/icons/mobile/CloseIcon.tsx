import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon width='16' height='16' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M32 1.778L30.222 0L16 14.222L1.778 0L0 1.778L14.222 16L0 30.222L1.778 32L16 17.778L30.222 32L32 30.222L17.778 16L32 1.778Z'
        fill={props.fill || '#666970'}
      />
    </SvgIcon>
  );
}
