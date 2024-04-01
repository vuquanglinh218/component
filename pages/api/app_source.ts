import withSession from '../../lib/session';
import { AppSource, getAppSource } from '../../utils/AppSource';

async function handler(req, res) {
  if (req.method === 'GET') {
    const appSource = getAppSource(req, res);
    if (appSource) {
      res.send({ appSource: AppSource[appSource] });
    }
    res.end();
  }
}

export default withSession(handler);
