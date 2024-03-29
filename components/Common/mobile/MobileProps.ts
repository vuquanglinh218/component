import { WithStyles } from '@material-ui/core';
import { CSSProperties, ReactElement } from 'react';

export interface MobileHeaderProps extends WithStyles<any> {
  title: string;
  leftArea?: {
    content?: 'close' | 'back' | ReactElement;
    action?: Function;
  };

  rightArea?: {
    content?: ReactElement;
    action?: Function;
  };
  appBarStyle?: CSSProperties;
  stickyElement?: ReactElement;
}

export interface MobileLayoutProps extends MobileHeaderProps {
  children: any;
  propParent?: any;
  nonHeader?: boolean;
}
