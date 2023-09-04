/**
 * @Description: 线路相关service
 * @Author: OceanH
 * @Date: 2023-09-01 18:21:48
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ShuttleLine,
  ShuttleShift,
  Car,
} from './entities/query-shuttle.entity';

@Injectable()
export class QueryShuttleService {
  constructor(
    @InjectRepository(ShuttleLine)
    private shuttleLineRepo: Repository<ShuttleLine>,
    @InjectRepository(ShuttleShift)
    private shuttleShiftRepo: Repository<ShuttleShift>,
    @InjectRepository(Car)
    private carRepo: Repository<Car>,
  ) {}

  // 常见线路列表
  async getFamiliarShuttles(size: number) {
    return {
      familiar_shuttle_list: await this.shuttleLineRepo.find({
        take: size,
      }),
    };
  }

  // 查询符合条件的班次列表
  async getShuttleList(
    start_region_id: number,
    final_region_id: number,
    shuttle_shift_date: string,
  ) {
    // 线路详情
    const lineDetail = await this.shuttleLineRepo.findOne({
      where: {
        start_region_id,
        final_region_id,
      },
      select: ['line_id', 'via_regions_name'],
    });
    if (!lineDetail) {
      throw new HttpException(`暂无该线路数据!`, HttpStatus.BAD_REQUEST);
    }
    // 线路id 和 途经站信息
    const { line_id } = lineDetail;
    const via_regions_name = lineDetail.via_regions_name.replace(/,/g, '-');

    // 符合条件的线路列表
    const shuttle_list = await this.shuttleShiftRepo.find({
      where: {
        shuttle_line_id: line_id,
        shuttle_shift_date,
      },
    });
    if (!shuttle_list) {
      throw new HttpException(
        '未查询到符合该条件的班次!',
        HttpStatus.BAD_REQUEST,
      );
    }
    // 车辆类型
    const car_models = await this.carRepo.find({
      select: ['car_model'],
    });
    //regular_shuttle_list固定班次：为固定班次，即固定在每天几点钟发车,班次较少
    const regular_shuttle_list = [];
    //flow_shuttle_list流水班次：每隔一段时间发车一次，班次多
    const flow_shuttle_list = [];
    for (const item of shuttle_list) {
      item['via_stations_name'] =
        via_regions_name === '' ? '直达' : via_regions_name;
      item['car_model'] = car_models[item.car_id].car_model;
      if (item.shuttle_shift_type == 1) {
        flow_shuttle_list.push(item);
      } else if (item.shuttle_shift_type == 2) {
        regular_shuttle_list.push(item);
      }
    }

    return {
      regular_shuttle_list,
      flow_shuttle_list,
    };
  }
}
