import { container } from 'tsyringe';
import IStoragemProvider from './StorageProvider/models/IStoragemProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStoragemProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);
