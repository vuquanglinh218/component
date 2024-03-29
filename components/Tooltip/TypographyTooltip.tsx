import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography/Typography';

export function TypographyTooltip(props: TypographyProps) {
  return (
    <Tooltip title={props.children} arrow>
      <Typography {...props}>{props.children}</Typography>
    </Tooltip>
  );
}
