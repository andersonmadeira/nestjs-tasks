import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(dto: FilterTasksDto): Promise<Task[]> {
    const { status, search } = dto
    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      )
    }

    return await query.getMany()
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto

    const task = new Task()

    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN

    await task.save()

    return task
  }
}
