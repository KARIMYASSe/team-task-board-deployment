import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TaskRepositoryService } from '../DB/repository/task.repository';

import { ProjectRepositoryService } from '../DB/repository/project.repository';

import { userRepositoryService } from '../DB/repository/user.repository';
import { CreateTaskDto } from './DTO/createTask.dto';
import { Task, taskDocument, TaskStatus } from '../DB/models/task.model';
import { QueryFilter, Types } from 'mongoose';
import { Request } from 'express';
import { FilterTasksDto } from './DTO/filterTasks.dto';
import { UpdateTaskDto } from './DTO/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly _taskRepositoryService: TaskRepositoryService,

    private readonly _projectRepositoryService: ProjectRepositoryService,

    private readonly _userRepositoryService: userRepositoryService,
  ) {}

  async create(
    projectId: string,
    body: CreateTaskDto,
    req: Request,
  ): Promise<taskDocument> {
    const user = req['user'];
    const { description, title, dueDate, priority, assignee } = body;

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    const project = await this._projectRepositoryService.findById(
      new Types.ObjectId(projectId),
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const Admin = user.role === 'admin';

    const Owner = project.owner.toString() === user.id.toString();

    const isMember = project.members.some(
      (memberId) => memberId.toString() === user.id.toString(),
    );

    if (!Admin && !Owner && !isMember) {
      throw new ForbiddenException('You do not have access to this project');
    }

    const assigneeID = await this._userRepositoryService.findById(
      new Types.ObjectId(assignee),
    );

    if (!assigneeID) {
      throw new NotFoundException('Assignee user not found');
    }

    const isAssigneeMember = project.members.some(
      (memberId) => memberId.toString() === body.assignee,
    );

    if (!isAssigneeMember) {
      throw new BadRequestException('Assignee must be a project member');
    }

    const task = await this._taskRepositoryService.create({
      title,
      description,

      status: TaskStatus.TODO,

      priority,

      dueDate: new Date(body.dueDate),

      project: new Types.ObjectId(projectId),

      creator: user.id,

      assignee: assigneeID._id,
    });

    return task;
  }

  async getAll(
    projectId: string,
    filters: FilterTasksDto,
    req: Request,
  ): Promise<taskDocument[]> {
    const user = req['user'];

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    const project = await this._projectRepositoryService.findById(
      new Types.ObjectId(new Types.ObjectId(projectId)),
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const Admin = user.role === 'admin';

    const Owner = project.owner.toString() === user.id.toString();

    const isMember = project.members.some(
      (memberId) => memberId.toString() === user.id.toString(),
    );

    if (!Admin && !Owner && !isMember) {
      throw new ForbiddenException('You do not have access to this project');
    }

    const query: QueryFilter<Task> = {
      project: new Types.ObjectId(projectId),
    };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    if (filters.assignee) {
      query.assignee = new Types.ObjectId(filters.assignee);
    }

    return this._taskRepositoryService.findWithDetails(query);
  }

  async getById(
    projectId: string,
    taskId: string,
    req: Request,
  ): Promise<taskDocument> {
    const user = req['user'];

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    if (!Types.ObjectId.isValid(taskId)) {
      throw new BadRequestException('Invalid task id');
    }

    const project = await this._projectRepositoryService.findById(
      new Types.ObjectId(projectId),
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const Admin = user.role === 'admin';

    const Owner = project.owner.toString() === user.id.toString();

    const isMember = project.members.some(
      (memberId) => memberId.toString() === user.id.toString(),
    );

    if (!Admin && !Owner && !isMember) {
      throw new ForbiddenException('You do not have access to this project');
    }

    const task = await this._taskRepositoryService.findOneWithDetails({
      _id: new Types.ObjectId(taskId),
      project: new Types.ObjectId(projectId),
    });

    if (!task) {
      throw new NotFoundException('Task not found in this project');
    }

    return task;
  }

  async update(
    projectId: string,
    taskId: string,
    body: UpdateTaskDto,
    req: Request,
  ): Promise<taskDocument> {
    const User = req['user'];

    const { assignee, description, dueDate, priority, status, title } = body;

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    if (!Types.ObjectId.isValid(taskId)) {
      throw new BadRequestException('Invalid task id');
    }

    const hasUpdateData =
      title !== undefined ||
      description !== undefined ||
      status !== undefined ||
      priority !== undefined ||
      dueDate !== undefined ||
      assignee !== undefined;

    if (!hasUpdateData) {
      throw new BadRequestException('Enter at least one field to update');
    }

    const project = await this._projectRepositoryService.findById(
      new Types.ObjectId(projectId),
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const Admin = User.role === 'admin';

    const Owner = project.owner.toString() === User.id.toString();

    const ProjectMember = project.members.some(
      (memberId) => memberId.toString() === User.id.toString(),
    );

    if (!Admin && !Owner && !ProjectMember) {
      throw new ForbiddenException('You do not have access to this project');
    }

    const task = await this._taskRepositoryService.findOne({
      _id: new Types.ObjectId(taskId),
      project: new Types.ObjectId(projectId),
    });

    if (!task) {
      throw new NotFoundException('Task not found in this project');
    }

    const Creator = task.creator.toString() === User.id.toString();

    const isAssignee = task.assignee.toString() === User.id.toString();

    if (!Admin && !Owner && !Creator && !isAssignee) {
      throw new ForbiddenException('You are not allowed to update this task');
    }
    if (isAssignee && !Admin && !Owner && !Creator) {
      const hasForbiddenFields =
        title !== undefined ||
        description !== undefined ||
        priority !== undefined ||
        dueDate !== undefined ||
        assignee !== undefined;

      if (status === undefined || hasForbiddenFields) {
        throw new ForbiddenException('Assignee can update task status only');
      }
    }

    const updateData: Partial<Task> = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (priority !== undefined) {
      updateData.priority = priority;
    }

    if (dueDate !== undefined) {
      updateData.dueDate = new Date(dueDate);
    }

    if (assignee !== undefined) {
      const assigneeUser = await this._userRepositoryService.findById(
        new Types.ObjectId(assignee),
      );

      if (!assigneeUser) {
        throw new NotFoundException('Assignee user not found');
      }

      const isAssigneeProjectMember = project.members.some(
        (memberId) => memberId.toString() === assignee,
      );

      if (!isAssigneeProjectMember) {
        throw new BadRequestException('Assignee must be a project member');
      }

      updateData.assignee = assigneeUser._id;
    }

    const updatedTask = await this._taskRepositoryService.findOneAndUpdate(
      {
        _id: new Types.ObjectId(taskId),
        project: new Types.ObjectId(projectId),
      },
      updateData,
    );

    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }

    return updatedTask;
  }

  async delete(
    projectId: string,
    taskId: string,
    req: Request,
  ): Promise<{ message: string }> {
    const User = req['user'];

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    if (!Types.ObjectId.isValid(taskId)) {
      throw new BadRequestException('Invalid task id');
    }

    const project = await this._projectRepositoryService.findById(
      new Types.ObjectId(projectId),
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const Admin = User.role === 'admin';

    const Owner = project.owner.toString() === User.id.toString();

    const ProjectMember = project.members.some(
      (memberId) => memberId.toString() === User.id.toString(),
    );

    if (!Admin && !Owner && !ProjectMember) {
      throw new ForbiddenException('You do not have access to this project');
    }

    const task = await this._taskRepositoryService.findOne({
      _id: new Types.ObjectId(taskId),
      project: new Types.ObjectId(projectId),
    });

    if (!task) {
      throw new NotFoundException('Task not found in this project');
    }

    const Creator = task.creator.toString() === User.id.toString();

    if (!Admin && !Owner && !Creator) {
      throw new ForbiddenException('You are not allowed to delete this task');
    }

    const deletedTask = await this._taskRepositoryService.findOneAndDelete({
      _id: new Types.ObjectId(taskId),
      project: new Types.ObjectId(projectId),
    });

    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }

    return {
      message: 'Task deleted successfully',
    };
  }
}
