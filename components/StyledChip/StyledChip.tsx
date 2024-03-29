import { Chip, withStyles } from '@material-ui/core';

const SuccessChip = withStyles({
  root: {
    backgroundColor: '#E7FBF3',
    color: '#0FD186',
  },
})(Chip);

const DangerChip = withStyles({
  root: {
    backgroundColor: '#FFEEEE',
    color: '#FF4D4D',
  },
})(Chip);

const WarningChip = withStyles({
  root: {
    backgroundColor: '#FFFBF2',
    color: '#FFAE06',
  },
})(Chip);

export { SuccessChip, DangerChip, WarningChip };
