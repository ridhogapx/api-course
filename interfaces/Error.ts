interface Error { 
	type: string, 
	value: string,
	msg: string,
	path: string,
	location: string
}

export default Error