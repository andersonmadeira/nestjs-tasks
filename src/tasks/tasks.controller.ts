import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatusValidation } from './pipes/task-status-validation.pipe'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  get(@Query(ValidationPipe) dto: FilterTasksDto): Promise<Task[]> {
    return this.taskService.getTasks(dto)
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto)
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.delete(id)
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status', TaskStatusValidation) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateStatus(id, status)
  }
}
