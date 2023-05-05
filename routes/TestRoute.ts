import express, { Express, Request, Response } from 'express';

const app: Express = express();

const test = (): void => {
	app.get('/test', (req: Request, res: Response):void => {
	res.end(JSON.stringify({
		message: 'Ril',
		status: 200
	}))
})
}

export default test;

