import { useState } from 'react';
import { SupportTicketModal } from './TopicSupportConst';
import { bool } from 'prop-types';
export type SupportTicketView = 'typing' | string;
const SupportTicketState = () => {
  const [supportTicketModal, setSupportTicketModal] = useState<SupportTicketModal>({ typeSupport: 'POS' });
  const [isOpenSupportTicket, setOpenSupportTicket] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<SupportTicketView>();
  let handleSupportTicket = (content?: SupportTicketModal) => {
    if (content) {
      setSupportTicketModal(content);
    }
    return {
      open: () => {
        setOpenSupportTicket(true);
        setViewModal('typing');
      },
      close: () => {
        setOpenSupportTicket(false);
      },
      sendSuccess: (id: any) => {
        setViewModal(id);
      },
    };
  };

  return { supportTicketModal, handleSupportTicket, isOpenSupportTicket, viewModal };
};

export default SupportTicketState;
