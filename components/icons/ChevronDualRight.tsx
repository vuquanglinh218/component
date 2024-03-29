import { SvgIcon, SvgIconProps } from '@material-ui/core';

export default function ChevronDualRight(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='-6 -6 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.8492 6.01041L6.83883 12.0208L5.42462 10.6066L10.0208 6.01041L5.42462 1.41421L6.83884 4.74235e-07L12.8492 6.01041Z'
        fill='#0088FF'
      />
      <path
        d='M7.42462 6.01041L1.41421 12.0208L0 10.6066L4.59619 6.01041L1.7573e-06 1.41421L1.41422 0L7.42462 6.01041Z'
        fill='#0088FF'
      />
    </SvgIcon>
  );
}
