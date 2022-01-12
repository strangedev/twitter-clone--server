import { AccountModel } from '../../../database/schema/accountSchema';
import { removeInternals } from '../../../database/utils/removeInternals';
import express, { Express } from 'express';

const getAccount = function (): Express {
  const api = express();

  api.get('/:handle', async (req, res): Promise<unknown> => {
    const { handle } = req.params;
    const account = await AccountModel.findOne({ handle }).exec();

    if (account === null) {
      return res.status(404).end();
    }

    return res.json(removeInternals(account));
  });

  return api;
};

export {
  getAccount
};
