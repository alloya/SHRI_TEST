import { rest } from 'msw'
import { ProductShortInfo, Product, CheckoutFormData } from '../common/types'

export const handlers = [
  // rest.get(/.*/, () => {
  //   console.log('resolver')
  // }),
  rest.get('http://localhost/hw/store/api/products', (req, res, ctx) => {
    return res(
      ctx.json(mockData)
    )
  }),
  rest.post('http://localhost/hw/store/api/checkout', (req, res, ctx) => {
    return res(
      ctx.json({id: 1})
    )
  })
]


export const mockData: ProductShortInfo[] = [{
  id: 1,
  name: 'Intelligent Car',
  price: 883,
}, {
  id: 2,
  name: 'Intelligent Car',
  price: 883,
}]

export const mockDataFull: Product[] = [{
  id: 1,
  name: 'Intelligent Car',
  description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  price: 883,
  color: 'Magenta',
  material: 'Cotton',
}, {
  id: 2,
  name: 'Intelligent Car',
  description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  price: 883,
  color: 'Magenta',
  material: 'Cotton',
}]

export const mockForm: CheckoutFormData = {
  name: 'Name',
  phone: '89224479238',
  address: 'Address',
}