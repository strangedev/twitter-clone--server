import { authentication } from './middleware/authentication';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getAccount } from './routes/accounts/getAccount';
import { getAccountsTweets } from './routes/tweets/getAccountsTweets';
import { getEveryonesTweets } from './routes/tweets/getEveryonesTweets';
import { publishTweet } from './routes/tweets/publishTweet';
import { startSession } from './routes/sessions/startSession';
import { updateOwnBio } from './routes/accounts/updateOwnBio';
import express, { Express } from 'express';

const router = function (): Express {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(authentication());

  app.use('/sessions', startSession());

  app.use('/accounts', getAccount());
  app.use('/accounts', updateOwnBio());

  app.use('/tweets', getEveryonesTweets());
  app.use('/tweets', getAccountsTweets());
  app.use('/tweets', publishTweet());

  return app;
};

export {
  router
};
