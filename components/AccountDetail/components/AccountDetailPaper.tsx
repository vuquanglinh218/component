import React from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { WithStyles } from '@material-ui/core';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import { LoginIdentity } from '../../../services/Model';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';

export interface ChangePasswordModalProps extends WithStyles<any> {
  loginIdentity: LoginIdentity;
  email;
  showModalChangePassword: boolean;
  hideFunc: () => void;
  phoneNumber: string;
  countryCode: string;
}

export interface ErrorNotiProps {
  message: string;
  open: boolean;
}

export interface SuccessfulNotifyProps {
  message: string;
}

export interface PassToggleProps extends SvgIconProps {
  show: boolean;
  toggle: () => void;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
}

export const TogglePassEndAdornment: React.FC<PassToggleProps> = (props: PassToggleProps) => {
  const { show, toggle, fontSize } = props;
  let fs = fontSize || 'small';
  return show ? (
    <RemoveRedEye fontSize={fs} onClick={toggle} style={{ opacity: '40%', cursor: 'pointer' }} {...props} />
  ) : (
    <VisibilityOffIcon fontSize={fs} onClick={toggle} style={{ opacity: '40%', cursor: 'pointer' }} {...props} />
  );
};
