import { createDatabaseConnection } from '../utils/database'
import { OPEN_READONLY, OPEN_READWRITE } from 'sqlite3'
import { Request, Response } from 'express'

type RoastDegree = 1 | 2 | 3 | 4 | 5 | null

type NewCoffeeRequest = {
  id: number
  name: string
  weight: number
  price: number
  roastDegree: RoastDegree
  userCode: string
}

type CoffeeResponse = Omit<NewCoffeeRequest, 'userCode'> | []

const isNewCoffeeRequest = (
  coffeeRequest: unknown
): coffeeRequest is NewCoffeeRequest => {
  if ((coffeeRequest as NewCoffeeRequest).userCode) {
    return true
  }
  return false
}
type FetchCoffeeRequest = { userCode: string }

const isFetchCoffeeRequest = (
  fetchCoffeeRequest: unknown
): fetchCoffeeRequest is FetchCoffeeRequest => {
  if ((fetchCoffeeRequest as FetchCoffeeRequest).userCode) {
    return true
  }
  return false
}

const fetchSQL = `SELECT id, name, weight, price, roast_degree as roastDegree 
FROM coffees
WHERE user_code = ?`

const insertSQL = `INSERT INTO coffees (name, price, weight, roast_degree, user_code) 
VALUES(?,?,?,?,?)`

const deleteSQL = `DELETE FROM coffees WHERE id = ? AND user_code = ?`

const fetchCoffees = (req: Request, res: Response) => {
  if (isFetchCoffeeRequest(req.body)) {
    const db = createDatabaseConnection(OPEN_READONLY)
    db.all(
      fetchSQL,
      [req.body.userCode],
      (err: Error, data: CoffeeResponse[]) => {
        if (err) {
          res.status(400).json({ error: err.message })
        }
        res.status(200).send(data)
      }
    )
    db.close()
    return
  }
  return res.status(400).json({ error: 'Tapahtui virhe' })
}

const addCoffee = (req: Request, res: Response) => {
  if (isNewCoffeeRequest(req.body)) {
    const { name, price, weight, roastDegree, userCode } = req.body
    const db = createDatabaseConnection(OPEN_READWRITE)
    db.all(
      insertSQL,
      [name, price, weight, roastDegree, userCode],
      (err: Error) => {
        if (err) {
          res.status(400).json({ error: err.message })
        }
      }
    )
    db.close()
    res.status(200).json({ success: 'success' })
    return
  }
  res.status(400).json({ error: 'Tapahtui virhe' })
}

const deleteCoffee = (req: Request, res: Response) => {
  if (req.body.id) {
    const db = createDatabaseConnection(OPEN_READWRITE)
    db.run(
      deleteSQL,
      [parseInt(req.body.id, 10), req.body.userCode],
      (err: Error) => {
        if (err) {
          res.status(400).json({ error: err.message })
        }
      }
    )
    db.close()
    res.status(200).json({ success: 'success' })
    return
  }
  res.status(400).json({ error: 'Tapahtui virhe' })
}

export { fetchCoffees, addCoffee, deleteCoffee }
export type { CoffeeResponse, NewCoffeeRequest, FetchCoffeeRequest }
