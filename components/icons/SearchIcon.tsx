import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function SearchIcon(props: SvgIconProps) {
  return (
    <SvgIcon width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M38.3373 33.2717C42.7905 27.0231 42.2141 18.2922 36.6081 12.6863C30.3598 6.4379 20.2291 6.4379 13.9807 12.6863C7.73234 18.9347 7.73234 29.0653 13.9807 35.3137C19.5867 40.9196 28.3175 41.496 34.5661 37.0429L49.8075 52.2843L53.5787 48.513L38.3373 33.2717ZM32.8369 16.4575C37.0025 20.6231 37.0025 27.3769 32.8369 31.5425C28.6713 35.7081 21.9176 35.7081 17.752 31.5425C13.5864 27.3769 13.5864 20.6231 17.752 16.4575C21.9176 12.2919 28.6713 12.2919 32.8369 16.4575Z'
        fill='#C3CFD8'
      />
    </SvgIcon>
  );
}
