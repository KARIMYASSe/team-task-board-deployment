import { HydratedDocument, Model, QueryFilter, Types } from 'mongoose';

export abstract class DataBaseRepository<TSchema extends object> {
  constructor(protected readonly model: Model<TSchema>) {}

  async create(data: Partial<TSchema>): Promise<HydratedDocument<TSchema>> {
    return this.model.create(data);
  }

  async findOne(
    query: QueryFilter<TSchema>,
  ): Promise<HydratedDocument<TSchema> | null> {
    return this.model.findOne(query).exec();
  }

  async find(
    query: QueryFilter<TSchema>,
  ): Promise<HydratedDocument<TSchema>[]> {
    return this.model.find(query).exec();
  }

  async findById(
    id: Types.ObjectId,
  ): Promise<HydratedDocument<TSchema> | null> {
    return this.model.findById(id).exec();
  }
}
