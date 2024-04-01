import withSession from 'lib/session';
import { Sapo360Service } from 'services/contract/Sapo360Service';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { domain } = req.query;
    const data = await Sapo360Service.getUserWithDomain(domain);

    res.send(data);
    res.end();
    return;
  }
}

export default withSession(handler);
