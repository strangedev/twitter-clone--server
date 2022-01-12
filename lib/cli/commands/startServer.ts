import { Command } from 'command-line-interface';
import { configuration } from '../../database/configuration';
import { connect } from 'mongoose';
import { flaschenpost } from 'flaschenpost';
import { router } from '../../api/router';
import { seedDatabase } from '../../database/seed/seedAll';

const logger = flaschenpost.getLogger();

interface StartServerOptions {
  port: number;
}

const startServer: Command<StartServerOptions> = {
  name: 'start',
  description: 'Starts the server.',

  optionDefinitions: [
    {
      name: 'port',
      description: 'The port to use.',
      type: 'number',
      alias: 'p',
      defaultValue: 4_000
    }
  ],

  async handle ({ options }): Promise<void> {
    const app = router();

    const server = app.listen(options.port, (): void => {
      logger.info('Started the server', {
        port: options.port
      });
    });

    process.on('SIGTERM', (): void => {
      server.close((): void => {
        logger.info('Stopped the server');
      });
    });

    await connect(configuration.uri, configuration.options);
    await seedDatabase();
  }
};

export {
  startServer
};
