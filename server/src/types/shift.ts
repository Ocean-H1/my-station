/**
 * @Description: 班次信息相关
 * @Author: OceanH
 * @Date: 2023-09-06 22:08:34
 */

export interface IShiftInfo {
  shift_id: number;
  shuttle_shift_date: string;
  shuttle_shift_time: string;
  start_region: string;
  final_region: string;
  start_station: string;
  final_station: string;
  ticket_quantity: number;
  child_ticket_quantity: number;
  unuse_ticket_quantity: number;
  unuse_child_ticket_quantity: number;
  ticket_price: string;
  refund_fee: string;
  station_fee: string;
  insurance_price: string;
  shuttle_shift_type: string;
  line_type: string;
  duration: string;
  full_length: string;
  status: string;
  station_number: string;
}

export enum ShiftStatusEnum {
  '使用中' = 0,
  '禁用中' = 1,
}
