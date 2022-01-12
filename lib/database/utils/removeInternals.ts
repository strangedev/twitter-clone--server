import { HydratedDocument } from 'mongoose';

const removeInternals = function<TDocument> (document: HydratedDocument<TDocument>): TDocument {
  return Object.fromEntries(
    Object.entries(document.toObject()).filter(
      ([ propertyName ]): boolean => !propertyName.startsWith('_')
    )
  ) as unknown as TDocument;
};

export {
  removeInternals
};
