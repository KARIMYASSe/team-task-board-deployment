import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from './user.model';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'projects',
})
export class Project {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
  })
  name!: string;

  @Prop({
    type: String,
    trim: true,
    maxLength: 1000,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner!: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: User.name }],
    default: [],
  })
  members!: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
export type projectDocument = HydratedDocument<Project>;
export const projectModel = MongooseModule.forFeature([
  { name: Project.name, schema: ProjectSchema },
]);
