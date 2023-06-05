import { Request, Response } from 'express'
import { GoogleSchema } from '../models/Google/Schema'
import generateToken from '../middlewares/Token/TokenGenerator'

const GoogleProtected = async(req: Request | any, res: Response): Promise<Response | void> => {
	const [user, created] = await GoogleSchema.findOrCreate({
		where: {
			email: req.user.email,
			name: req.user.displayName
		}
	})

	const role: number = user.role
	const email: string = user.email

	const token: string = generateToken(email,role)

	return res.redirect(`http://localhost:5173/${token}`)


}

export default GoogleProtected