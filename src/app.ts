import express, { json, Application } from 'express';
import bodyParser from 'body-parser';
import router from './routers';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app: Application = express();
const address = '127.0.0.1:3000';

app.use(bodyParser.json());

app.use(json(), helmet(), morgan('dev'));

app.use('/v0', router);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
