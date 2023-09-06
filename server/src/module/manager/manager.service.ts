import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ShuttleLine,
  ShuttleShift,
} from '../query-shuttle/entities/query-shuttle.entity';
import { Repository } from 'typeorm';
import { IShiftInfo } from 'src/types';
import { Region } from '../query-region/entities/query-region.entity';
import { ILineInfo } from 'src/types/line';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ShuttleShift)
    private shuttleShiftRepo: Repository<ShuttleShift>,
    @InjectRepository(ShuttleLine)
    private shuttleLineRepo: Repository<ShuttleLine>,
    @InjectRepository(Region)
    private regionRepo: Repository<Region>,
  ) {}

  // 用户权限校验
  async checkPermission(req) {
    const { perms } = req.user;
    return {
      // 用户权限等级
      perms_level: perms,
    };
  }

  // 查询班次
  async getShuttleInfoList(
    start_region_id: number,
    final_region_id: number,
    shuttle_shift_date: string,
    page: number,
    size: number,
  ) {
    const { line_id: shuttle_line_id } = await this.shuttleLineRepo
      .findOneOrFail({
        where: {
          start_region_id,
          final_region_id,
        },
        select: ['line_id'],
      })
      .catch(() => {
        throw new HttpException('暂无该线路数据!', HttpStatus.BAD_REQUEST);
      });

    const [shuttle_list, total] = await this.shuttleShiftRepo.findAndCount({
      where: {
        shuttle_line_id,
        shuttle_shift_date,
      },
      skip: page - 1,
      take: size,
    });
    if (shuttle_list.length === 0) {
      throw new HttpException('暂无符合条件的班次!', HttpStatus.BAD_REQUEST);
    }
    for (const shuttle of shuttle_list) {
      shuttle['status'] = shuttle.is_delete ? '禁用中' : '使用中';
    }

    return {
      shuttle_list,
      page,
      size,
      total,
    };
  }

  // 新建线路 并返回线路id
  async createShuttleLine(line_info: ILineInfo) {
    await this.shuttleLineRepo.save(line_info);
    const line_id = (
      await this.shuttleLineRepo.findOne({
        where: {
          start_region_id: line_info.start_region_id,
          final_region_id: line_info.final_region_id,
        },
        select: ['line_id'],
      })
    )?.line_id;
    return line_id;
  }

  // 新建班次
  async createShuttleInfo(body: IShiftInfo) {
    enum shiftTypeEnum {
      '流水班' = 1,
      '固定班' = 2,
    }
    enum lineTypeEnum {
      '高速' = 1,
      '低速' = 2,
    }

    const { start_region, final_region } = body;
    const { region_id: start_region_id } = await this.regionRepo.findOne({
      where: {
        region_name: start_region,
      },
      select: ['region_id'],
    });
    const { region_id: final_region_id } = await this.regionRepo.findOne({
      where: {
        region_name: final_region,
      },
      select: ['region_id'],
    });
    let line_id = (
      await this.shuttleLineRepo.findOneOrFail({
        where: {
          start_region,
          final_region,
        },
        select: ['line_id'],
      })
    )?.line_id;

    if (!line_id) {
      // 不存在的线路id 则创建新的线路
      line_id = await this.createShuttleLine({
        start_region,
        final_region,
        start_region_id,
        final_region_id,
      });
    }

    const shift_info = {
      ...body,
      line_type: lineTypeEnum[body.line_type] as number,
      shuttle_shift_type: shiftTypeEnum[body.shuttle_shift_type] as number,
      shuttle_line_id: line_id,
      car_id: 1,
      star: 0,
    };

    await this.shuttleShiftRepo.save(shift_info);
    return {};
  }
}
