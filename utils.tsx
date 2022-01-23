import { IPopulatedCart, IPopulatedCartProduct } from './types'

interface IHash {
	[details: string]: number
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
			return {
				...cartProduct,
				hasDiscount: productFrequency > 1,
				discountPercentage: productFrequency > 1 ? productFrequency * 10 : 0,
				product: cartProduct?.product
					? {
							...cartProduct?.product,
							price:
								productFrequency > 1
									? cartProduct?.product.price * (1 - productFrequency / 10)
									: cartProduct?.product.price
					  }
					: cartProduct?.product
			}
		})
	}))
}
