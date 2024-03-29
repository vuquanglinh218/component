import { Chip as MuiChip, ChipProps as MuiChipProps, Theme, makeStyles } from '@material-ui/core';

export interface TagProps extends MuiChipProps {
  status: 'expired' | 'about-to-expire' | 'canceled' | 'completed';
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: (props: TagProps) => {
      switch (props.status) {
        case 'expired':
          return '#F3F4F5';
        case 'about-to-expire':
          return '#FFFBF2';
        case 'canceled':
          return '#FFF6F6';
        case 'completed':
          return 'green';
        default:
          return 'purple';
      }
    },
    borderColor: (props: TagProps) => {
      switch (props.status) {
        case 'expired':
          return '#747C87';
        case 'about-to-expire':
          return '#FFDF9B';
        case 'canceled':
          return '#FFB8B8';
        case 'completed':
          return 'green';
        default:
          return 'purple';
      }
    },
    color: (props: TagProps) => {
      switch (props.status) {
        case 'expired':
          return '#747C87';
        case 'about-to-expire':
          return '#E49C06';
        case 'canceled':
          return '#EE4747';
        case 'completed':
          return 'green';
        default:
          return 'purple';
      }
    },
  },
}));

function Tag(props: TagProps) {
  const handleRenderTitle = (status: string) => {
    switch (status) {
      case 'expired':
        return 'Hết hạn';
      case 'about-to-expire':
        return 'Sắp hết hạn';
      case 'canceled':
        return 'Đã huỷ';
      case 'completed':
        return 'Hoàn thành';
      default:
        return 'Hoàn thành';
    }
  };
  const { status, ...otherProps } = props;
  const classes = useStyles(props);
  return <MuiChip label={handleRenderTitle(status)} classes={{ root: classes.root }} {...otherProps} />;
}

export default Tag;
