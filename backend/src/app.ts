import express, { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import { config } from 'dotenv';

// .env파일 설정
config();

const app = express();
const client = createClient({
  url: 'redis://redis:6379',
  password: 'password',
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
    await client.disconnect();
    res.send(`new word is ${inputWord}`);
  } catch (err) {
    // 에러가 발생하면 마찬가지로 레디스 서버를 꺼야한다.
    client.disconnect();
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
