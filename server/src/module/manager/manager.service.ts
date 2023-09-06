import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ShuttleLine,
  ShuttleShift,
} from '../query-shuttle/entities/query-shuttle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ShuttleShift)
    private shuttleShiftRepo: Repository<ShuttleShift>,
    @InjectRepository(ShuttleLine)
    private shuttleLineRepo: Repository<ShuttleLine>,
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
      skip: page,
      take: size,
    });
    if (!shuttle_list.length) {
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
}
