import withSession from '../../lib/session';
import { SapoAccountsService } from '../../services/oauth2/SapoAccountsService';

async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { provider } = req.query;

    const { accessToken } = req.session.get('account');
    const data = {
      remove_social_connect: {
        access_token: accessToken,
        social_account_provider: provider,
      },
    };
    const response = await SapoAccountsService.removeSocialConnect(data);
    if (!response.data.success) {
      res.status(400);
    }
    res.end();
  }
}

export default withSession(handler);
