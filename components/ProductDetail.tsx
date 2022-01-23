import Image from 'next/image'
import React, { FC } from 'react'
import { IPopulatedCartProduct, ProductStatus } from '../types'
import deleteIcon from '../public/delete.svg'
import approveIcon from '../public/check.svg'
import returnIcon from '../public/return.svg'
import { useAppContext } from '../context/appContext'
import styles from '../styles/ProductDetail.module.css'

const ProductDetail: FC<{ cartId: number; product: IPopulatedCartProduct }> = ({ cartId, product }) => {
	const { updateCartProductStatus, updateCartProductQuantity } = useAppContext()
	return (
		<>
			<div className={styles.gridContainer}>
				<Image
					src={product.product?.image as string}
					alt={product.product?.description}
					width={80}
					height={80}
					layout="fixed"
				/>
				<div>
					<p className={styles.name}> {product.product?.title}</p>
					<p className={styles.price}>
						{product.hasDiscount && (
							<span className={styles.initialPrice}>{product.product?.initialPrice?.toFixed(2)}</span>
						)}{' '}
						€{product.product?.price.toFixed(2)}
					</p>
					{product.hasDiscount && <p className={styles.discount}> - {product.discountPercentage}%</p>}
					<p className={styles.quantity}>
						quantity:{' '}
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
					</p>
					<p className={styles.totalPrice}>Total: €{product.product?.totalPrice?.toFixed(2)} </p>
				</div>
			</div>
			<div className={styles.ctaContainer}>
				{product.status === 'pending' ? (
					<>
						<button
							className={`btn-icon ${styles.cta}`}
							onClick={() => {
								updateCartProductStatus({
									cartId,
									productId: product.productId,
									newStatus: ProductStatus.Approved
								})
							}}
						>
							<Image src={approveIcon} alt="approve icon"></Image>
						</button>{' '}
						<button
							className={`btn-icon ${styles.cta}`}
							onClick={() => {
								updateCartProductStatus({
									cartId,
									productId: product.productId,
									newStatus: ProductStatus.Rejected
								})
							}}
						>
							<Image src={deleteIcon} alt="delete icon"></Image>
						</button>
					</>
				) : (
					<button
						className={`btn-icon ${styles.cta}`}
						onClick={() => {
							updateCartProductStatus({
								cartId,
								productId: product.productId,
								newStatus: ProductStatus.Pending
							})
						}}
					>
						<Image src={returnIcon} alt="back icon"></Image>
					</button>
				)}
			</div>
		</>
	)
}

export default ProductDetail
