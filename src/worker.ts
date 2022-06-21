import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createApp } from './app';
import { config } from './config';
import { EAppPaths } from './enum/app-paths.enum';

const startWorker = async (): Promise<void> => {
  const app = await createApp();
  SubscriptionServer.create(
    {
      schema: app.apollo.schema,
      execute,
      subscribe,
    },
    {
      server: app.server,
      path: EAppPaths.SUBSCRIPTION_PATH,
    }
  );

  await app.ready();

  app.server.listen(config.port || 3000, () => {
    console.log(`> Ready on ${EAppPaths.LOCALHOST}${config.port || 3000}`);
  });
};

void startWorker();
