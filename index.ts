import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 5000;

app.get('/', (req: Request, res: Response):void => {
	res.send('Test');
});

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
})


