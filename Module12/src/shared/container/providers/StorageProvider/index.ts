import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStoragemProvider from './models/IStoragemProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStoragemProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
