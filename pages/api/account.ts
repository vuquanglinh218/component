import withSession from '../../lib/session';
import { getAccount } from '../../hocs/withAuthServerSideProps';

async function handler(req, res) {
  if (req.method === 'GET') {
    const user = await getAccount(req, res);
    res.send(user);
    res.end();
    return;
  }
}

export default withSession(handler);
