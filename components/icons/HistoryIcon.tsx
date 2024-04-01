import { SvgIcon, SvgIconProps } from '@material-ui/core';

function HistoryIcon(props: SvgIconProps) {
  return (
    <SvgIcon width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12 8V11.586L13.707 13.293C13.8025 13.3852 13.8787 13.4956 13.9311 13.6176C13.9835 13.7396 14.0111 13.8708 14.0123 14.0036C14.0134 14.1364 13.9881 14.2681 13.9378 14.391C13.8876 14.5139 13.8133 14.6255 13.7194 14.7194C13.6255 14.8133 13.5139 14.8875 13.391 14.9378C13.2681 14.9881 13.1364 15.0134 13.0036 15.0123C12.8708 15.0111 12.7396 14.9835 12.6176 14.9311C12.4956 14.8787 12.3853 14.8025 12.293 14.707L10.293 12.707C10.1055 12.5195 10.0001 12.2652 10 12V8C10 7.73478 10.1054 7.48043 10.2929 7.29289C10.4804 7.10536 10.7348 7 11 7C11.2652 7 11.5196 7.10536 11.7071 7.29289C11.8947 7.48043 12 7.73478 12 8ZM11.026 2C9.71964 2.00165 8.42647 2.26133 7.22074 2.76415C6.01502 3.26696 4.92049 4.003 4.00001 4.93V3C4.00001 2.73478 3.89466 2.48043 3.70712 2.29289C3.51958 2.10536 3.26523 2 3.00001 2C2.7348 2 2.48044 2.10536 2.29291 2.29289C2.10537 2.48043 2.00001 2.73478 2.00001 3V7C2.00001 7.26522 2.10537 7.51957 2.29291 7.70711C2.48044 7.89464 2.7348 8 3.00001 8H7.00001C7.26523 8 7.51958 7.89464 7.70712 7.70711C7.89466 7.51957 8.00001 7.26522 8.00001 7C8.00001 6.73478 7.89466 6.48043 7.70712 6.29289C7.51958 6.10536 7.26523 6 7.00001 6H5.76101C6.73256 5.15118 7.89529 4.55037 9.14972 4.24898C10.4041 3.94759 11.7129 3.9546 12.964 4.26941C14.2151 4.58422 15.3714 5.19745 16.3338 6.05663C17.2962 6.91581 18.0361 7.99536 18.4902 9.20292C18.9444 10.4105 19.0992 11.7101 18.9414 12.9905C18.7837 14.2709 18.318 15.4941 17.5844 16.5553C16.8508 17.6165 15.8709 18.4842 14.7288 19.0841C13.5866 19.684 12.3161 19.9983 11.026 20C9.54063 20.0062 8.08371 19.5927 6.82301 18.8072C5.5623 18.0217 4.54908 16.8961 3.90001 15.56C3.84579 15.4365 3.76714 15.3252 3.6688 15.2329C3.57045 15.1406 3.45445 15.0691 3.32777 15.0228C3.20108 14.9765 3.06634 14.9563 2.93164 14.9634C2.79695 14.9705 2.66508 15.0048 2.54398 15.0642C2.42288 15.1236 2.31505 15.2069 2.22698 15.3091C2.1389 15.4112 2.07241 15.5301 2.03149 15.6587C1.99058 15.7872 1.97609 15.9227 1.98889 16.0569C2.0017 16.1912 2.04154 16.3215 2.10601 16.44C2.91786 18.1131 4.18595 19.5227 5.76414 20.5065C7.34233 21.4902 9.16636 22.0079 11.026 22C13.6782 22 16.2217 20.9464 18.0971 19.0711C19.9724 17.1957 21.026 14.6522 21.026 12C21.026 9.34784 19.9724 6.8043 18.0971 4.92893C16.2217 3.05357 13.6782 2 11.026 2Z'
        fill={props.fill || '#A3A8AF'}
      />
    </SvgIcon>
  );
}

export default HistoryIcon;
