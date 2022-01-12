import { Session as SessionType } from '../../domainModel/Session';
import { HydratedDocument, model, Schema } from 'mongoose';

const sessionSchema = new Schema({
  handle: { type: String, index: true },
  accessToken: { type: String, index: true },
  ttlSeconds: { type: Number, index: false, default: 20 * 60 },
  lastActiveAt: { type: Date, index: false, default: Date.now }
});
const SessionModel = model<SessionType>('Session', sessionSchema);

type InitSession = SessionType;
type Session = HydratedDocument<SessionType>;

export type {
  Session,
  InitSession
};
export {
  SessionModel
};
