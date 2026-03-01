import "dotenv/config"

// dotenv.config();

export const PORT:        number             = process.env.PORT ? +process.env.PORT : 3000
export const DB_HOST:     string | undefined = process.env.DB_HOST ? process.env.DB_HOST : "localhost"
export const DB_PORT:     number | undefined = process.env.DB_PORT ? +process.env.DB_PORT : 5432
export const DB_USERNAME: string | undefined = process.env.DB_USERNAME
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD
export const DB_DATABASE: string | undefined = process.env.DB_DATABASE
export const DB_SYNC:     boolean            = process.env.DB_SYNC ? process.env.DB_SYNC === "true" : false
export const DB_DROP:     boolean            = process.env.DB_DROP ? process.env.DB_DROP === "true" : false
export const DB_LOGGING:  boolean            = process.env.DB_LOGGING ? process.env.DB_LOGGING === "true" : true


