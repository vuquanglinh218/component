import {
  AppBar,
  Grid,
  InputBase,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import commonMobileStyles from '../Common/mobile/Common';
import React, { useEffect, useRef, useState } from 'react';
import SelectTick from '../icons/mobile/SelectTick';
import { useTranslation } from 'next-i18next';

interface SelectionModalProps extends WithStyles<any> {
  shown: boolean;
  title: string;
  items: { name: string; id: any }[];
  onSelected: any;
  selectedId?: any;
}

function SelectionModal(props: SelectionModalProps) {
  const { classes } = props;
  const [items, setItems] = useState(props.items);
  const myRef = useRef(null);
  const { t } = useTranslation('common');
  useEffect(() => {
    setItems(props.items);
  }, [props.items]);
  useEffect(() => {
    if (myRef && myRef.current)
      myRef.current.scrollIntoView({
        block: 'center',
      });
  }, [items]);
  const removeVietnamese = (str) => {
    // remove accents
    let from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
      to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-');

    return str;
  };
  const handleSearchChange = (e) => {
    setItems(
      props.items.filter((item) =>
        removeVietnamese(item.name.toLowerCase()).includes(removeVietnamese(e.target.value?.toLowerCase())),
      ),
    );
  };
  return (
    <Modal className={classes.modal} open={props.shown} style={{ overflowX: 'hidden' }}>
      <Paper style={{ outline: 'none' }} className={classes.popupPaper} square={false}>
        <Grid container direction='column' style={{ borderRadius: '10px' }}>
          <AppBar
            position='static'
            style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: 'unset', borderBottom: 'unset' }}
          >
            <Toolbar className={classes.titleAccountDetail} style={{ justifyContent: 'center', height: '45px' }}>
              <Typography className={classes.titleLabel}>{props.title}</Typography>
            </Toolbar>
            <InputBase
              className={classes.inputSearch}
              placeholder={t('action.search')}
              defaultValue={''}
              style={{ height: '40px' }}
              onChange={handleSearchChange}
            />
          </AppBar>
          <Paper style={{ height: 'calc(100% - 85px)', overflow: 'auto', boxShadow: 'unset', border: 'unset' }}>
            {items &&
              items.map((item) => (
                <ListItem
                  ref={item.id === props.selectedId ? myRef : null}
                  button
                  onClick={() => props.onSelected && props.onSelected(item.id)}
                  key={item.id}
                  className={classes.listLocationItem}
                >
                  <ListItemText primary={item.name} />
                  {item.id === props.selectedId ? (
                    <SelectTick style={{ paddingTop: '5px' }} width={20} height={15} />
                  ) : (
                    ''
                  )}
                </ListItem>
              ))}
          </Paper>
        </Grid>
      </Paper>
    </Modal>
  );
}

export default withStyles(commonMobileStyles)(SelectionModal);
