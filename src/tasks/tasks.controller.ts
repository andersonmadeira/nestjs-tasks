import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatusValidation } from './pipes/task-status-validation.pipe'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  get(@Query(ValidationPipe) dto: FilterTasksDto): Promise<Task[]> {
    return this.service.getTasks(dto)
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.service.getById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() dto: CreateTaskDto, @GetUser() user: User) {
    return this.service.create(dto, user)
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(id)
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status', TaskStatusValidation) status: TaskStatus,
  ): Promise<Task> {
    return this.service.updateStatus(id, status)
  }
}
