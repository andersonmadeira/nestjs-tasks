import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as config from 'config'
import { ServerConfig } from './config.type'

async function bootstrap() {
  const serverConfig = config.get<ServerConfig>('server')
  const app = await NestFactory.create(AppModule)

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.enableCors()
  }

  await app.listen(process.env.PORT || serverConfig.port)
}

bootstrap()
