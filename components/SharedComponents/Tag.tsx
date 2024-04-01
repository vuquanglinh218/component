import { Chip as MuiChip, ChipProps as MuiChipProps, Theme, createStyles, makeStyles } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

export enum TagType {
  expired = 'EXPIRED',
  aboutToExpire = 'ABOUT-TO-EXPIRE',
  canceled = 'CANCELED',
  completed = 'COMPLETED',
  unknown = 'UNKNOWN',
}

export interface TagProps extends MuiChipProps {
  status: TagType;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: (props: TagProps) => {
        switch (props.status) {
          case TagType.expired:
            return '#F3F4F5';
          case TagType.aboutToExpire:
            return '#FFFBF2';
          case TagType.canceled:
            return '#FFF6F6';
          case TagType.completed:
            return '#F3F4F5';
          default:
            return '#F3F4F5';
        }
      },
      borderColor: (props: TagProps) => {
        switch (props.status) {
          case TagType.expired:
            return '#747C87';
          case TagType.aboutToExpire:
            return '#FFDF9B';
          case TagType.canceled:
            return '#FFB8B8';
          case TagType.completed:
            return '#747C87';
          default:
            return '#747C87';
        }
      },
      color: (props: TagProps) => {
        switch (props.status) {
          case TagType.expired:
            return '#747C87';
          case TagType.aboutToExpire:
            return '#E49C06';
          case TagType.canceled:
            return '#EE4747';
          case TagType.completed:
            return '#747C87';
          default:
            return '#747C87';
        }
      },
    },
  }),
);

function Tag(props: TagProps) {
  const { t } = useTranslation('common');
  const handleRenderTitle = (status: TagType) => {
    switch (status) {
      case TagType.expired:
        return t('status.expired');
      case TagType.aboutToExpire:
        return t('status.aboutToExpire');
      case TagType.canceled:
        return t('status.canceled');
      case TagType.completed:
        return t('status.completed');
      default:
        return t('status.unknown');
    }
  };
  const { status, ...otherProps } = props;
  const classes = useStyles(props);
  return <MuiChip label={handleRenderTitle(status)} classes={{ root: classes.root }} {...otherProps} />;
}

export default Tag;
