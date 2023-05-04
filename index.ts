import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 3000;

interface Dummy {
	id: number,
	message: string,
	success: boolean,
}

// Test Dummy data
const dummyData: Dummy = {
	id: 6969,
	message: 'Data is retrieved',
	success: true
}


app.get('/', (req: Request, res: Response):void => {
	res.send(JSON.stringify(dummyData));
});

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
})


