/**
 * @Description: 类型文件出口
 * @Author: OceanH
 * @Date: 2023-09-05 08:29:29
 */

export type Passenger = {
  passenger_id: number;
  passenger_name: string;
  passenger_card_number: string;
  passenger_card_type: string; //证件类型: 身份证,军人证,护照,港澳居民来往内地通行证,台湾居民来往内地通行证,港澳台居民居住证
  ticket_type: string; //票种:成人票,携童票（成人可携带身高低于1.5m的儿童）,半票（身高超1.5m的儿童票）
  buying_insurance: boolean; //购买保险状态，true为购买
};
// 提交订单接口参数
export interface IBookOrderParams {
  shuttle_shift_id: number; //班次id
  contact_person_id: number; //紧急联系人id，勾选常用联系人需要写联系人id，手动填写联系人信息无需写紧急联系人id
  contact_person_phone_number: string; //紧急联系人电话
  contact_person_name: string; //紧急联系人姓名
  contact_person_email: string; //紧急联系人email，选填
  passenger: Passenger[]; // 乘客列表
}

// 订单信息
export interface IOrderInfo {
  order_number: string; //子订单号码
  shuttle_shift_time: string; //班次发车时间
  start_region: string; //始发地
  final_region: string; //目的地
  start_station: string; //始发客运站
  final_station: string; //目的地客运站
  ticket_price: string; //车票单价
  station_fee: string; //客运站服务费
  insurance_price: string; //保险费
  ticket_type: string; //票种
  shuttle_shift_id: number; //班次id
  passenger_name: string; //乘客姓名
  passenger_card_number: string; //乘客证件号码
  passenger_type: string; //乘客类型  成人、儿童
  car_model: string; //车型
  total_amount: string; //订单总价
}
