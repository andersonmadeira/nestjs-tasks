import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'
import { DatabaseConfig } from 'src/config.type'

const dbConfig = config.get<DatabaseConfig>('db')

export const typeOrgConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: Number(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: Boolean(process.env.TYPEORM_SYNC) || dbConfig.synchronize,
}
