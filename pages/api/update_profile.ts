import { SapoAccountsService } from '../../services/oauth2/SapoAccountsService';
import { UpdateProfileRequest } from '../../services/Model';
import withSession from '../../lib/session';
import { Authentication } from '../../utils/Authentication';

async function handler(req, res) {
  if (req.method === 'POST') {
    Authentication.getAccessToken(req, res)
      .then((oauth) => {
        const request: { account: UpdateProfileRequest } = req.body;
        SapoAccountsService.userInfo(oauth.accessToken)
          .then((user) => {
            request.account.access_token = oauth.accessToken;
            SapoAccountsService.changeProfile(request)
              .then((_result) => {
                res.status(_result.status).json(_result.data);
              })
              .catch((error) => {
                res.status(error.response.status).json(error.response.data);
              });
          })
          .catch((reason) => {
            res.status(401);
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
