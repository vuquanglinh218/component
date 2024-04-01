import { Sapo360Service } from '../../../services/contract/Sapo360Service';
import withSession from '../../../lib/session';
import { ContractListRow } from '../../../components/ContractsList/components/TabTable';
import { OrderType } from '../../../services/contract/model';
import { getGeneralInformation } from '../../../components/SupportTicket/TopicSupportConst';
import { getAccount } from '../../../hocs/withAuthServerSideProps';

export const getSaleOrders = async (phone, email) => {
  const soData = await Sapo360Service.getSaleOrders(phone, email);
  return soData.data['sale.order'];
};

async function handler(req, res) {
  if (req.method === 'GET') {
    const { status } = req.query;
    const user = await getAccount(req, res);
    if (!user) {
      return res.status(401).json('');
    }
    const phone = user.phone_number;
    const email = user.email;
    getSaleOrders(phone, email)
      .then((contracts) => {
        const result = contracts
          .map((contract) => {
            let contractExpiryDate: string | false;
            let saleOrderTemplateName: string | false;
            let contractWebsite: any[];
            let appendix = [];
            if (contract.so_data.z_order_type === OrderType.SignNew) {
              const z_pl_ids = contract.so_data.z_pl_ids.map((pl) => Number(pl));
              appendix = contracts.filter((c) => z_pl_ids.includes(c.so_data.id));
            }

            const generalInformation = getGeneralInformation(contract, appendix);
            contractExpiryDate = generalInformation.contractExpiryDate;
            saleOrderTemplateName = generalInformation.saleOrderTemplateName;
            contractWebsite = generalInformation.contractWebsite;

            let rs: ContractListRow = {
              id: contract.so_data.id,
              dms_contract_code: contract.so_data.dms_contract_code,
              z_contract_expiry_date: contractExpiryDate === false ? '' : (contractExpiryDate as string),
              validity_date: contract.so_data.validity_date,
              z_website_name: contractWebsite,
              z_workflow_deployment: contract.so_data.z_workflow_deployment,
              sale_order_template_name: saleOrderTemplateName || '',
              status: generalInformation.status,
              z_order_type: contract.so_data.z_order_type,
              data: contract,
            };
            return rs;
          })
          .filter((contract) => {
            if (status && status != 'all') {
              if (status === 'valid') {
                return contract.status === 'valid' || contract.status === null;
              }
              return contract.status === status;
            }
            return true;
          });
        return res.status(200).json(result);
      })
      .catch((reason) => {
        return res.status(200).json([]);
      });
  }
}

export default withSession(handler);
