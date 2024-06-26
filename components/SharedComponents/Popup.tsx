import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  IconButton,
  DialogTitle as MuiDialogTitle,
  Theme,
  Typography,
  WithStyles,
  createStyles,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import MenuClose from 'components/icons/MenuClose';
import { ReactNode } from 'react';

const useDialogTitleStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }),
);

const usePopupStyles = makeStyles((them: Theme) =>
  createStyles({
    root: {},
    btnClose: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    contentRoot: {
      '&:first-child': {
        paddingTop: 32,
      },
      minWidth: 500,
      minHeight: 420,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    },
  }),
);

export interface PopupProps extends Omit<DialogProps, 'onClose'> {
  onClose: () => void;
  title?: string;
  hiddenTitle?: boolean;
  hiddenAction?: boolean;
  hiddenBtnClose?: boolean;
  actionElement?: ReactNode;
  dialogContentProps?: DialogContentProps;
}

interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...otherProps } = props;
  const classes = useDialogTitleStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...otherProps}>
      <Typography variant='subtitle1'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <MenuClose />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

function Popup(props: PopupProps) {
  const {
    onClose,
    title,
    hiddenTitle,
    hiddenAction,
    hiddenBtnClose,
    actionElement,
    children,
    dialogContentProps,
    ...otherProps
  } = props;

  const classes = usePopupStyles();

  return (
    <Dialog onClose={onClose} aria-labelledby='customized-dialog-title' disableBackdropClick {...otherProps}>
      {!hiddenTitle && (
        <DialogTitle id='customized-dialog-title' onClose={onClose}>
          {title}
        </DialogTitle>
      )}

      <DialogContent dividers classes={{ root: classes.contentRoot }} {...dialogContentProps}>
        {hiddenTitle && !hiddenBtnClose && (
          <IconButton onClick={onClose} classes={{ root: classes.btnClose }}>
            <MenuClose />
          </IconButton>
        )}
        {children}
      </DialogContent>

      {!hiddenAction && <DialogActions>{actionElement}</DialogActions>}
    </Dialog>
  );
}
export default Popup;
