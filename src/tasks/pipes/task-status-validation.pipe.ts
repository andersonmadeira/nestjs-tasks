import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../task.model'

export class TaskStatusValidation implements PipeTransform {
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`'${value}' is not a valid status.`)
    }

    return value
  }

  private isStatusValid(value: any) {
    return Object.values(TaskStatus).includes(value as TaskStatus)
  }
}
