import express, {Request, Response} from 'express'
import { port } from './env.config';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hi!, How can I help you?');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})