import { captureRejections } from 'events'
import type { NextApiRequest, NextApiResponse } from 'next'
import droppeApi from '../../services/droppeApi'
import { ErrorResponse, ICartResponse, IPopulatedCart, IProductResponse, IUserResponse, ProductStatus } from '../../types'

const getRandomIntInclusive = (min: number, max: number) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomStatus = () => {
	const allStatuses = [ProductStatus.Pending, ProductStatus.Confirmed, ProductStatus.Rejected]
	return allStatuses[getRandomIntInclusive(0, 2)]
}


export default async (req: NextApiRequest, res: NextApiResponse<IPopulatedCart[] | ErrorResponse>) => {
	try {
		const get5Carts = droppeApi.get('/carts?limit=5')
		const getAllProducts = droppeApi.get('/products')
		const getAllUsers = droppeApi.get('/users')

		const [cartsResponse, productsResponse, usersResponse] = await Promise.all([get5Carts, getAllProducts, getAllUsers])

		const cartsData: ICartResponse[] = cartsResponse.data
		const productsData: IProductResponse[] = productsResponse.data
		const usersData: IUserResponse[] = usersResponse.data

		const populatedCarts: IPopulatedCart[] = cartsData.map(cart => {
			const populatedProducts = cart.products.map(cartProduct => {
				return {
					...cartProduct,
					status: getRandomStatus(),
					product: productsData.find(product => product.id === cartProduct.productId)
				}
			})
			return { ...cart, products: populatedProducts, user: usersData.find(user => user.id === cart.userId) }
		})
		res.status(200).json(populatedCarts)
	} catch (error) {
		res.status(500).json({ error: 'failed to load data' })
	}
}
