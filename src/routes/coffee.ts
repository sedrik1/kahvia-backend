import express from 'express'
import { fetchCoffees, addCoffee, deleteCoffee } from '../controllers/coffee'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/deleteCoffee',
  [
    body('id').escape(),
    body('userCode').custom((_, { req }) => {
      if (req.body.userCode.length !== 41) {
        throw new Error('Käyttäjäkoodi väärin')
      }
    })
  ],
  deleteCoffee
)

router.post(
  '/fetchCoffees',
  [
    body('userCode').custom((_, { req }) => {
      if (req.body.userCode.length !== 41) {
        throw new Error('Käyttäjäkoodi väärin')
      }
    })
  ],
  fetchCoffees
)

router.post(
  '/addCoffee',
  [
    body('name').notEmpty().isString().escape(),
    body('weight').isNumeric().escape(),
    body('price').isNumeric().escape(),
    body('roastDegree')
      .isNumeric()
      .escape()
      .custom((_, { req }) => {
        if (req.body.roastDegree < 1 || req.body.roastDegree > 5) {
          throw new Error('Paahtoaste väärin')
        }
      }),
    body('userCode')
      .notEmpty()
      .isString()
      .escape()
      .custom((_, { req }) => {
        if (req.body.userCode.length !== 41) {
          throw new Error('Käyttäjäkoodi väärin')
        }
      })
  ],
  addCoffee
)

export default router
