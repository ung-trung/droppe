import { FC } from 'react'
import { useAppContext } from '../context/appContext'

const ConfirmModal: FC = () => {
	const { initialCarts, carts } = useAppContext()
	// compare initial carts and carts
	return <div>Modal Title</div>
}

export default ConfirmModal
