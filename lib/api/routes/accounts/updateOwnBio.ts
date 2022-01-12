import { Account } from '../../../database/schema/accountSchema';
import { Parser } from 'validate-value';
import express, { Express } from 'express';

type UpdateOwnBioRequest = Pick<Account, 'bio'>;

const updateOwnBioRequestParser = new Parser<UpdateOwnBioRequest>({
  type: 'object',
  properties: {
    bio: {
      type: 'string',
      minLength: 1,
      maxLength: 240
    }
  }
});

const updateOwnBio = function (): Express {
  const api = express();

  api.post('/updateOwnBio', async (req, res): Promise<unknown> => {
    const { account, body } = req;

    if (!account) {
      return res.status(401).end();
    }

    const parserResult = updateOwnBioRequestParser.parse(body);

    if (parserResult.hasError()) {
      return res.status(400).json(parserResult.error);
    }

    const { bio } = parserResult.value;

    account.bio = bio;
    await account.save();

    return res.status(200).end();
  });

  return api;
};

export {
  updateOwnBio
};
