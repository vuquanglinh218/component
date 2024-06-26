import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function StoreIcon(props: SvgIconProps) {
  return (
    <SvgIcon width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M15.0422 16.7083V23H12.3341V17.0833C12.3341 16.8992 12.1848 16.75 12.0008 16.75C11.8167 16.75 11.6675 16.8992 11.6675 17.0833V23H8.95934V16.7083C8.95934 16.1569 9.40789 15.7083 9.95927 15.7083H14.0423C14.5937 15.7083 15.0422 16.1569 15.0422 16.7083ZM20.5416 13.5637C19.3859 14.0371 18.0366 13.8454 17.0511 13.0136C16.925 12.9072 16.7427 12.907 16.6167 13.0135C15.3476 14.0852 13.4886 14.0857 12.219 13.0144C12.0924 12.9076 11.9092 12.9076 11.7826 13.0144C10.5124 14.0861 8.65237 14.0849 7.38422 13.013C7.2581 12.9064 7.0757 12.9066 6.94954 13.0131C5.96366 13.8457 4.61435 14.0374 3.46035 13.5637C3.24141 13.4739 3.00151 13.6355 3.00151 13.8722V21.3333C3.00151 22.2538 3.74766 23 4.66805 23H8.29277V16.7083C8.29277 15.7893 9.04038 15.0417 9.95931 15.0417H14.0423C14.9613 15.0417 15.7089 15.7893 15.7089 16.7083V23H19.3336C20.254 23 21.0001 22.2538 21.0001 21.3333V13.8723C21.0001 13.6358 20.7604 13.4741 20.5416 13.5637ZM4.50136 8.66666C4.30991 8.66666 4.15622 8.50528 4.16876 8.31116C4.18021 8.13399 4.33524 7.99999 4.51277 7.99999H21.3778C21.6177 7.99999 21.779 7.75424 21.6836 7.53412L19.806 3.20083C19.7531 3.07875 19.6331 3 19.5002 3H4.50136C4.36845 3 4.24846 3.07875 4.19555 3.20083L2.02905 8.20082C2.02544 8.20903 2.02226 8.21532 2.01947 8.22177C1.99219 8.28476 2.00155 8.36361 2.00155 10.4012C2.00405 11.9175 3.2377 13.1508 4.75134 13.1508C5.69668 13.1508 6.5327 12.6699 7.02774 11.9394C7.09499 11.8401 7.23894 11.8401 7.30618 11.9394C8.40072 13.5553 10.7685 13.5517 11.8617 11.9406C11.9289 11.8415 12.0727 11.8415 12.1399 11.9406C13.234 13.553 15.6 13.5538 16.6946 11.9406C16.7609 11.8429 16.9045 11.8394 16.9706 11.9372C17.4715 12.6778 18.3236 13.1628 19.2858 13.1506C20.7975 13.1314 22 11.8706 22 10.3586V8.99995C22 8.81586 21.8508 8.66661 21.6667 8.66661H4.50136V8.66666Z'
        fill={props.fill || '#A3A8AF'}
      />
    </SvgIcon>
  );
}
