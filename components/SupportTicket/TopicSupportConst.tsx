import { ReactElement, Fragment } from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { Contract, OrderType } from '../../services/contract/model';

export class TopicSupport {
  title: string;
  note: string | ReactElement;
  data: string;
  constructor(title: string, note: string | ReactElement = '', data: string = '') {
    this.title = title;
    this.note = note;
    this.data = data;
  }
}
const TopicSupportsConst = {
  POS: {
    'Hướng dẫn sử dụng phần mềm': new TopicSupport(
      'Hướng dẫn sử dụng phần mềm',
      (
        <Fragment>
          <span>
            Quý khách có thể tham khảo tài liệu và video hướng dẫn sử dụng tại địa chỉ &nbsp;
            <Link href={'https://support.sapo.vn/sapo-pos'} passHref={false}>
              <a target='_blank'>support.sapo.vn/sapo-pos</a>
            </Link>
          </span>
        </Fragment>
      ),
    ),
    'Hỗ trợ thiết bị phần cứng': new TopicSupport(
      'Hỗ trợ thiết bị phần cứng',
      null,
      '<p>Tên thiết bị:</p> <p>Serial:</p> <p>Vấn đề cần hỗ trợ:</p>',
    ),
    'Báo lỗi phần mềm': new TopicSupport('Báo lỗi phần mềm'),
    'Đồng bộ dữ liệu sàn TMĐT': new TopicSupport('Đồng bộ dữ liệu sàn TMĐT'),
    'Reset dữ liệu tài khoản': new TopicSupport(
      'Reset dữ liệu tài khoản',
      (
        <Fragment>
          <span>
            Để đảm bảo dữ liệu của mình trước và sau khi Reset dữ liệu tài khoản, Quý khách vui lòng thực hiện các thao
            tác theo hướng dẫn tại đây: &nbsp;
            <Link href={'https://support.sapo.vn/huong-dan-go-kenh-truoc-khi-reset-du-lieu'} passHref={false}>
              <a target='_blank'>Hướng dẫn gỡ kênh trước khi reset dữ liệu (sapo.vn)</a>
            </Link>
          </span>
        </Fragment>
      ),
    ),
    'Vận chuyển': new TopicSupport(
      'Vận chuyển',
      'Hỗ trợ các vấn đề liên quan đến Sapo Express và đối tác vận chuyển GHN, ViettelPost,..',
      '<ul><li>Mã vận đơn cần hỗ trợ:</li><li>Nội dung cần hỗ trợ:</li></ul>',
    ),
    'Chỉnh sửa mẫu in': new TopicSupport(
      'Chỉnh sửa mẫu in',
      (
        <Fragment>
          <span>
            Quý khách có thể tham khảo tài liệu hướng dẫn thay đổi mẫu in cho cửa hàng: &nbsp;
            <Link href={'https://support.sapo.vn/tuy-chinh-mau-in-pos'} passHref={false}>
              <a target='_blank'>Hướng dẫn tùy chỉnh mẫu in cho cửa hàng (sapo.vn)</a>
            </Link>
          </span>
        </Fragment>
      ),
    ),
    'Hỗ trợ đồng bộ website': new TopicSupport('Hỗ trợ đồng bộ website'),
    'Góp ý tính năng - phản ánh dịch vụ': new TopicSupport('Góp ý tính năng - phản ánh dịch vụ'),
    'Đổi thông tin tài khoản - hợp đồng': new TopicSupport(
      'Đổi thông tin tài khoản - hợp đồng',
      (
        <Fragment>
          <Typography style={{ fontSize: '13px' }}>
            - Nếu Khách hàng là cá nhân: Quý khách vui lòng đính kèm hình ảnh 2 mặt CMND/CCCD người đại diện trên HĐ.
          </Typography>
          <Typography style={{ fontSize: '13px' }}>
            - Nếu Khách hàng là Công ty, Quý khách vui lòng đính kèm văn bản yêu cầu có dấu đỏ của Công ty&nbsp;
            <Link
              href={'https://drive.google.com/drive/u/0/folders/1eVMuTrfxZQ2osJUWohBJvOZuB8qwARuQ'}
              passHref={false}
            >
              <a target='_blank'>(Tải mẫu văn bản)</a>
            </Link>
          </Typography>
        </Fragment>
      ),
    ),
    'Hỗ trợ khác': new TopicSupport('Hỗ trợ khác'),
  },
  WEB: {
    'Báo lỗi - chỉnh sửa giao diện website': new TopicSupport(
      'Báo lỗi - chỉnh sửa giao diện website',
      'Quý khách vui lòng mô tả cụ thể và gửi hình ảnh đính kèm ảnh các mục yêu cầu để Sapo có thể hỗ trợ nhanh chóng và chính xác nhất.',
    ),
    'HDSD tính năng, ứng dụng': new TopicSupport('HDSD tính năng, ứng dụng'),
    'Đăng kí website TMĐT với Bộ công thương': new TopicSupport(
      'Đăng kí website TMĐT với Bộ công thương',
      (
        <Fragment>
          <span>Quý khách vui lòng đính kèm ảnh hoặc bản scan các nội dung sau:</span>
          <Typography style={{ fontSize: '13px' }}>- Tên email dùng để tạo tài khoản với BCT</Typography>
          <Typography style={{ fontSize: '13px' }}>
            - Giấy phép đăng kí kinh doanh, giấy kiểm định chất lượng, lưu hành đối với các mặt hàng thuộc thực phẩm
            chức năng
          </Typography>
        </Fragment>
      ),
    ),
    'Tư vấn thiết kế website': new TopicSupport('Tư vấn thiết kế website'),
    'Đăng kí gia hạn, các dịch vụ tên miền': new TopicSupport('Đăng kí gia hạn, các dịch vụ tên miền'),
    'Hỗ trợ dịch vụ email tên miền': new TopicSupport('Hỗ trợ dịch vụ email tên miền'),
    'Góp ý phản ánh dịch vụ': new TopicSupport('Góp ý phản ánh dịch vụ'),
    'Đổi thông tin tài khoản - hợp đồng': new TopicSupport(
      'Đổi thông tin tài khoản - hợp đồng',
      (
        <Fragment>
          <span>
            Nếu Khách hàng là cá nhân: Quý khách vui lòng đính kèm hình ảnh 2 mặt CMND/CCCD người đại diện trên HĐ.
          </span>
          <Typography style={{ fontSize: '13px' }}>
            Nếu Khách hàng là Công ty, Quý khách vui lòng đính kèm văn bản yêu cầu có dấu đỏ của Công ty
          </Typography>
        </Fragment>
      ),
    ),
    'Vận chuyển': new TopicSupport(
      'Vận chuyển',
      null,
      '<ul><li>Mã vận đơn cần hỗ trợ:</li><li>Nội dung cần hỗ trợ:</li></ul>',
    ),
    'Hỗ trợ các vấn đề khác': new TopicSupport('Hỗ trợ các vấn đề khác'),
  },
  FnB: {
    'Reset dữ liệu tài khoản': new TopicSupport('Reset dữ liệu tài khoản'),
    'Hỗ trợ thiết bị phần cứng': new TopicSupport(
      'Hỗ trợ thiết bị phần cứng',
      null,
      '<p>Tên thiết bị:</p> <p>Serial:</p> <p>Vấn đề cần hỗ trợ:</p>',
    ),
    'Đổi thông tin tài khoản - hợp đồng': new TopicSupport(
      'Đổi thông tin tài khoản - hợp đồng',
      (
        <Fragment>
          <span>
            Nếu Khách hàng là cá nhân: Quý khách vui lòng đính kèm hình ảnh 2 mặt CMND.CCCD người đại diện trên HĐ.
          </span>
          <Typography style={{ fontSize: '13px' }}>
            Nếu Khách hàng là Công ty, Quý khách vui lòng đính kèm văn bản yêu cầu có dấu đỏ của Công ty
          </Typography>
        </Fragment>
      ),
    ),
    'Báo lỗi phần mềm': new TopicSupport('Báo lỗi phần mềm'),
    'Hướng dẫn sử dụng phần mềm': new TopicSupport(
      'Hướng dẫn sử dụng phần mềm',
      (
        <Fragment>
          <span>
            Quý khách có thể tham khảo tài liệu và video hỗ trợ&nbsp;
            <Link href={'https://support.sapo.vn/sapo-fnb'} passHref={false}>
              <a target='_blank'>Sapo FnB</a>
            </Link>
          </span>
        </Fragment>
      ),
    ),
  },
  OoE: {
    'Hướng dẫn sử dụng phần mềm': new TopicSupport('Hướng dẫn sử dụng phần mềm'),
    'Hỗ trợ thiết bị phần cứng': new TopicSupport(
      'Hỗ trợ thiết bị phần cứng',
      null,
      '<p>Tên thiết bị:</p><p>Serial:</p><p>Vấn đề cần hỗ trợ:</p>',
    ),
    'Báo lỗi phần mềm': new TopicSupport('Báo lỗi phần mềm'),
    'Đồng bộ dữ liệu sàn TMĐT': new TopicSupport('Đồng bộ dữ liệu sàn TMĐT'),
    'Reset dữ liệu tài khoản': new TopicSupport(
      'Reset dữ liệu tài khoản',
      (
        <Fragment>
          <span>
            Để đảm bảo dữ liệu của mình trước và sau khi Reset dữ liệu tài khoản, Quý khách vui lòng thực hiện các thao
            tác theo hướng dẫn tại đây:&nbsp;
            <Link href={'https://support.sapo.vn/huong-dan-go-kenh-truoc-khi-reset-du-lieu'} passHref={false}>
              <a target='_blank'>Hướng dẫn gỡ kênh trước khi reset dữ liệu (sapo.vn)</a>
            </Link>
          </span>
        </Fragment>
      ),
    ),
    'Vận chuyển': new TopicSupport(
      'Vận chuyển',
      'Hỗ trợ các vấn đề liên quan đến Sapo Express và đối tác vận chuyển GHN, ViettelPost,..',
      '<ul><li>Mã vận đơn cần hỗ trợ:</li><li>Nội dung cần hỗ trợ:</li></ul>',
    ),
    'Chỉnh sửa mẫu in': new TopicSupport(
      'Chỉnh sửa mẫu in',
      (
        <Fragment>
          <span>
            Quý khách có thể tham khảo tài liệu hướng dẫn thay đổi mẫu in cho cửa hàng:&nbsp;
            <Link href={'https://support.sapo.vn/tuy-chinh-mau-in-pos'} passHref={false}>
              <a target='_blank'>Hướng dẫn tùy chỉnh mẫu in cho cửa hàng (sapo.vn)</a>
            </Link>
          </span>
        </Fragment>
      ),
    ),
    'Hỗ trợ đồng bộ website': new TopicSupport('Hỗ trợ đồng bộ website'),
    'Góp ý tính năng - phản ánh dịch vụ': new TopicSupport('Góp ý tính năng - phản ánh dịch vụ'),
    'Đổi thông tin tài khoản - hợp đồng': new TopicSupport(
      'Đổi thông tin tài khoản - hợp đồng',
      (
        <Fragment>
          <Typography style={{ fontSize: '13px' }}>
            - Nếu Khách hàng là cá nhân: Quý khách vui lòng đính kèm hình ảnh 2 mặt CMND/CCCD người đại diện trên HĐ.
          </Typography>
          <Typography style={{ fontSize: '13px' }}>
            - Nếu Khách hàng là Công ty, Quý khách vui lòng đính kèm văn bản yêu cầu có dấu đỏ của Công ty&nbsp;
            <Link
              href={'https://drive.google.com/drive/u/0/folders/1eVMuTrfxZQ2osJUWohBJvOZuB8qwARuQ'}
              passHref={false}
            >
              <a target='_blank'>(Tải mẫu văn bản)</a>
            </Link>
          </Typography>
        </Fragment>
      ),
    ),
    'Đăng ký website TMĐT với Bộ công thương': new TopicSupport('Đăng ký website TMĐT với Bộ công thương'),
    'Đăng ký gia hạn, các dịch vụ tên miền': new TopicSupport('Đăng ký gia hạn, các dịch vụ tên miền'),
    'Hỗ trợ dịch vụ email tên miền': new TopicSupport('Hỗ trợ dịch vụ email tên miền'),
    'Hỗ trợ các vấn đề khác': new TopicSupport('Hỗ trợ các vấn đề khác'),
    'Báo lỗi - chỉnh sửa giao diện website': new TopicSupport(
      'Báo lỗi - chỉnh sửa giao diện website',
      'Quý khách vui lòng mô tả cụ thể và gửi hình ảnh đính kèm ảnh các mục yêu cầu để Sapo có thể hỗ trợ nhanh chóng và chính xác nhất.',
    ),
  },
  default: {
    POS: 'Hướng dẫn sử dụng phần mềm',
    WEB: 'Báo lỗi - chỉnh sửa giao diện website',
    FnB: 'Reset dữ liệu tài khoản',
    OoE: 'Hướng dẫn sử dụng phần mềm',
  },
};
export default TopicSupportsConst;

export type TypeTicketSupport = 'POS' | 'WEB' | 'FnB' | 'OoE';

export type SupportTicketModal = {
  fullName?: string;
  webSite?: string | number;
  email?: string | null;
  phoneNumber?: string;
  typeSupport: TypeTicketSupport;
  topic?: string;
  data?: string;
};

export const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      'codeBlock',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      '|',
      'undo',
      'redo',
    ],
    shouldNotGroupWhenFull: true,
  },
  language: 'vi',
};

export const getTypeSupport = (contract: Contract): TypeTicketSupport => {
  if (
    typeof contract.so_data.sale_order_template_id.name === 'string' &&
    contract.so_data.sale_order_template_id.name?.toLowerCase().includes('fnb')
  )
    return 'FnB';
  if (['Omnichannel', 'Sapo Commerce'].includes(contract.so_data.sale_order_template_id.name as string)) return 'OoE';
  for (const line of contract.lines_data) {
    if (
      line.z_website_name &&
      (line.z_website_name.includes('mysapogo.com') || line.z_website_name.includes('mysapo.vn'))
    )
      return 'POS';
  }
  return 'WEB';
};

export const getWebSiteSupport = (contract: Contract): string | number => {
  if (
    typeof contract.so_data.sale_order_template_id.name === 'string' &&
    contract.so_data.sale_order_template_id.name?.toLowerCase().includes('fnb') &&
    contract.so_data.z_fnb_id !== false
  ) {
    return contract.so_data.z_fnb_id as number;
  }
  let contractWebsite = [];
  if (contract.so_data.z_website_web === true) {
    contractWebsite.push(contract.so_data.z_website_web);
  }
  if (contract.so_data.is_display_website_pos === true) {
    contractWebsite.push(contract.so_data.z_website_pos);
  }

  if (contract.so_data.is_display_fnb_id === true) {
    contractWebsite.push(contract.so_data.z_fnb_id);
  }
  if (
    contract.so_data.is_display_fnb_id === false &&
    contract.so_data.is_display_website_pos === false &&
    contract.so_data.is_display_website_web === false
  ) {
    contractWebsite = [contract.lines_data[0].z_website_name];
  }
  return contractWebsite.length ? contractWebsite[0] : '';
};

export const getGeneralInformation = (contract: Contract, appendix: Contract[]) => {
  let contractExpiryDate = contract.so_data.z_contract_expiry_date;
  let contractWebsite = [];
  if (contract.so_data.is_display_website_web === true) {
    contractWebsite.push(contract.so_data.z_website_web);
  }
  if (contract.so_data.is_display_website_pos === true) {
    contractWebsite.push(contract.so_data.z_website_pos);
  }
  if (contract.so_data.is_display_fnb_id === true) {
    contractWebsite.push(contract.so_data.z_fnb_id);
  }
  let saleOrderTemplateName = contract.so_data.sale_order_template_id.name;
  if (
    contract.so_data.is_display_fnb_id === false &&
    contract.so_data.is_display_website_pos === false &&
    contract.so_data.is_display_website_web === false
  ) {
    contractWebsite = [contract.lines_data[0].z_website_name];
    saleOrderTemplateName = contract.so_data.z_sale_template_category_name as string;
  }
  if (contract.so_data.z_order_type === OrderType.SignNew) {
    for (let i = 0; i < appendix.length; i++) {
      if (
        appendix[i].so_data.z_contract_expiry_date &&
        appendix[i].so_data.z_is_effect === 'YES' &&
        [OrderType.Renewal, OrderType.Upgrade].includes(appendix[i].so_data.z_order_type as string) &&
        new Date(appendix[i].so_data.z_contract_expiry_date as string).getTime() >
          new Date(contractExpiryDate as string).getTime()
      ) {
        contractExpiryDate = appendix[i].so_data.z_contract_expiry_date;
        saleOrderTemplateName = appendix[i].so_data.sale_order_template_id.name;
        contractWebsite = [];

        if (appendix[i].so_data.is_display_website_web === true) {
          contractWebsite.push(appendix[i].so_data.z_website_web);
        }
        if (appendix[i].so_data.is_display_website_pos === true) {
          contractWebsite.push(appendix[i].so_data.z_website_pos);
        }
        if (appendix[i].so_data.is_display_fnb_id === true) {
          contractWebsite.push(appendix[i].so_data.z_fnb_id);
        }
      }
    }
  }

  const diffTime = new Date().getTime() - new Date(contractExpiryDate as string).getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  const status: 'valid' | 'about_to_expire' | 'expired' | null =
    contractExpiryDate === false ? null : diffDays < -59 ? 'valid' : diffDays < 1 ? 'about_to_expire' : 'expired';
  return {
    contractExpiryDate,
    saleOrderTemplateName,
    contractWebsite,
    status,
  };
};
