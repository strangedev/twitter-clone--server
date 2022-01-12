import { Credentials as CredentialsType } from '../../domainModel/Credentials';
import { HydratedDocument, model, Schema } from 'mongoose';

const credentialsSchema = new Schema({
  handle: { type: String, index: true },
  passwordHash: { type: String, index: false },
  passwordSalt: { type: String, index: false },
  hashMethod: {
    hashFunction: { type: String, index: false },
    iterations: { type: Number, index: false },
    saltMethod: { type: String, index: false }
  }
});
const CredentialsModel = model<CredentialsType>('Credentials', credentialsSchema);

type InitCredentials = CredentialsType;
type Credentials = HydratedDocument<CredentialsType>;

export type {
  Credentials,
  InitCredentials
};
export {
  CredentialsModel
};
