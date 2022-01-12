import { removeInternals } from '../../../database/utils/removeInternals';
import { Tweet } from '../../../domainModel/Tweet';
import { TweetModel } from '../../../database/schema/tweetSchema';
import express, { Express } from 'express';

const getEveryonesTweets = function (): Express {
  const api = express();

  api.get('/everyone', async (req, res): Promise<unknown> => {
    const tweets = await TweetModel.
      find().
      populate({
        path: 'account',
        transform: removeInternals
      }).
      exec();

    return res.json(tweets.map((tweet): Tweet => removeInternals(tweet)));
  });

  return api;
};

export {
  getEveryonesTweets
};
