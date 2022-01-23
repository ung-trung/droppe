import { createContext, useContext, useState, FC } from 'react'
import { IPopulatedCart, ProductStatus } from '../types'
import { transformDiscountCart } from '../utils'

interface UpdateCartProductQuantityParams {
	cartId: number
	productId: number
	newQuantity: number
}
interface UpdateCartProductStatusParams {
	cartId: number
	productId: number
	newStatus: ProductStatus
}

interface AppContextState {
	carts: IPopulatedCart[]
	initialCarts: IPopulatedCart[]
	updateCartProductQuantity: ({ cartId, productId, newQuantity }: UpdateCartProductQuantityParams) => void
	updateCartProductStatus: ({ cartId, productId, newStatus }: UpdateCartProductStatusParams) => void
}

const contextDefaultValues: AppContextState = {
	carts: [],
	initialCarts: [],
	updateCartProductQuantity: () => {},
	updateCartProductStatus: () => {}
}

export const AppContext = createContext<AppContextState>(contextDefaultValues)

export function useAppContext() {
	return useContext(AppContext)
}

const AppProvider: FC<{ initialCarts: IPopulatedCart[] }> = ({ children, initialCarts }) => {
	const [carts, setCarts] = useState(transformDiscountCart(initialCarts))
	const updateCartProductQuantity = ({ cartId, productId, newQuantity }: UpdateCartProductQuantityParams) => {
		setCarts(
			transformDiscountCart(
				carts.map(cart =>
					cart.id !== cartId
						? cart
						: {
								...cart,
								products: cart.products.map(product =>
									product.productId !== productId ? product : { ...product, quantity: newQuantity }
								)
						  }
				)
			)
		)
	}
	const updateCartProductStatus = ({ cartId, productId, newStatus }: UpdateCartProductStatusParams) => {
		setCarts(
			transformDiscountCart(
				carts.map(cart =>
					cart.id !== cartId
						? cart
						: {
								...cart,
								products: cart.products.map(product =>
									product.productId !== productId ? product : { ...product, status: newStatus }
								)
						  }
				)
			)
		)
	}

	return (
		<AppContext.Provider
			value={{
				initialCarts,
				carts,
				updateCartProductQuantity,
				updateCartProductStatus
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
