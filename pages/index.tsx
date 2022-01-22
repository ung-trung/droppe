import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Droppe Xmas</title>
				<meta name="description" content="Droppe Xmas" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			Hello World
		</div>
	)
}

export default Home
