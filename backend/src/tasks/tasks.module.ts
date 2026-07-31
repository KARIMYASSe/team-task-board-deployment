import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { taskModel } from './../DB/models/task.model';
import { ProjectsModule } from './../projects/projects.module';
import { UsersModule } from './../users/users.module';
import { TaskRepositoryService } from './../DB/repository/task.repository';

@Module({
  imports: [taskModel, ProjectsModule, UsersModule],

  providers: [TasksService, TaskRepositoryService],
  controllers: [TasksController],
  exports: [TaskRepositoryService],
})
export class TasksModule {}
