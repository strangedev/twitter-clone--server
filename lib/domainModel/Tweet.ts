import { Account } from './Account';

interface Tweet {
  text: string;
  publishedAt: Date;
  account: Account;
}

export type {
  Tweet
};
