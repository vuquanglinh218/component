import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function EditIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      width={props.width || '16'}
      height={props.height || '16'}
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M28.3955 1.91757L31.196 4.78749C32.4754 6.09887 32.4585 8.21561 31.1584 9.50631L30.0445 10.612L22.6032 2.98602L23.7171 1.8803C25.0203 0.586554 27.1129 0.603038 28.3955 1.91757Z'
        fill={props.fill || '#0088FF'}
      />
      <path
        d='M9.03182 30.859L1.87086 32.1376C1.57491 32.1904 1.27212 32.093 1.0613 31.8769C0.850245 31.6606 0.758682 31.3536 0.81575 31.0563L2.19732 23.8549L9.03182 30.859Z'
        fill={props.fill || '#0088FF'}
      />
      <path
        d='M28.7442 11.9046L10.6371 29.8793L3.19584 22.2533L21.3029 4.27859L28.7442 11.9046Z'
        fill={props.fill || '#0088FF'}
      />
    </SvgIcon>
  );
}
