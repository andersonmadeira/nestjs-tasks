import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatusValidation } from './pipes/task-status-validation.pipe'
import { Task, TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  get(@Query(ValidationPipe) dto: FilterTasksDto): Task[] {
    return Object.keys(dto).length > 0
      ? this.taskService.filter(dto)
      : this.taskService.getAll()
  }

  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.taskService.getById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto)
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidation) status: TaskStatus,
  ): Task {
    return this.taskService.updateStatus(id, status)
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.taskService.delete(id)
  }
}
