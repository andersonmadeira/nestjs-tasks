export interface ServerConfig {
  port: number
}

export interface DatabaseConfig {
  type: 'postgres'
  synchronize: boolean
  host?: string
  port?: number
  username?: string
  password?: string
  database?: string
}

export interface JwtConfig {
  expiresIn: number
  secret?: string
}

export interface Config {
  server: ServerConfig
  db: DatabaseConfig
  jwt: JwtConfig
}
