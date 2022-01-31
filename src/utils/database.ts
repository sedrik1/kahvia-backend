import sqlite3 from 'sqlite3'
import dotenv from 'dotenv'
const sqlite = sqlite3.verbose()
dotenv.config()

const { DATABASE_FILE } = process.env

const createDatabaseConnection = (connectionType?: number) => {
  return new sqlite.Database(`${DATABASE_FILE}`, connectionType, error => {
    // eslint-disable-next-line no-console
    if (error) return console.error(error)
  })
}

export { createDatabaseConnection }
