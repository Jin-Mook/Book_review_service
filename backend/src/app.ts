import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('practice typescript!!!');
});

app.get('/test', (req, res, next) => {
  res.send('test');
});

app.listen('3000', () => {
  console.log('3000포트에서 서버 시작');
});
