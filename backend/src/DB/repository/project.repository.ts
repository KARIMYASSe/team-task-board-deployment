import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter, Types } from 'mongoose';
import { DataBaseRepository } from './DataBase.repository';
import { Project, projectDocument } from '../models/project.model';

@Injectable()
export class ProjectRepositoryService extends DataBaseRepository<Project> {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {
    super(projectModel);
  }

  async findOneAndUpdate(
    query: QueryFilter<Project>,
    data: Partial<Project>,
  ): Promise<projectDocument | null> {
    return this.projectModel
      .findOneAndUpdate(query, data, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async findOneAndDelete(
    query: QueryFilter<Project>,
  ): Promise<projectDocument | null> {
    return this.projectModel.findOneAndDelete(query).exec();
  }
  async findOneWithOwner(
    query: QueryFilter<Project>,
  ): Promise<projectDocument | null> {
    return this.projectModel.findOne(query).populate('owner members').exec();
  }

  async addMember(
    query: QueryFilter<Project>,
    userId: Types.ObjectId,
  ): Promise<projectDocument | null> {
    return this.projectModel
      .findOneAndUpdate(
        query,
        {
          $addToSet: {
            members: userId,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .populate('owner members')
      .exec();
  }

  async removeMember(
    query: QueryFilter<Project>,
    userId: Types.ObjectId,
  ): Promise<projectDocument | null> {
    return this.projectModel
      .findOneAndUpdate(
        query,
        {
          $pull: {
            members: userId,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .populate('owner members')
      .exec();
  }
}
