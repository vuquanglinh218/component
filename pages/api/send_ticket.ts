import { FreshDeskService } from '../../services/freshdesk/FreshDeskService';
async function handler(req, res) {
  const formData: any = req.body;
  const contentType = req.headers['content-type'];
  FreshDeskService.sendTicketToFreshDesk(formData, contentType)
    .then((freshDeskResponse) => {
      res.status(200);
      res.send(freshDeskResponse.data);
      res.end();
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
      res.end();
    });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export default handler;
