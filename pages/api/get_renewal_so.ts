import withSession from 'lib/session';
import { Sapo360Service } from 'services/contract/Sapo360Service';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { subscription_id, sale_order_template_ids, promo_id } = req.query;
    const data = await Sapo360Service.getRenewalSO(subscription_id, sale_order_template_ids, promo_id);

    res.send(data);
    res.end();
    return;
  }
}

export default withSession(handler);
