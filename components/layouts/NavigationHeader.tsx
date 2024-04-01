import { Box, Button, Theme, ThemeProvider, Typography, createStyles, makeStyles } from '@material-ui/core';
import ArrowShortLeftIcon from 'components/icons/ArrowShortLeftIcon';
import merchantPortalTheme from 'merchant-portal-theme';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import clsx from 'clsx';

export interface NavigationHeaderProps {
  title: string;
  onGoBack?: () => void;
  isGoBack?: boolean;
  actionRight?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 30,
        paddingRight: 48,
      },
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 32,
      paddingLeft: 14,
      paddingTop: 10,
      paddingBottom: 5,
      marginTop: 3,
      backgroundColor: '#f4f6f8',
    },
    buttonOutlined: {
      border: '1px solid #D3D5D7',
      padding: 0,
      minWidth: 36,
      height: 36,
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
  }),
);

function NavigationHeader(props: NavigationHeaderProps) {
  const { title, onGoBack, isGoBack, actionRight } = props;
  const classes = useStyles();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
    if (onGoBack) {
      onGoBack();
    }
  };

  return (
    <ThemeProvider theme={merchantPortalTheme}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        marginBottom='16px'
        className={clsx(classes.container)}
      >
        <Box display='flex' alignItems='center' gridGap={12}>
          {isGoBack && (
            <Button variant='outlined' onClick={handleGoBack} classes={{ outlined: classes.buttonOutlined }}>
              <ArrowShortLeftIcon />
            </Button>
          )}
          <Typography variant='subtitle1'>{title}</Typography>
        </Box>

        <Box>{actionRight}</Box>
      </Box>
    </ThemeProvider>
  );
}

export default NavigationHeader;
