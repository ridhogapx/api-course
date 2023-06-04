type Token = {
	token: string
}

interface ResponseAPI {
	message: string,
	success: boolean,
	status: number,
	data: Token[]
}

export default ResponseAPI;