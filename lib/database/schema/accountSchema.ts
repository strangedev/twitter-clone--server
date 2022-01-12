import { Account as AccountType } from '../../domainModel/Account';
import { HydratedDocument, model, Schema } from 'mongoose';

const accountSchema = new Schema({
  handle: { type: String, index: true },
  bio: { type: String, index: false },
  picture: { type: Schema.Types.ObjectId, ref: 'ProfilePicture' }
});
const AccountModel = model<AccountType>('Account', accountSchema);

type InitAccount = Omit<AccountType, 'picture'>;
type Account = HydratedDocument<AccountType>;

export type {
  Account,
  InitAccount
};
export {
  AccountModel
};
