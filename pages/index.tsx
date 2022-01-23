import axios from 'axios'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'

import Head from 'next/head'
import { useState } from 'react'
import Modal from 'react-modal'
import CardList from '../components/CardList'
import ConfirmModal from '../components/ConfirmModal'
import AppProvider from '../context/appContext'

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
				<h1 className="title">Manage Wishlists</h1>
				<h2 className="sub-title">This page is to help you manage the wish list</h2>
				<CardList></CardList>
				<button
					onClick={() => {
						setOpen(true)
					}}
				>
					Save
				</button>
				<Modal isOpen={open} onRequestClose={() => setOpen(false)}>
					<ConfirmModal />
				</Modal>
			</div>
		</AppProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await axios.get('http://localhost:3000/api/carts')
	return {
		props: { initialCarts: data }
	}
}

export default Home
