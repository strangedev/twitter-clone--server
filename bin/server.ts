import { runCli } from 'command-line-interface';
import { startServer } from '../lib/cli/commands/startServer';

(async () => {
  await runCli({ rootCommand: startServer, argv: process.argv });
})();
