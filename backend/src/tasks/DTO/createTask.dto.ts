import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '../../DB/models/task.model';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsDateString()
  dueDate: string;

  @IsMongoId()
  assignee: string;
}
