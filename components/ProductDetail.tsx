import Image from 'next/image'
import React, { FC } from 'react'
import { IPopulatedCartProduct, ProductStatus } from '../types'
import deleteIcon from '../public/delete.svg'
import approveIcon from '../public/check.svg'
import returnIcon from '../public/return.svg'
import { useAppContext } from '../context/appContext'
const ProductDetail: FC<{ cartId: number; product: IPopulatedCartProduct }> = ({ cartId, product }) => {
	const { updateCartProductStatus, updateCartProductQuantity } = useAppContext()
	return (
		<div>
			<Image src={product.product?.image as string} alt={product.product?.description} width={100} height={100} />
			<p> {product.product?.title}</p>
			<p> {product.product?.price}</p>
			{product.hasDiscount && <p> discount {product.discountPercentage}%</p>}
			quantity:
			<select
				value={product.quantity}
				onChange={e => {
					updateCartProductQuantity({
						cartId,
						productId: product.productId,
						newQuantity: Number(e.target.value)
					})
				}}
			>
				{Array.from(Array(11).keys()).map(v => (
					<option key={v} value={v}>
						{v}
					</option>
				))}
			</select>
			{product.status === 'pending' ? (
				<>
					<button
						onClick={() => {
							updateCartProductStatus({
								cartId,
								productId: product.productId,
								newStatus: ProductStatus.Rejected
							})
						}}
					>
						<Image src={deleteIcon}></Image>
					</button>
					<button
						onClick={() => {
							updateCartProductStatus({
								cartId,
								productId: product.productId,
								newStatus: ProductStatus.Approved
							})
						}}
					>
						<Image src={approveIcon}></Image>
					</button>
				</>
			) : (
				<button
					onClick={() => {
						updateCartProductStatus({
							cartId,
							productId: product.productId,
							newStatus: ProductStatus.Pending
						})
					}}
				>
					<Image src={returnIcon}></Image>
				</button>
			)}
		</div>
	)
}

export default ProductDetail
