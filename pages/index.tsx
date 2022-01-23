import axios from 'axios'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'

import Head from 'next/head'
import { useState } from 'react'
import Modal from 'react-modal'
import CardList from '../components/CardList'
import ConfirmModal from '../components/ConfirmModalContent'
import AppProvider from '../context/appContext'
import styles from '../styles/Home.module.css'
Modal.setAppElement('#__next')

const Home: NextPage = ({ initialCarts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [open, setOpen] = useState(false)
	return (
		<AppProvider initialCarts={initialCarts}>
			<div>
				<Head>
					<title>Droppe Xmas</title>
					<meta name="description" content="Droppe Xmas" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="container">
					<h1 className={styles.title}>Droppe Xmas</h1>
					<h2 className={styles.subtitle}>This page helps you manage your family's wishlists</h2>
					<CardList></CardList>
					<div className={styles.ctaContainer}>
						<button
							className={`btn ${styles.cta}`}
							onClick={() => {
								setOpen(true)
							}}
						>
							Save
						</button>
					</div>
					<Modal
						isOpen={open}
						className="modal"
						overlayClassName="modal-overlay"
						onRequestClose={() => setOpen(false)}
					>
						<ConfirmModal closeModel={() => setOpen(false)} />
					</Modal>
				</div>
			</div>
		</AppProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await axios.get('https://youthful-einstein-c3a68f.netlify.app/api/carts')
	return {
		props: { initialCarts: data }
	}
}

export default Home
