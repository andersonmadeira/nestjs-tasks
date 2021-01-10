import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private repo: TaskRepository) {}

  async getTasks(dto: FilterTasksDto): Promise<Task[]> {
    return this.repo.getTasks(dto)
  }

  async getById(id: number): Promise<Task> {
    const task = await this.repo.findOne(id)

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    return task
  }

  create(dto: CreateTaskDto): Promise<Task> {
    return this.repo.createTask(dto)
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getById(id)

    task.status = status
    await task.save()

    return task
  }
}
