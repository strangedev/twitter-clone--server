import { Account } from '../../../database/schema/accountSchema';
import { CredentialsModel } from '../../../database/schema/credentialsSchema';
import crypto from 'crypto';
import { Parser } from 'validate-value';
import { removeInternals } from '../../../database/utils/removeInternals';
import { SessionModel } from '../../../database/schema/sessionSchema';
import express, { Express } from 'express';

interface StartSessionRequest {
  handle: Account['handle'];
  password: string;
}

const startSessionRequestParser = new Parser<StartSessionRequest>({
  type: 'object',
  properties: {
    handle: { type: 'string' },
    password: { type: 'string' }
  }
});

const startSession = function (): Express {
  const api = express();

  api.post('/start', async (req, res): Promise<unknown> => {
    const parserResult = startSessionRequestParser.parse(req.body);

    if (parserResult.hasError()) {
      return res.status(400).json(parserResult.error);
    }

    const { handle, password } = parserResult.value;
    const credentials = await CredentialsModel.findOne({ handle }).exec();

    if (credentials === null) {
      return res.status(404).end();
    }

    const {
      passwordHash,
      passwordSalt,
      hashMethod
    } = credentials;
    const {
      hashFunction,
      iterations,
      saltMethod
    } = hashMethod;

    const hasher = crypto.createHash(hashFunction);

    let saltedPassword = password;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (saltMethod === 'prepend') {
      saltedPassword = `${passwordSalt}${password}`;
    }

    let calculatedPasswordHash = saltedPassword;

    for (let i = 0; i < iterations; i++) {
      calculatedPasswordHash = hasher.
        update(calculatedPasswordHash).
        digest('hex');
    }

    if (calculatedPasswordHash !== passwordHash) {
      return res.status(401).send();
    }

    const accessToken = crypto.randomBytes(32).toString('hex');
    const session = new SessionModel({ handle, accessToken });

    await session.save();

    return res.status(200).json(removeInternals(session));
  });

  return api;
};

export {
  startSession
};
