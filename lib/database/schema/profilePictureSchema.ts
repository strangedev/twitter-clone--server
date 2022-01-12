import { HydratedDocument, model, Schema } from 'mongoose';
import { ProfilePicture as ProfilePictureType } from '../../domainModel/ProfilePicture';

const profilePicture = new Schema({
  data: { type: String, index: false }
});
const ProfilePictureModel = model<ProfilePictureType>('ProfilePicture', profilePicture);

type InitProfilePicture = ProfilePictureType;
type ProfilePicture = HydratedDocument<ProfilePictureType>;

export type {
  InitProfilePicture,
  ProfilePicture
};
export {
  ProfilePictureModel
};
