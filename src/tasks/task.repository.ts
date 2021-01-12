import { InternalServerErrorException, Logger } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository')

  async getTasks(dto: FilterTasksDto, user: User): Promise<Task[]> {
    const { status, search } = dto
    const query = this.createQueryBuilder('task')

    query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      )
    }

    try {
      return await query.getMany()
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}, filter: ${dto}`,
        error.stack,
      )
      throw new InternalServerErrorException()
    }
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = dto

    const task = new Task()

    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    task.user = user

    try {
      await task.save()
    } catch (error) {
      this.logger.error(
        `Failed to create task for user ${
          user.username
        }, data: ${JSON.stringify(dto)}`,
        error.stack,
      )
      throw new InternalServerErrorException()
    }

    return task
  }
}
