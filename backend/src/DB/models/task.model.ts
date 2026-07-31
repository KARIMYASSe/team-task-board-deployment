import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';

import { Project } from './project.model';
import { User } from './user.model';

export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'tasks',
})
export class Task {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 150,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxLength: 2000,
  })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Prop({
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Prop({
    type: Date,
    required: true,
  })
  dueDate: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Project.name,
    required: true,
  })
  project: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  creator: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  assignee: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type taskDocument = HydratedDocument<Task>;

export const taskModel = MongooseModule.forFeature([
  {
    name: Task.name,
    schema: TaskSchema,
  },
]);
