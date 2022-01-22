import axios from 'axios'

const droppeApi = axios.create({
	baseURL: 'https://fakestoreapi.com'
})

export default droppeApi
