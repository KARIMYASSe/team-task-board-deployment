import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model, QueryFilter } from 'mongoose';

import { Task, taskDocument } from '../models/task.model';

import { DataBaseRepository } from './DataBase.repository';

@Injectable()
export class TaskRepositoryService extends DataBaseRepository<Task> {
  constructor(
    @InjectModel(Task.name)
    private readonly taskMongoModel: Model<Task>,
  ) {
    super(taskMongoModel);
  }

  async findOneAndUpdate(
    query: QueryFilter<Task>,
    data: Partial<Task>,
  ): Promise<taskDocument | null> {
    return this.taskMongoModel
      .findOneAndUpdate(query, data, {
        new: true,
        runValidators: true,
      })
      .populate('creator assignee')
      .exec();
  }

  async findOneAndDelete(
    query: QueryFilter<Task>,
  ): Promise<taskDocument | null> {
    return this.taskMongoModel.findOneAndDelete(query).exec();
  }

  async findWithDetails(query: QueryFilter<Task>): Promise<taskDocument[]> {
    return this.taskMongoModel
      .find(query)
      .populate('creator assignee')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOneWithDetails(
    query: QueryFilter<Task>,
  ): Promise<taskDocument | null> {
    return this.taskMongoModel
      .findOne(query)
      .populate('creator assignee')
      .exec();
  }
}
