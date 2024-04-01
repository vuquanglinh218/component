import withSession from 'lib/session';
import { Sapo360Service } from 'services/contract/Sapo360Service';

async function handler(req, res) {
  if (req.method === 'GET') {
    const domain = req.query.domain;
    const stores = await Sapo360Service.getStores(domain);

    res.send(stores);
    res.end();
    return;
  }
}

export default withSession(handler);
