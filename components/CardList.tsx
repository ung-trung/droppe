import { FC } from 'react'
import { useAppContext } from '../context/appContext'
import CardDetail from './CartDetail'

const CardList: FC = () => {
	const { carts } = useAppContext()
	return (
		<div>
			{carts.map(cart => (
				<CardDetail cart={cart} key={cart.id}></CardDetail>
			))}
		</div>
	)
}

export default CardList
