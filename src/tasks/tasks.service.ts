import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import * as uuid from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAll(): Task[] {
    return this.tasks
  }

  filter(dto: FilterTasksDto): Task[] {
    const { status, search } = dto
    let tasks = this.getAll()

    if (status) {
      tasks = tasks.filter(t => t.status === status)
    }

    if (search) {
      tasks = tasks.filter(
        t => t.title.includes(search) || t.description.includes(search),
      )
    }

    return tasks
  }

  getById(id: string): Task {
    return this.tasks.find(t => t.id === id)
  }

  create(dto: CreateTaskDto): Task {
    const { title, description } = dto

    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)

    return task
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getById(id)

    if (task) {
      task.status = status
      return task
    }
  }

  delete(id: string): void {
    this.tasks.filter(t => t.id !== id)
  }
}
