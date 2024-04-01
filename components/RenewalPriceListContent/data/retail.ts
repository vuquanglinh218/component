export interface Service {
  sale_order_template_id: number;
  order_type: string;
  category_name: string;
  use_period: number;
  priority: number;
  sale_order_template_type: string;
  product_name: string;
  product_unit_price: number;
  product_lst_price: number;
}

export const getRenewalPriceTable = (services: Service[], rootTable: string[][]) => {
  let filteredTable = [['service', ...services]];
  const listIndex = services
    .map((item) => {
      const index = rootTable[0].indexOf(item.category_name);
      return index !== -1 ? index : undefined;
    })
    .filter((item) => item !== undefined);

  rootTable.map((row, index) => {
    const newRow = listIndex.map((index) => row[index]);
    if (!newRow.every((item) => item === 'none')) {
      newRow.unshift(row[0]);
      if (index !== 0 && index !== 1) {
        filteredTable.push(newRow);
      }
    }
  });

  filteredTable = filteredTable.filter((row, index) => {
    if (
      (index + 1 < filteredTable.length && row[1] === undefined && filteredTable[index + 1][1] === undefined) ||
      (index + 1 === filteredTable.length && row[1] === undefined)
    ) {
      return false;
    }
    return true;
  });

  return filteredTable;
};

// prettier-ignore

export const retail = [
  ['Code'                                                                           , 'SCOIAL_START_UP'  , 'MARKET_START_UP'  , 'RETAIL_START_UP'  , 'RETAIL_PRO'               , 'OMNICHANNEL'               , 'OMNI_PLUS'                , 'WEB_BRAND'        , 'WEB_BASIC'        , 'WEB_PRO'          ],
  ['Header'                                                                         , 'Scoial Start Up'  , 'Market Start Up'  , 'Retail Start Up'  , 'Retail Pro'               , 'Omnichannel (OMNI_NO_WEB)' , 'Omni Plus'                , 'Web Brand'        , 'Web Basic'        , 'Web Pro'          ],
  ['Sản phẩm'                                                                       , 'Không giới hạn'   , 'Không giới hạn'   , 'Không giới hạn'   , 'Không giới hạn'           , 'Không giới hạn'            , 'Không giới hạn'           , 'Không giới hạn'   , 'Không giới hạn'   , 'Không giới hạn'   ],
  ['Nhân viên'                                                                      , 'Không giới hạn'   , 'Không giới hạn'   , '5 nhân viên'      , 'Không giới hạn'           , 'Không giới hạn'            , 'Không giới hạn'           , 'Không giới hạn'   , 'Không giới hạn'   , 'Không giới hạn'   ],
  ['Kho'                                                                            , '1 kho'            , '1 kho'            , '1 kho'            , '1 kho'                    , '1 kho'                     , '1 kho'                    , 'none'             , 'none'             , '1 kho'            ],
  ['Kênh bán hàng'                                                                  ,                    ,                    ,                    ,                            ,                             ,                            ,                    ,                    ,                    ],
  ['Fanpage'                                                                        , '1'                , 'none'             , 'none'             , '3'                        , '5'                         , '10'                       , 'none'             , 'none'             , '5'                ],
  ['Instagram'                                                                      , '1'                , 'none'             , 'none'             , '3'                        , '5'                         , '10'                       , 'none'             , 'none'             , '5'                ],
  ['Quản trị viên Fanpage'                                                          , '3'                , 'none'             , 'none'             , '5'                        , '15'                        , '30'                       , 'none'             , 'none'             , '15'               ],
  ['Gian hàn TMĐT (Shopee, Lazada, Sendo, Tiki, TikTok Shop)'                       , 'none'             , '1 Gian hàng'      , 'none'             , '10 Gian hàng'             , '20 Gian hàng'              , '40 Gian hàng'             , 'none'             , 'none'             , '20 Gian hàng'     ],
  ['Bán tại của hàng'                                                               , 'none'             , 'none'             , 'Có'               , 'Có'                       , 'Có'                        , 'Có'                       , 'none'             , 'none'             , 'none'             ],
  ['Web order - Trang đặt hàng online'                                              , 'none'             , 'none'             , 'none'             , 'Có'                       , 'Có'                        , 'Có'                       , 'none'             , 'none'             , 'none'             ],
  ['Kịch bản livestream/tháng'                                                      , '5'                , 'none'             , 'none'             , 'Không giới hạn'           , 'Không giới hạn'            , 'Không giới hạn'           , 'none'             , 'none'             , 'Không giới hạn'   ],
  ['Thiết kế website'                                                               ,                    ,                    ,                    ,                            ,                             ,                            ,                    ,                    ,                    ],
  ['Dung lượng website'                                                             , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , '5GB'                      , '5GB'              , '5GB'              , '5GB'              ],
  ['Giao diện website'                                                              , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , 'Có'                       , 'Có'               , 'Có'               , 'Có'               ],
  ['Responsive trên mọi thiết bị'                                                   , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , 'Có'                       , 'Có'               , 'Có'               , 'Có'               ],
  ['SSL - Chứng chỉ bảo mật'                                                        , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , 'Có'                       , 'Có'               , 'Có'               , 'Có'               ],
  ['Trang check out (Trang để KH hoàn tất thông tin đặt kết nối đối tác thanh toán' , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , 'Có'                       , 'none'             , 'Có'               , 'Có'               ],
  ['Kết nối đối tác thanh toán'                                                     , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , 'Có'                       , 'none'             , 'Có'               , 'Có'               ],
  ['Kết nối đối tác vận chuyển'                                                     , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , 'Có'                       , 'none'             , 'Có'               , 'Có'               ],
  ['Xử lý đơn hàng trên website'                                                    , 'none'             , 'none'             , 'none'             , 'none'                     , 'none'                      , 'Có'                       , 'none'             , 'Có'               , 'Có'               ],
  ['Quản lý bán hàng'                                                               ,                    ,                    ,                    ,                            ,                             ,                            ,                    ,                    ,                    ],
  ['Quản lý đơn hàng'                                                               , 'Quản lý đơn hàng' , 'Quản lý đơn hàng' , 'Quản lý đơn hàng' , 'Quản lý đơn hàng đa kênh' , 'Quản lý đơn hàng đa kênh'  , 'Quản lý đơn hàng đa kênh' , 'none'             , 'Quản lý đơn hàng' , 'Quản lý đơn hàng' ],
  ['Quản lý sản phẩm'                                                               , 'Quản lý sản phẩm' , 'Quản lý sản phẩm' , 'Quản lý sản phẩm' , 'Quản lý sản phẩm đa kênh' , 'Quản lý sản phẩm đa kênh'  , 'Quản lý sản phẩm đa kênh' , 'Quản lý sản phẩm' , 'Quản lý sản phẩm' , 'Quản lý sản phẩm' ],
  ['CRM & Marketing Automation'                                                     ,                    ,                    ,                    ,                            ,                             ,                            ,                    ,                    ,                    ],
  ['Phân nhóm khách hàng tự động'                                                   , 'none'             , 'none'             , 'none'             , 'none'                     , 'Có'                        , "Có"                       , 'none'             , 'none'             , 'none'             ],
  ['Gửi tin nhắn tự động qua Facebook/Zalo/SMS theo kịch bản'                       , 'none'             , 'none'             , 'none'             , 'none'                     , 'Có'                        , "Có"                       , 'none'             , 'none'             , 'none'             ],
  ['Chăm sóc khách hàng sau bán'                                                    ,                    ,                    ,                    ,                            ,                             ,                            ,                    ,                    ,                    ],
  ['Tích điểm đa kênh'                                                              , 'none'             , 'none'             , 'none'             , 'Có'                       , 'Có'                        , "Có"                       , 'none'             , 'none'             , 'none'             ],
  ['Chương trình hạng thành viên'                                                   , 'none'             , 'none'             , 'none'             , 'Có'                       , 'Có'                        , "Có"                       , 'none'             , 'none'             , 'none'             ],
  ['Đổi thưởng đa kênh'                                                             , 'none'             , 'none'             , 'none'             , 'none'                     , 'Có'                        , "Có"                       , 'none'             , 'none'             , 'none'             ]
];
