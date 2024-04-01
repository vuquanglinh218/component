import axios, { AxiosResponse } from 'axios';

export class FreshDeskCustomField {
  name: string;
  ticket_source: string;
  website: string;
  constructor(name: string, website: string | number) {
    this.name = name;
    this.ticket_source = 'Sapo.SSO';
    this.website = website.toString();
  }
}
export class FreshDeskRequest {
  type: string;
  name: string;
  email: string;
  phone: string;
  status: number;
  priority: number;
  subject: string;
  description?: string;
  custom_fields?: FreshDeskCustomField;
  constructor() {
    this.status = 2;
    this.priority = 1;
  }
}
export type FreshDeskResponse = FreshDeskRequest & {
  id: number;
  requester_id: number;
  spam: boolean;
  urgent: boolean;
  is_escalated: boolean;
  fr_escalated: boolean;
  created_at: string;
  updated_at: string;
  due_by: string;
  fr_due_by: string;
};

export class FreshDeskService {
  public static async sendTicketToFreshDesk(
    request: any,
    contentType: string,
  ): Promise<AxiosResponse<FreshDeskResponse>> {
    return await axios.post('/api/v2/tickets', request, {
      headers: {
        Authorization: 'Basic ' + new Buffer(process.env.FRESHDESK_KEY).toString('base64'),
        'Content-Type': contentType,
      },
      baseURL: process.env.FRESHDESK_API,
    });
  }
}
