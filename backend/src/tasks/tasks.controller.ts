import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import type { Request } from 'express';

import { AuthGuard } from '../Guards/user.guard';
import type { taskDocument } from '../DB/models/task.model';

import { CreateTaskDto } from './DTO/createTask.dto';
import { TasksService } from './tasks.service';
import { FilterTasksDto } from './DTO/filterTasks.dto';
import { UpdateTaskDto } from './DTO/updateTask.dto';

@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async create(
    @Param('projectId') projectId: string,
    @Body() body: CreateTaskDto,
    @Req() req: Request,
  ): Promise<taskDocument> {
    return this.tasksService.create(projectId, body, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async getAll(
    @Param('projectId') projectId: string,
    @Query() filters: FilterTasksDto,
    @Req() req: Request,
  ): Promise<taskDocument[]> {
    return this.tasksService.getAll(projectId, filters, req);
  }

  @Get(':taskId')
  @UseGuards(AuthGuard)
  async getById(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Req() req: Request,
  ): Promise<taskDocument> {
    return this.tasksService.getById(projectId, taskId, req);
  }

  @Patch(':taskId')
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async update(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskDto,
    @Req() req: Request,
  ): Promise<taskDocument> {
    return this.tasksService.update(projectId, taskId, body, req);
  }

  @Delete(':taskId')
  @UseGuards(AuthGuard)
  async delete(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    return this.tasksService.delete(projectId, taskId, req);
  }
}
