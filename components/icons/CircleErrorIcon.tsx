import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
export default function CircleErrorIcon(props: SvgIconProps) {
  return (
    <SvgIcon width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M32 5.33334C17.28 5.33334 5.33337 17.28 5.33337 32C5.33337 46.72 17.28 58.6667 32 58.6667C46.72 58.6667 58.6667 46.72 58.6667 32C58.6667 17.28 46.72 5.33334 32 5.33334ZM29.3334 45.3333V40H34.6667V45.3333H29.3334ZM29.3334 18.6667V34.6667H34.6667V18.6667H29.3334Z'
        fill='#FF4D4D'
      />
    </SvgIcon>
  );
}
