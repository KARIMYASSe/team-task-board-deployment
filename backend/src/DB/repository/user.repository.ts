import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';

import { User, userDocument } from '../models/user.model';

import { DataBaseRepository } from './DataBase.repository';

@Injectable()
export class userRepositoryService extends DataBaseRepository<User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async findOneAndUpdate(
    query: QueryFilter<User>,
    data: Partial<User>,
  ): Promise<userDocument | null> {
    return this.userModel
      .findOneAndUpdate(query, data, {
        new: true,
      })
      .exec();
  }
  async findOneWithPassword(email: string): Promise<userDocument | null> {
    return this.userModel.findOne({ email }).select('+passwordHash').exec();
  }
}
