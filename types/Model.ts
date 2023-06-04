import { Request, Response } from 'express'

type Model = (req: Request, res: Response) => Promise<Response | undefined>

export default Model 