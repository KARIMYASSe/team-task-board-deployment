import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectRepositoryService } from './../DB/repository/project.repository';
import { CreateProjectDto } from './DTO/createProject.dto';
import { Project, projectDocument } from '../DB/models/project.model';
import { Request } from 'express';
import { Types } from 'mongoose';
import { UpdateProjectDto } from './DTO/updateProject.dto';
import { userRepositoryService } from './../DB/repository/user.repository';
import { AddMemberDto } from './DTO/addMember.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly _projectRepositoryService: ProjectRepositoryService,
    private readonly _userRepositoryService: userRepositoryService,
  ) {}
  async create(body: CreateProjectDto, req: Request): Promise<projectDocument> {
    const { name, description } = body;
    const user = req['user'];
    if (!name) {
      throw new ForbiddenException('you must enter the name');
    }

    return this._projectRepositoryService.create({
      name,
      description,
      owner: user.id,
      members: [user.id],
    });
  }

  async getAll(req: Request): Promise<projectDocument[]> {
    const user = req['user'];

    return this._projectRepositoryService.find({
      $or: [{ owner: user.id }, { members: user.id }],
    });
  }

  async getById(projectId: string, req: Request): Promise<projectDocument> {
    const user = req['user'];

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    const project = await this._projectRepositoryService.findOneWithOwner({
      _id: new Types.ObjectId(projectId),

      $or: [{ owner: user.id }, { members: user.id }],
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or you do not have access',
      );
    }

    return project;
  }

  async update(
    projectId: string,
    body: UpdateProjectDto,
    req: Request,
  ): Promise<projectDocument> {
    const user = req['user'];

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    const { name, description } = body;

    if (name === undefined && description === undefined) {
      throw new BadRequestException('Enter name or description to update');
    }

    const updateData: Partial<Project> = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    const updatedProject =
      await this._projectRepositoryService.findOneAndUpdate(
        {
          _id: new Types.ObjectId(projectId),
          owner: user.id,
        },
        updateData,
      );

    if (!updatedProject) {
      throw new NotFoundException(
        'Project not found or you are not the project owner',
      );
    }

    return updatedProject;
  }

  async delete(projectId: string, req: Request): Promise<{ message: string }> {
    const user = req['user'];

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    const deletedProject =
      await this._projectRepositoryService.findOneAndDelete({
        _id: new Types.ObjectId(projectId),
        owner: user.id,
      });

    if (!deletedProject) {
      throw new NotFoundException(
        'Project not found or you are not the project owner',
      );
    }

    return {
      message: 'Project deleted successfully',
    };
  }

  async addMember(
    projectId: string,
    body: AddMemberDto,
    req: Request,
  ): Promise<projectDocument> {
    const currentUser = req['user'];
    const email = body.email.trim().toLowerCase();

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    const project = await this._projectRepositoryService.findById(
      new Types.ObjectId(projectId),
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isAdmin = currentUser.role === 'admin';

    const isOwner = project.owner.toString() === currentUser.id.toString();

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException(
        'Only project owner or admin can add members',
      );
    }

    const member = await this._userRepositoryService.findOne({
      email,
    });

    if (!member) {
      throw new NotFoundException('User not found');
    }
    const userId = member._id.toString();

    const alreadyMember = project.members.some(
      (memberId) => memberId.toString() === userId,
    );

    if (alreadyMember) {
      throw new ConflictException('User is already a project member');
    }

    const updatedProject = await this._projectRepositoryService.addMember(
      {
        _id: new Types.ObjectId(projectId),
      },
      new Types.ObjectId(userId),
    );

    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }

    return updatedProject;
  }

  async removeMember(
    projectId: string,
    userId: string,
    req: Request,
  ): Promise<projectDocument> {
    const currentUser = req['user'];

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    if (!Types.ObjectId.isValid(projectId)) {
      throw new BadRequestException('Invalid project id');
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user id');
    }

    const project = await this._projectRepositoryService.findById(
      new Types.ObjectId(projectId),
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isAdmin = currentUser.role === 'admin';

    const isOwner = project.owner.toString() === currentUser._id.toString();
    if (!isAdmin && !isOwner) {
      throw new ForbiddenException(
        'Only project owner or admin can remove members',
      );
    }

    const ownerId = project.owner.toString();

    if (ownerId === userId) {
      throw new BadRequestException('Project owner cannot be removed');
    }

    const isMember = project.members.some(
      (memberId) => memberId.toString() === userId,
    );

    if (!isMember) {
      throw new NotFoundException('User is not a project member');
    }

    const updatedProject = await this._projectRepositoryService.removeMember(
      {
        _id: new Types.ObjectId(projectId),
      },
      new Types.ObjectId(userId),
    );

    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }

    return updatedProject;
  }
}
