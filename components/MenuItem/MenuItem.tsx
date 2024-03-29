import { ListItem, ListItemIcon, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { CSSProperties, ElementType, MouseEventHandler, useEffect } from 'react';
import styles from './MenuItem.styles';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface MenuItemProps extends WithStyles<typeof styles> {
  href: string;
  path?: string;
  Icon: ElementType;
  textKey: string;
  prefetch?: boolean;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

function MenuItem(props: MenuItemProps) {
  const { href, classes, Icon, textKey, path, prefetch = false, style = {}, onClick = () => {} } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <Link href={href} prefetch={prefetch}>
      <ListItem
        onClick={onClick}
        button
        className={router.pathname.includes(path || href) ? classes.activeMenu : classes.routerMenu}
        style={style}
      >
        <ListItemIcon style={{ minWidth: 40 }}>
          <Icon className='custom' fill={router.pathname.includes(path || href) ? 'white' : '#A3A8AF'} />
        </ListItemIcon>
        <ListItemText>
          <Typography
            className={classes.menuItemTypo}
            style={{ color: router.pathname.includes(path || href) ? 'white' : '#E8EAEB' }}
          >
            {t(textKey)}
          </Typography>
        </ListItemText>
      </ListItem>
    </Link>
  );
}

export default withStyles(styles)(MenuItem);
