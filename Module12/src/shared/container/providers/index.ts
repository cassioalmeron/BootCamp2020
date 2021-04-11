import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IStoragemProvider from './StorageProvider/models/IStoragemProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

container.registerSingleton<IStoragemProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
