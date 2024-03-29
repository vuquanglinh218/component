import { SvgIcon, SvgIconProps } from '@material-ui/core';

function BasicDone(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 18 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M2.32143 5.50001L7.82143 11L6.25 12.5714L0.75 7.07144L2.32143 5.50001Z' fill='#0FD186' />
      <path d='M6.25 9.42857L15.6786 0L17.25 1.57143L7.82143 11L6.25 9.42857Z' fill='#0FD186' />
    </SvgIcon>
  );
}

export default BasicDone;
