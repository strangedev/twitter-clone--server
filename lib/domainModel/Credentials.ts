interface Credentials {
  handle: string;
  passwordHash: string;
  passwordSalt: string;
  hashMethod: {
    hashFunction: string;
    iterations: number;
    saltMethod: 'prepend';
  };
}

export type {
  Credentials
};
