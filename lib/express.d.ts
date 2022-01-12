import { Account } from './database/schema/accountSchema';

declare global {
  declare namespace Express {
    export interface Request {
      account?: Account;
    }
  }
}
