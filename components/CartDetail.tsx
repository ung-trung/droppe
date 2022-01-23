import { FC } from 'react'
import { IPopulatedCart } from '../types'
import ProductDetail from './ProductDetail'

const CardDetail: FC<{ cart: IPopulatedCart }> = ({ cart }) => {
	const pendingProducts = cart.products.filter(product => product.status === 'pending')
	const approvedProducts = cart.products.filter(product => product.status === 'approved')
	const rejectedProducts = cart.products.filter(product => product.status === 'rejected')
	return (
		<div className="card">
			<h1>{cart.user?.name.firstname}</h1>
			{pendingProducts.length > 0 && (
				<>
					<h1>Pending</h1>
					{pendingProducts.map(product => (
						<ProductDetail cartId={cart.id} product={product} key={product.productId}></ProductDetail>
					))}
				</>
			)}
			{approvedProducts.length > 0 && (
				<>
					<h1>Approved</h1>
					{approvedProducts.map(product => (
						<ProductDetail cartId={cart.id} product={product} key={product.productId}></ProductDetail>
					))}
				</>
			)}
			{rejectedProducts.length > 0 && (
				<>
					<h1>rejected</h1>
					{rejectedProducts.map(product => (
						<ProductDetail cartId={cart.id} product={product} key={product.productId}></ProductDetail>
					))}
				</>
			)}
		</div>
	)
}

export default CardDetail
