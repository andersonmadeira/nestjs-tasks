import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwe123',
  database: 'tasks',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}
