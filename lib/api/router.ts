import { getAccount } from './routes/accounts/getAccount';
import { getAccountsTweets } from './routes/tweets/getAccountsTweets';
import { getEveryonesTweets } from './routes/tweets/getEveryonesTweets';
import express, { Express } from 'express';

const router = function (): Express {
  const app = express();

  app.use('/account', getAccount());
  app.use('/tweets', getEveryonesTweets());
  app.use('/tweets', getAccountsTweets());

  return app;
};

export {
  router
};
