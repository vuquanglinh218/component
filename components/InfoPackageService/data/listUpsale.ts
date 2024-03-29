export enum TypeAction {
  extend = 'EXTEND',
  contact = 'CONTACT',
  byMore = 'BY-MORE',
}

export const listUpSale = [
  {
    name: 'Chi nhánh',
    price: '160.000',
    unit: '/chi nhánh/tháng',
    action: TypeAction.extend,
  },
  {
    name: 'Dung lượng website',
    price: '120.000',
    unit: '/GB/tháng',
    action: TypeAction.byMore,
  },
  {
    name: 'Quản trị viên',
    price: '20.000',
    unit: '/QTV/tháng',
    action: TypeAction.contact,
  },
  {
    name: 'Trang Instagram',
    price: '50.000',
    unit: '/tháng',
    action: TypeAction.contact,
  },
  {
    name: 'Gian hàng trên sàn TMĐT',
    price: '30.000',
    unit: '/tháng',
    action: TypeAction.contact,
  },
  {
    name: 'Fanpage',
    price: '50.000',
    unit: '/tháng',
    action: TypeAction.contact,
  },
  {
    name: 'Mô tả tự động bằng AI',
    price: '50.000',
    unit: '/tháng',
    action: TypeAction.contact,
  },
  {
    name: 'Dung lượng social',
    price: '30.000',
    unit: '/GB/tháng',
    action: TypeAction.contact,
  },
  {
    name: 'Tài khoản nhân viên',
    price: '250.000',
    unit: '/tài khoản',
    action: TypeAction.contact,
  },
];
