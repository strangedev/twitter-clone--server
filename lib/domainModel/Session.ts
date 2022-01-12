interface Session {
  handle: string;
  accessToken: string;
  ttlSeconds: number;
  lastActiveAt: Date;
}

export type {
  Session
};
