import { AccountModel } from '../../../database/schema/accountSchema';
import { removeInternals } from '../../../database/utils/removeInternals';
import { Tweet } from '../../../domainModel/Tweet';
import { TweetModel } from '../../../database/schema/tweetSchema';
import express, { Express } from 'express';

const getAccountsTweets = function (): Express {
  const api = express();

  api.get('/byAccount/:handle', async (req, res): Promise<unknown> => {
    const { handle } = req.params;
    const account = await AccountModel.findOne({ handle }).exec();

    if (account === null) {
      return res.status(404).end();
    }

    const tweets = await TweetModel.
      find({
        // eslint-disable-next-line no-underscore-dangle
        account: account._id
      }).
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
  getAccountsTweets
};
