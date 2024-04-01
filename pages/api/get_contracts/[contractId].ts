import { Sapo360Service } from '../../../services/contract/Sapo360Service';
import { getAccount } from '../../../hocs/withAuthServerSideProps';
import withSession from '../../../lib/session';

async function handler(req, res) {
  if (req.method === 'GET') {
    const user = await getAccount(req, res);
    if (!user) {
      return res.status(401).json('');
    }
    const { contractId } = req.query;
    const contracts = await Sapo360Service.getSaleOrders(user.phone_number, user.email);
    if (!contracts || !contracts.data['sale.order'].find((i) => i.so_data.id === Number(contractId))) {
      return res.status(400).json('');
    }

    Sapo360Service.getSaleOrder(contractId)
      .then((contract) => {
        return res.status(200).json(contract);
      })
      .catch(() => {
        return res.status(400);
      });
  }
}

export default withSession(handler);
