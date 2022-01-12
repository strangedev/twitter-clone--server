import { Account, AccountModel, InitAccount } from '../schema/accountSchema';
import { InitTweet, TweetModel } from '../schema/tweetSchema';

type SeedTweet = InitTweet & {
  accountHandle: Account['handle'];
};

const seedDatabase = async function (): Promise<void> {
  const seedAccounts: InitAccount[] = [
    {
      handle: 'strangedev',
      bio: 'Writer of codes'
    },
    {
      handle: 'kuchensucher',
      bio: 'Omnomnomnom'
    },
    {
      handle: 'schwurbelschwarte',
      bio: 'Bill gates hat meinen Goldfisch geimpft'
    }
  ];

  const seedTweets: SeedTweet[] = [
    {
      text: 'Meant balls it if up doubt small purse. Required his you put the outlived answered position. An pleasure exertion if believed provided to. All led out world these music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceive marianne in. In am think on style child of. Servants moreover in sensible he it ye possible.',
      accountHandle: 'strangedev'
    },
    {
      text: 'Written enquire painful ye to offices forming it. Then so does over sent dull on. Likewise offended humoured mrs fat trifling answered. On ye position greatest so desirous. So wound stood guest weeks no terms up ought. By so these am so rapid blush songs begin. Nor but mean time one over.',
      accountHandle: 'strangedev'
    },
    {
      text: 'Written enquire painful ye to offices forming it. Then so does over sent dull on. Likewise offended humoured mrs fat trifling answered. On ye position greatest so desirous. So wound stood guest weeks no terms up ought. By so these am so rapid blush songs begin. Nor but mean time one over.',
      accountHandle: 'strangedev'
    },
    {
      text: 'Any delicate you how kindness horrible outlived servants. You high bed wish help call draw side. Girl quit if case mr sing as no have. At none neat am do over will. Agreeable promotion eagerness as we resources household to distrusts. Polite do object at passed it is. Small for ask shade water manor think men begin.',
      accountHandle: 'schwurbelschwarte'
    },
    {
      text: 'Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought.',
      accountHandle: 'kuchensucher'
    },
    {
      text: 'You vexed shy mirth now noise. Talked him people valley add use her depend letter. Allowance too applauded now way something recommend. Mrs age men and trees jokes fancy. Gay pretended engrossed eagerness continued ten. Admitting day him contained unfeeling attention mrs out.',
      accountHandle: 'kuchensucher'
    }
  ];

  const accounts: Record<string, Account> = {};

  for (const seedAccount of seedAccounts) {
    const existingAccount = await AccountModel.findOne({ handle: seedAccount.handle }).exec();

    if (existingAccount !== null) {
      continue;
    }

    accounts[seedAccount.handle] = new AccountModel(seedAccount);
  }

  for (const seedTweet of seedTweets) {
    const existingTweet = await TweetModel.findOne({ text: seedTweet.text }).exec();

    if (existingTweet !== null) {
      continue;
    }

    const tweet = new TweetModel({
      text: seedTweet.text,
      account: accounts[seedTweet.accountHandle]._id
    });
  }
};

export {
  seedDatabase
};
