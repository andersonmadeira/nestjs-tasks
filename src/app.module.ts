import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeOrgConfig } from './config/typeorm.config'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrgConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
