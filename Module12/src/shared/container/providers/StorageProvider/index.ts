import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStoragemProvider from './models/IStoragemProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStoragemProvider>(
  'DiskStorageProvider',
  providers.disk,
);
