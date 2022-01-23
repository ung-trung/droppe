import { FC } from 'react'
import { IPopulatedCart } from '../types'
import ProductDetail from './ProductDetail'
import styles from '../styles/CartDetail.module.css'

const CardDetail: FC<{ cart: IPopulatedCart }> = ({ cart }) => {
	const pendingProducts = cart.products.filter(product => product.status === 'pending')
	const approvedProducts = cart.products.filter(product => product.status === 'approved')
	const rejectedProducts = cart.products.filter(product => product.status === 'rejected')

	return (
		<div className={styles.gridItem}>
			<div className={pendingProducts.length > 0 ? styles.notifierPending : styles.notifierSuccess}></div>
			<h2 className={styles.cartTitle}>{cart.user?.name.firstname}</h2>
			{pendingProducts.length > 0 && (
				<div className={styles.statusBlock}>
					<h3 className={styles.cartSubtitle}>Pending</h3>
					{pendingProducts.map(product => (
						<ProductDetail cartId={cart.id} product={product} key={product.productId}></ProductDetail>
					))}
				</div>
			)}
			{approvedProducts.length > 0 && (
				<div className={styles.statusBlock}>
					<h3 className={styles.cartSubtitle}>Approved</h3>
					{approvedProducts.map(product => (
						<ProductDetail cartId={cart.id} product={product} key={product.productId}></ProductDetail>
					))}
				</div>
			)}
			{rejectedProducts.length > 0 && (
				<div className={styles.statusBlock}>
					<h3 className={styles.cartSubtitle}>Rejected</h3>
					{rejectedProducts.map(product => (
						<ProductDetail cartId={cart.id} product={product} key={product.productId}></ProductDetail>
					))}
				</div>
			)}
		</div>
	)
}

export default CardDetail
