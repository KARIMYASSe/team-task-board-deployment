import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { projectModel } from './../DB/models/project.model';
import { ProjectRepositoryService } from './../DB/repository/project.repository';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [projectModel, UsersModule],
  providers: [ProjectsService, ProjectRepositoryService],
  controllers: [ProjectsController],
  exports: [ProjectRepositoryService],
})
export class ProjectsModule {}
