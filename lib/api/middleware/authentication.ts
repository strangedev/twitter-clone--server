import { AccountModel } from '../../database/schema/accountSchema';
import { RequestHandler } from 'express';
import { SessionModel } from '../../database/schema/sessionSchema';

const authentication = function (): RequestHandler {
  return async (req, res, next): Promise<unknown> => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next();
    }

    const accessToken = authorization.split(' ').at(1);

    if (!accessToken) {
      return next();
    }

    const session = await SessionModel.findOne({ accessToken }).exec();

    if (session === null) {
      return next();
    }

    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _id,
      ttlSeconds,
      lastActiveAt,
      handle
    } = session;
    const timeSinceLastActivitySeconds = (Date.now() - lastActiveAt.getTime()) / 1_000;

    if (timeSinceLastActivitySeconds > ttlSeconds) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      await SessionModel.deleteOne({ _id }).exec();

      return next();
    }

    const account = await AccountModel.findOne({ handle }).exec();

    if (account === null) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      await SessionModel.deleteOne({ _id }).exec();

      return res.status(500).send();
    }

    // eslint-disable-next-line no-param-reassign
    req.account = account;

    session.lastActiveAt = new Date(Date.now());
    await session.save();

    return next();
  };
};

export {
  authentication
};
