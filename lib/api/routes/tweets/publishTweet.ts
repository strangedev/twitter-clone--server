import { Parser } from 'validate-value';
import express, { Express } from 'express';
import { InitTweet, TweetModel } from '../../../database/schema/tweetSchema';

type PublishTweetRequest = InitTweet;

const publishTweetRequestParser = new Parser<PublishTweetRequest>({
  type: 'object',
  properties: {
    text: {
      type: 'string',
      minLength: 1,
      maxLength: 240
    }
  }
});

const publishTweet = function (): Express {
  const api = express();

  api.post('/publish', async (req, res): Promise<unknown> => {
    const { account } = req;

    if (!account) {
      return res.status(401).end();
    }

    const parserResult = publishTweetRequestParser.parse(req.body);

    if (parserResult.hasError()) {
      return res.status(400).json(parserResult.error);
    }

    const { text } = parserResult.value;
    // eslint-disable-next-line no-underscore-dangle
    const tweet = new TweetModel({ text, account: account._id });

    await tweet.save();

    return res.status(200).end();
  });

  return api;
};

export {
  publishTweet
};
