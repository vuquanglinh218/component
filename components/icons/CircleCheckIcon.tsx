import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
export default function CircleCheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.33325 32C5.33325 17.28 17.2799 5.33334 31.9999 5.33334C46.7199 5.33334 58.6666 17.28 58.6666 32C58.6666 46.72 46.7199 58.6667 31.9999 58.6667C17.2799 58.6667 5.33325 46.72 5.33325 32ZM26.6666 37.7867L44.2399 20.2134L47.9999 24.0001L26.6666 45.3334L15.9999 34.6667L19.7599 30.9067L26.6666 37.7867Z'
        fill={props.fill || '#0FD186'}
      />
    </SvgIcon>
  );
}
