import withSession from 'lib/session';
import { Sapo360Service } from 'services/contract/Sapo360Service';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = await Sapo360Service.createRequestPaymentWithQR(req.body);

    res.send(data);
    res.end();
    return;
  }
}

export default withSession(handler);
