import { dialogSupportTicketStyles } from './style';
import { CloseIcon } from '../icons/mobile';
import Image from 'next/image';
import TopicSupportsConst, { editorConfiguration, TopicSupport } from './TopicSupportConst';
import AddFileIcon from '../icons/AddFileIcon';
import React, { useEffect, useRef, useState, Fragment } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  NativeSelect,
  Typography,
  withStyles,
} from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useSupportTicket } from './SupportTicketContext';
import Link from 'next/link';
import clsx from 'clsx';
import { TypographyTooltip } from '../Tooltip/TypographyTooltip';
import { NextClientService } from '../../services/NextClientService';
import { FreshDeskCustomField, FreshDeskRequest } from '../../services/freshdesk/FreshDeskService';
import NotificationContent from '../Utils/NotificationContent';
import { useSnackbar } from 'notistack';
import CircleCheckIcon from '../icons/CircleCheckIcon';
import { SupportTicketView } from './SupportTicketState';
import CloseSupportTicketIcon from '../icons/CloseSupportTicketIcon';
import CircleErrorIcon from '../icons/CircleErrorIcon';
const maxSize = 2097152; // 2Mb
const maxFiles = 5;
function SupportTicket(props) {
  const { classes } = props;
  const { t } = useTranslation('common');
  let { supportTicketModal, handleSupportTicket, isOpenSupportTicket, viewModal } = useSupportTicket();
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [topic, setTopic] = useState<TopicSupport>(
    TopicSupportsConst[supportTicketModal.typeSupport][TopicSupportsConst.default[supportTicketModal.typeSupport]],
  );
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  // @ts-ignore
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [attachFiles, setAttachFiles] = useState<File[]>([]);
  const [dataEditor, setDataEditor] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const onDrop = <T extends File>(aFiles: T[], fileRejections: FileRejection[], event: DropEvent) => {
    const currentFiles = attachFiles;
    for (let arrayElement of aFiles) {
      const file = arrayElement;
      if (currentFiles.length === maxFiles) {
        pushNotificationFail(`Tệp đính kèm tối đa 5 tệp`);
        continue;
      }
      if ([...currentFiles, arrayElement].map((cf) => cf.size).reduce((val, cur) => val + cur) > maxSize) {
        pushNotificationFail(`Tệp đính kèm tối đa 2MB`);
        continue;
      }
      if (currentFiles.find((f) => f.name === file.name)) continue;
      currentFiles.push(file);
    }
    setAttachFiles([...currentFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    // @ts-ignore
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    if (isOpenSupportTicket) {
      setTopic(
        supportTicketModal.topic
          ? TopicSupportsConst[supportTicketModal.typeSupport][supportTicketModal.topic]
          : TopicSupportsConst[supportTicketModal.typeSupport][
              TopicSupportsConst.default[supportTicketModal.typeSupport]
            ],
      );
      setAttachFiles([]);
      setDataEditor('');
    }
  }, [isOpenSupportTicket]);

  const clearFile = (fileName) => {
    const newAcceptedFiles = attachFiles.filter((file) => file.name !== fileName);
    setAttachFiles([...newAcceptedFiles]);
  };
  const closeModal = handleSupportTicket().close;

  const submitTicket = async () => {
    if (isSubmitting) return;
    if (!supportTicketModal.email) {
      return pushNotificationFail('Vui lòng bổ sung email để Sapo hỗ trợ xử lý ticket của bạn');
    }
    if (!dataEditor) {
      return pushNotificationFail('Vui lòng bổ sung nội dung yêu cầu để Sapo hỗ trợ xử lý ticket của bạn');
    }
    const requestData = new FreshDeskRequest();
    requestData.description = dataEditor;
    requestData.email = supportTicketModal.email;
    requestData.phone = supportTicketModal.phoneNumber;
    requestData.subject = topic.title;
    requestData.name = supportTicketModal.fullName;
    requestData.type = topic.title;
    requestData.custom_fields = new FreshDeskCustomField(supportTicketModal.fullName, supportTicketModal.webSite);
    setSubmitting(true);
    NextClientService.sendSupportTicket(requestData, attachFiles)
      .then((res) => {
        handleSupportTicket(supportTicketModal).sendSuccess(res.data.id);
        setSubmitting(false);
      })
      .catch((err) => {
        handleSupportTicket(supportTicketModal).sendSuccess(0);
        setSubmitting(false);
      });
  };
  const pushNotificationFail = (content) => {
    enqueueSnackbar(<NotificationContent content={content} variant={'error'} />, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    });
  };
  function formatBytes(a, b = 2) {
    if (0 === a) return '0 Bytes';
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return (
      parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
      ' ' +
      ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
    );
  }

  const formTypingTicket = (
    <Fragment>
      <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
        <Image src='/static/SapoLogo.svg' alt='Sapo' width='100' height='35' />
      </Grid>
      <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Typography style={{ fontWeight: 500, fontSize: '20px', lineHeight: '24px' }} variant='h1'>
          {'GỬI TICKET YÊU CẦU HỖ TRỢ'}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 24 }}>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: 500 }}>Thông tin liên hệ</Typography>
        </Grid>
        <Box className={classes.generalInfoContainer}>
          <Box className={classes.area1}>
            <Typography className={classes.generalInfoItemInfo}>Họ và tên:</Typography>
          </Box>
          <Box className={classes.area2}>
            <TypographyTooltip className={clsx(classes.generalInfoItemInfo, classes.ellipsisValue)}>
              {supportTicketModal.fullName}
            </TypographyTooltip>
          </Box>
          <Box className={classes.area3}>
            <Typography className={classes.generalInfoItemInfo}>Cửa hàng/Website:</Typography>
          </Box>
          <Box className={classes.area4}>
            <TypographyTooltip className={clsx(classes.generalInfoItemInfo, classes.ellipsisValue)}>
              {supportTicketModal.webSite}
            </TypographyTooltip>
          </Box>
          <Box className={classes.area5}>
            <Typography className={classes.generalInfoItemInfo}>Email:</Typography>
          </Box>
          <Box className={classes.area6}>
            {supportTicketModal.email && supportTicketModal.email.trim() !== '' ? (
              <TypographyTooltip className={clsx(classes.generalInfoItemInfo, classes.ellipsisValue)}>
                {supportTicketModal.email}
              </TypographyTooltip>
            ) : (
              <span onClick={closeModal}>
                Bổ sung email&nbsp;
                <Link href={'/accounts'} passHref={false}>
                  <a target='_blank'>Tại đây</a>
                </Link>
              </span>
            )}
          </Box>
          <Box className={classes.area7}>
            <Typography className={classes.generalInfoItemInfo}>Số điện thoại:</Typography>
          </Box>
          <Box className={classes.area8}>
            <TypographyTooltip className={classes.generalInfoItemInfo}>
              {supportTicketModal.phoneNumber}
            </TypographyTooltip>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        direction='row'
        style={{
          marginTop: 24,
          border: '1px solid #E8EAEB',
          boxShadow: '0px 4px 8px rgba(168, 168, 168, 0.25)',
          boxSizing: 'border-box',
          borderRadius: '5px',
        }}
      >
        <Grid
          item
          xs={4}
          style={{ display: 'flex', alignItems: 'center', height: '48px', borderRight: '0.5px solid #E8EAEB' }}
        >
          <Typography style={{ paddingLeft: 24, fontWeight: 500, fontSize: '13px' }}>Chủ đề cần hỗ trợ</Typography>
        </Grid>
        <Grid item xs={8}>
          <NativeSelect
            value={topic ? topic.title : ''}
            onChange={(env) => {
              setTopic(
                Object.entries(TopicSupportsConst[supportTicketModal.typeSupport]).find(
                  (entry) => entry[1].title === env.target.value,
                )[1],
              );
            }}
            name={topic.title}
            className={classes.selectTopicBox}
            disableUnderline
          >
            {Object.entries(TopicSupportsConst[supportTicketModal.typeSupport]).map((selection) => {
              const [, value] = selection;
              return (
                <option key={value.title} value={value.title}>
                  {value.title}
                </option>
              );
            })}
          </NativeSelect>
        </Grid>
        <Grid item xs={12}>
          {editorLoaded ? (
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={supportTicketModal.data || topic.data || ''}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                editor.editing.view.change((writer) => {
                  writer.addClass('editingMain', editor.editing.view.document.getRoot());
                });
                editor.ui.view.toolbar.element.className = editor.ui.view.toolbar.element.className + ' editingToolbar';
              }}
              onChange={(event, editor) => {
                setDataEditor(editor.getData());
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          ) : (
            ''
          )}
        </Grid>
        {attachFiles.length ? (
          <Grid item xs={12}>
            <aside style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              {attachFiles.map((file) => (
                <ListItem button style={{ padding: '0 16px' }} key={file.name}>
                  <ListItemText>
                    <Typography>{file.name}</Typography>
                  </ListItemText>
                  <ListItemText style={{ textAlign: 'right', paddingRight: '12px' }}>
                    <Typography>{formatBytes(file.size)}</Typography>
                  </ListItemText>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <div onClick={() => clearFile(file.name)}>
                      <CloseIcon
                        className={'custom'}
                        width={8}
                        height={8}
                        style={{ cursor: 'pointer' }}
                        fill={'#182537'}
                      />
                    </div>
                  </ListItemIcon>
                </ListItem>
              ))}
            </aside>
          </Grid>
        ) : (
          ''
        )}

        <Grid item xs={12}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <ListItem button style={{ padding: '12px 16px' }}>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <AddFileIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography style={{ fontSize: '14px' }}>Đính kèm tệp tin</Typography>
              </ListItemText>
            </ListItem>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ paddingTop: '24px' }}>
        {topic.note ? (
          <div style={{ fontSize: '13px' }}>
            <span style={{ fontWeight: 500, textDecoration: 'underline' }}>*Lưu ý:</span> {topic.note}
          </div>
        ) : (
          ''
        )}
      </Grid>
      <Grid item style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <Button
          className={classes.buttonCancelUpdate}
          variant='outlined'
          color='primary'
          type='submit'
          onClick={closeModal}
        >
          {isSubmitting ? <CircularProgress size={20} color={'inherit'} thickness={4} /> : t('action.cancel')}
        </Button>
        <Button
          className={classes.buttonSubmitUpdate}
          style={{ border: '1px solid #0088FF' }}
          variant='contained'
          color='primary'
          type='submit'
          onClick={submitTicket}
        >
          {isSubmitting ? <CircularProgress size={20} color={'inherit'} thickness={4} /> : 'Gửi ticket'}
        </Button>
      </Grid>
    </Fragment>
  );
  const formResultSuccess = (
    <Fragment>
      <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
        <CircleCheckIcon className='custom' />
      </Grid>
      <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Typography style={{ fontWeight: 500, fontSize: '20px', lineHeight: '24px' }} variant='h1'>
          {'TICKET ĐƯỢC TẠO THÀNH CÔNG'}
        </Typography>
      </Grid>
      <Grid item className={classes.contentCreateTicketSuccess}>
        <Typography>Cảm ơn Quý khách đã tin tưởng sử dụng dịch vụ của Sapo!</Typography>
        <Typography>
          Sapo đã đã nhận được yêu cầu hỗ trợ số <b>#{viewModal}</b> của Quý khách. Sapo sẽ kiểm tra và phản hồi thông
          tin hỗ trợ qua email <b>{supportTicketModal.email}</b> chậm nhất trong 24h tiếp theo.
        </Typography>
        <Typography style={{ color: '#747C87', fontStyle: 'italic' }}>
          Với các yêu cầu hỗ trợ được khởi tạo trong ngày thứ 7 và chủ nhật hàng tuần thì việc trả lời sẽ có chậm trễ
          đôi chút, Sapo sẽ phản hồi lại thông tin chậm nhất trong sáng thứ 2 của tuần làm việc kế tiếp. Rất mong Quý
          khách thông cảm.
        </Typography>
      </Grid>
      <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px', paddingBottom: '16px' }}>
        <Button
          className={classes.buttonSubmitUpdate}
          style={{ width: '104px' }}
          variant='contained'
          color='primary'
          type='submit'
          onClick={closeModal}
        >
          Tôi đã hiểu
        </Button>
      </Grid>
    </Fragment>
  );
  const formResultFail = (
    <Fragment>
      <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
        <CircleErrorIcon className='custom' />
      </Grid>
      <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Typography style={{ fontWeight: 500, fontSize: '20px', lineHeight: '24px' }} variant='h1'>
          {'YÊU CẦU HỖ TRỢ GỬI THẤT BẠI'}
        </Typography>
      </Grid>
      <Grid item className={classes.contentCreateTicketFail}>
        <Typography>Vì một số lý do yêu cầu của Anh/chị không thể gửi về chúng tôi.</Typography>
        <Typography>
          Nếu Anh/chị cần được hỗ trợ gấp, hãy gọi điện tới Tổng đài <b>1800 6750</b> (miễn phí) để được trợ giúp sớm.
        </Typography>
        <Typography>Hoặc gửi yêu cầu về email: support@sapo.vn</Typography>
      </Grid>
    </Fragment>
  );
  const formResult = viewModal ? formResultSuccess : formResultFail;
  return (
    <Dialog
      aria-labelledby='customized-dialog-title'
      open={isOpenSupportTicket}
      maxWidth={'md'}
      classes={{ scrollPaper: classes.overrideScrollPaper }}
      closeAfterTransition
      transitionDuration={300}
      onEscapeKeyDown={closeModal}
    >
      <Grid container direction='column' style={{ padding: '0 16px 0 16px', width: '692px' }}>
        <Grid item style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
          <CloseSupportTicketIcon
            className={'custom'}
            style={{ cursor: 'pointer' }}
            fill={'#A3A8AF'}
            onClick={closeModal}
          />
        </Grid>
        <Grid container direction='column' style={{ padding: '0 16px 16px 16px' }}>
          {viewModal === 'typing' ? formTypingTicket : formResult}
        </Grid>
      </Grid>
    </Dialog>
  );
}
export default withStyles(dialogSupportTicketStyles)(SupportTicket);
