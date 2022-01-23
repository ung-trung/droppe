export interface IPopulatedCart {
	id: number
	userId: number
	user?: IUserResponse
	date: Date
	products: IPopulatedCartProduct[]
	__v: number
}

export interface IPopulatedCartProduct extends Product {
	status: ProductStatus
	hasDiscount?: Boolean
	discountPercentage?: Number
	product?: IProductResponse
}

export enum ProductStatus {
	Pending = 'pending',
	Approved = 'approved',
	Rejected = 'rejected'
}

export interface ICartResponse {
	id: number
	userId: number
	date: Date
	products: Product[]
	__v: number
}

export interface Product {
	productId: number
	quantity: number
}

export interface IProductResponse {
	id: number
	title: string
	price: number
	description: string
	category: Category
	image: string
	rating: Rating
}

export interface IUserResponse {
	address: Address
	id: number
	email: string
	username: string
	password: string
	name: Name
	phone: string
	__v: number
}

export interface Address {
	geolocation: Geolocation
	city: string
	street: string
	number: number
	zipcode: string
}

export interface Geolocation {
	lat: string
	long: string
}

export interface Name {
	firstname: string
	lastname: string
}

export enum Category {
	Electronics = 'electronics',
	Jewelery = 'jewelery',
	MenSClothing = "men's clothing",
	WomenSClothing = "women's clothing"
}

export interface Rating {
	rate: number
	count: number
}

export interface ErrorResponse {
	error: string
}
