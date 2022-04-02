import express, { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

const app = express();
const client = createClient({
  url: 'redis://redis:6379',
});

app.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newId: string = req.params.id;

    console.log(newId);
    res.send(`new id: ${newId}`);
  } catch (err) {
    console.error(err);
    res.send('rule');
  }
});

app.get('/redis/:word', async (req, res, next) => {
  try {
    const newWord = req.params.word;
    await client.connect();
    await client.set('key', newWord);
    const inputWord = await client.get('key');
    res.send(`new word is ${inputWord}`);
  } catch (err) {
    console.error(err);
    res.send('error');
  }
});

app.get('/test', (req, res, next) => {
  console.log('test');
  console.log('test2');
  res.send('test3');
});

app.listen('3000', () => {
  console.log('3000포트에서 서버 시작');
});
