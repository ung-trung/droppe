import { FC } from 'react'
import { useAppContext } from '../context/appContext'
import CardDetail from './CartDetail'
import styles from '../styles/CartList.module.css'
const CardList: FC = () => {
	const { carts } = useAppContext()
	return (
		<div className={styles.gridContainer}>
			{carts.map(cart => (
				<CardDetail cart={cart} key={cart.id}></CardDetail>
			))}
		</div>
	)
}

export default CardList
