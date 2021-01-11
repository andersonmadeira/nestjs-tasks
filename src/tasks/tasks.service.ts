import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private repo: TaskRepository) {}

  async getTasks(dto: FilterTasksDto, user: User): Promise<Task[]> {
    return this.repo.getTasks(dto, user)
  }

  async getById(id: number, user: User): Promise<Task> {
    const task = await this.repo.findOne({ where: { id, userId: user.id } })

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    return task
  }

  create(dto: CreateTaskDto, user: User): Promise<Task> {
    return this.repo.createTask(dto, user)
  }

  async delete(id: number, user: User): Promise<void> {
    const result = await this.repo.delete({ id, userId: user.id })

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
  }

  async updateStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getById(id, user)

    task.status = status
    await task.save()

    return task
  }
}
