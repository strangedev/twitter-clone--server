import { Command } from 'command-line-interface';
import { router } from '../../api/router';
import { flaschenpost } from 'flaschenpost';
import { connect } from 'mongoose';
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
      defaultValue: 4000
    }
  ],

  async handle ({ options }) {
    const app = router();

    const server = app.listen(options.port, () => {
      logger.info('Started the server', {
        port: options.port
      })
    });

    process.on('SIGTERM', () => {
      server.close(() => {
        logger.info('Stopped the server');
      });
    });

    await connect('mongodb://localhost:27017/twitter-clone');
    await seedDatabase();
  }
};

export {
  startServer
};
