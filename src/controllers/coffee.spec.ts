import { Request, Response } from 'express'
import { fetchCoffees } from './coffee'

describe('fetch all coffees', () => {
  const mockRequest: Partial<Request> = {
    body: { userCode: 'TKLX3G5P96IYV0N2W47EJFBUQO8556598MDAR1HCZ' }
  }
  let mockResponse: Partial<Response>
  let responseResult = {}

  beforeEach(() => {
    mockResponse = {
      statusCode: 0,
      send: jest.fn().mockImplementation(result => {
        responseResult = result
      })
    }
  })

  test('200 - fetchCoffees', () => {
    const expectedResponse = [
      {
        id: 1,
        name: 'name',
        weight: 100,
        price: 10,
        roastDegree: '2,3'
      }
    ]
    fetchCoffees(mockRequest as Request, mockResponse as Response)
    expect(responseResult).toBe(expectedResponse)
  })
})
