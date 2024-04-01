import { Box, InputBase, makeStyles, InputBaseProps, createStyles } from '@material-ui/core';
import GlassIcon from 'components/icons/GlassIcon';
import clsx from 'clsx';

interface SearchBarProps extends InputBaseProps {}

const useStyles = makeStyles(
  createStyles({
    root: {
      border: '1px solid #D3D5D7',
      height: '36px',
      borderRadius: '6px',
      padding: '0px 12px',
    },

    rootInput: {
      flex: 1,
    },
  }),
);

function SearchBar(props: SearchBarProps) {
  const { ...otherProps } = props;
  const classes = useStyles();

  return (
    <Box display='flex' gridGap={12} alignItems='center' className={clsx(classes.root)}>
      <GlassIcon />
      <InputBase classes={{ root: classes.rootInput }} {...otherProps} />
    </Box>
  );
}

export default SearchBar;
