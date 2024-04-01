import { SapoAccountsService } from '../../services/oauth2/SapoAccountsService';
import { AccountChangePasswordRequest, LoginIdentity } from '../../services/Model';
import withSession from '../../lib/session';
import { Authentication } from '../../utils/Authentication';

async function handler(req, res) {
  if (req.method === 'POST') {
    Authentication.getAccessToken(req, res)
      .then((oauth) => {
        const request: { update_password: AccountChangePasswordRequest } = req.body;
        SapoAccountsService.userInfo(oauth.accessToken)
          .then((user) => {
            const doUpdatePassword = () => {
              request.update_password.access_token = oauth.accessToken;
              SapoAccountsService.changePassword(request)
                .then((_result) => {
                  res.status(_result.status).json(_result.data);
                })
                .catch((error) => {
                  res.status(error.response.status).json(error.response.data);
                });
            };
            const throwConflictUser = () => {
              res.status(409);
              res.end();
            };
            if (request.update_password.loginIdentity === LoginIdentity.PHONE_NUMBER) {
              if (
                user.data.account_details.country_code === request.update_password.country_code &&
                user.data.account_details.phone_number === request.update_password.phone_number
              )
                doUpdatePassword();
              else throwConflictUser();
            } else {
              if (user.data.account_details.email === request.update_password.email) doUpdatePassword();
              else throwConflictUser();
            }
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
