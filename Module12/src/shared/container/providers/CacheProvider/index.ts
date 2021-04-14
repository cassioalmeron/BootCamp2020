import { container } from 'tsyringe';

import RedisCacheProvider from './implementations/RedisProvider';
import ICacheProvider from './models/ICacheProvider';

const providers = {
  redis: container.resolve(RedisCacheProvider),
};

container.registerInstance<ICacheProvider>('MailProvider', providers.redis);
