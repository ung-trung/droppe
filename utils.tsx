import { IPopulatedCart, IPopulatedCartProduct, IProductResponse, ProductStatus } from './types'

interface IHash {
	[id: string]: number
}

enum ChangeType {
	Quantity = 'quantity',
	Status = 'status'
}

interface Change {
	productId: number
	title?: string
	type: ChangeType
	initialValue?: number | ProductStatus
	nextValue: number | ProductStatus
}

interface compareCartsResult {
	id: number
	fullName?: string
	changes: Change[]
}

export const transformDiscountCart = (carts: IPopulatedCart[]): IPopulatedCart[] => {
	// generate hashmap of product frequency
	let hashmap: IHash = {}
	for (let i = 0; i < carts.length; i++) {
		for (let j = 0; j < carts[i].products.length; j++) {
			const productId = carts[i].products[j].productId
			if (!hashmap.hasOwnProperty(productId)) {
				hashmap[productId] = 0
			}
			hashmap[productId] += 1
		}
	}
	// apply hashmap on carts to map discount product
	return carts.map(cart => ({
		...cart,
		products: cart.products.map(cartProduct => {
			const productFrequency = hashmap[cartProduct.productId]
			const price = cartProduct?.product
				? productFrequency > 1
					? cartProduct?.product.price * (1 - productFrequency / 10)
					: cartProduct?.product.price
				: 0
			return {
				...cartProduct,
				hasDiscount: productFrequency > 1,
				discountPercentage: productFrequency > 1 ? productFrequency * 10 : 0,
				product: cartProduct?.product
					? {
							...cartProduct?.product,
							initialPrice: cartProduct?.product.price,
							price,
							totalPrice: price * cartProduct.quantity
					  }
					: cartProduct?.product
			}
		})
	}))
}

const findProductsChange = (
	initialProducts: IPopulatedCartProduct[],
	products: IPopulatedCartProduct[]
): Change[] | [] => {
	let result = []
	for (const product of products) {
		const initialProduct = initialProducts.find(iProduct => iProduct.productId === product.productId)
		if (initialProduct?.quantity !== product.quantity) {
			result.push({
				productId: product.productId,
				title: product.product?.title,
				type: ChangeType.Quantity,
				initialValue: initialProduct?.quantity,
				nextValue: product.quantity
			})
		}
		if (initialProduct?.status !== product.status) {
			result.push({
				productId: product.productId,
				title: product.product?.title,
				type: ChangeType.Status,
				initialValue: initialProduct?.status,
				nextValue: product.status
			})
		}
	}
	return result
}

export const compareCarts = (initialCarts: IPopulatedCart[], carts: IPopulatedCart[]): compareCartsResult[] => {
	return carts
		.map(cart => {
			const initialCart = initialCarts.find(({ id }) => id === cart.id)
			return {
				id: cart.id,
				fullName: `${cart.user?.name.firstname} ${cart.user?.name.lastname}`,
				changes: findProductsChange(initialCart?.products as IPopulatedCartProduct[], cart.products)
			}
		})
		.filter(({ changes }) => changes.length > 0)
}
