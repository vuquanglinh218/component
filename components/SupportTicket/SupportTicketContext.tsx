import React from 'react';
import { SupportTicketModal } from './TopicSupportConst';
import SupportTicketState, { SupportTicketView } from './SupportTicketState';
import SupportTicket from './SupportTicket';

type SupportTicketContextType = {
  supportTicketModal?: SupportTicketModal;
  handleSupportTicket?: (content?: SupportTicketModal) => {
    open: () => void;
    close: () => void;
    sendSuccess: (id: any) => void;
  };
  isOpenSupportTicket: boolean;
  viewModal?: SupportTicketView;
};

let SupportTicketContext;
let { Provider } = (SupportTicketContext = React.createContext<SupportTicketContextType>({
  isOpenSupportTicket: false,
}));

let SupportTicketProvider = ({ children }) => {
  let { supportTicketModal, handleSupportTicket, isOpenSupportTicket, viewModal } = SupportTicketState();
  return (
    <Provider value={{ supportTicketModal, handleSupportTicket, isOpenSupportTicket, viewModal }}>
      <SupportTicket />
      {children}
    </Provider>
  );
};

export { SupportTicketProvider };

export const useSupportTicket = () => {
  return React.useContext<SupportTicketContextType>(SupportTicketContext);
};
