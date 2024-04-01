import { SapoAccountsService } from '../../services/oauth2/SapoAccountsService';
import { ConnectSocialAccountRequest } from '../../services/Model';
import withSession from '../../lib/session';
import { Authentication } from '../../utils/Authentication';

async function handler(req, res) {
  if (req.method === 'POST') {
    Authentication.getAccessToken(req, res)
      .then((oauth) => {
        const request: { connect_social_account: ConnectSocialAccountRequest } = req.body;
        request.connect_social_account.access_token = oauth.accessToken;
        SapoAccountsService.connectSocialAccount(request)
          .then((response) => {
            res.send({ success: response.data.success });
            res.end();
          })
          .catch(() => {
            res.send({ success: false });
            res.end();
          });
      })
      .catch((e) => {
        res.status(401);
        res.end();
      });
  }
}

export default withSession(handler);
