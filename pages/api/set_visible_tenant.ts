import withSession from '../../lib/session';
import { SapoAccountsService } from '../../services/oauth2/SapoAccountsService';
import { UpdateVisibleTenant } from '../../services/Model';

async function handler(req, res) {
  if (req.method === 'PUT') {
    const { accessToken } = req.session.get('account');
    const request: { set_visible_tenant: UpdateVisibleTenant } = req.body;
    request.set_visible_tenant.access_token = accessToken;
    const response = await SapoAccountsService.setVisibleTenant(request);
    if (!response.data) {
      res.status(400);
    }
    res.end();
  }
}

export default withSession(handler);
