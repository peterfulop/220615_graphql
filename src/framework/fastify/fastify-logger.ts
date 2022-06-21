import type { FastifyInstance, ServerOptions } from 'fastify';
import { v4 } from 'uuid';
import type { Logger } from '../logger/logger';

export const createFastifyLoggerOptions = ({
  logger,
}: {
  logger: Logger;
}): Partial<ServerOptions> => ({
  logger: logger.child({ type: 'fastify' }),
  genReqId: () => v4(),
  disableRequestLogging: true,
});

export const addFastifyLoggerHooks = (app: FastifyInstance): void => {
  app.addHook('onResponse', async (request, reply) => {
    const responseTime = reply.getResponseTime();
    request.log.info(
      {
        req: request.req,
        res: reply.res,
        responseTime,
      },
      'request'
    );
  });
};
