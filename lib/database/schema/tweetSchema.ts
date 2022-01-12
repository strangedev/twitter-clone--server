import { HydratedDocument, model, Schema } from 'mongoose';
import { Tweet as TweetType } from '../../domainModel/Tweet';

const tweet = new Schema({
  text: { type: String, index: false },
  publishedAt: { type: Date, default: Date.now },
  account: { type: Schema.Types.ObjectId, ref: 'Account' }
});
const TweetModel = model<TweetType>('Tweet', tweet);

type InitTweet = Omit<TweetType, 'account' | 'publishedAt'>;
type Tweet = HydratedDocument<TweetType>;

export {
  InitTweet,
  Tweet
};
export {
  TweetModel
};
