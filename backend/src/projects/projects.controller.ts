import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from './../Guards/user.guard';
import { CreateProjectDto } from './DTO/createProject.dto';
import type { Request } from 'express';
import { projectDocument } from '../DB/models/project.model';
import { UpdateProjectDto } from './DTO/updateProject.dto';
import { AddMemberDto } from './DTO/addMember.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async create(
    @Body() body: CreateProjectDto,
    @Req() req: Request,
  ): Promise<projectDocument> {
    return this.projectsService.create(body, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Req() req: Request): Promise<projectDocument[]> {
    return this.projectsService.getAll(req);
  }

  @Get(':projectId')
  @UseGuards(AuthGuard)
  async getById(
    @Param('projectId') projectId: string,
    @Req() req: Request,
  ): Promise<projectDocument> {
    return this.projectsService.getById(projectId, req);
  }

  @Patch(':projectId')
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async update(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDto,
    @Req() req: Request,
  ): Promise<projectDocument> {
    return this.projectsService.update(projectId, body, req);
  }

  @Delete(':projectId')
  @UseGuards(AuthGuard)
  async delete(
    @Param('projectId') projectId: string,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    return this.projectsService.delete(projectId, req);
  }

  @Post(':projectId/members')
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async addMember(
    @Param('projectId') projectId: string,
    @Body() body: AddMemberDto,
    @Req() req: Request,
  ): Promise<projectDocument> {
    return this.projectsService.addMember(projectId, body, req);
  }
  @Delete(':projectId/members/:userId')
  @UseGuards(AuthGuard)
  async removeMember(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
    @Req() req: Request,
  ): Promise<projectDocument> {
    return this.projectsService.removeMember(projectId, userId, req);
  }
}
