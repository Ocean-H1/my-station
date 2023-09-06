/**
 * @Description: 线路相关
 * @Author: OceanH
 * @Date: 2023-09-06 23:14:21
 */

export interface ILineInfo {
  line_id?: number;
  start_region: string;
  final_region: string;
  start_region_id: number;
  final_region_id: number;
  via_regions_id?: string;
  via_regions_name?: string;
}
