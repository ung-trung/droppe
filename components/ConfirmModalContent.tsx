import { FC } from 'react'
import { useAppContext } from '../context/appContext'
import { compareCarts } from '../utils'
import styles from '../styles/ConfirmModalContent.module.css'
import droppeApi from '../services/droppeApi'
const ConfirmModal: FC<{ closeModel: () => void }> = ({ closeModel }) => {
	const { initialCarts, carts } = useAppContext()
	// compare initial carts and carts
	const cartChanges = compareCarts(initialCarts, carts)
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Change Confirm</h1>
			{cartChanges.map(cartChange => {
				return (
					<div key={cartChange.id}>
						<>
							<h1>{cartChange.fullName}</h1>
							<ul>
								{cartChange.changes.map(productChange => {
									return (
										<li key={productChange.productId}>
											{productChange.title} changed <b> {productChange.type}</b> from{' '}
											<b> {productChange.initialValue} </b>to <b> {productChange.nextValue}</b>
										</li>
									)
								})}
							</ul>
						</>
					</div>
				)
			})}
			<div className={styles.ctaContainer}>
				<button
					onClick={() => {
						const promises = carts
							.filter(cart => cartChanges.some(cartChange => cartChange.id === cart.id))
							.map(cart => droppeApi.put(`/carts/${cart.id}`, cart))
						Promise.all(promises).then(() => {
							closeModel()
						})
					}}
					className={`btn ${styles.cta}`}
				>
					Confirm
				</button>
			</div>
		</div>
	)
}

export default ConfirmModal
