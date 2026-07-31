import { IsEnum, IsMongoId, IsOptional } from 'class-validator';

import { TaskPriority, TaskStatus } from '../../DB/models/task.model';

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsMongoId()
  assignee?: string;
}
