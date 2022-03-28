import { container } from "tsyringe";

import { IDateProvider } from "./date-provider/IDateProvider";
import { DayjsDateProvider } from "./date-provider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mail-provider/IMailProvider";
import { EtherealMailProvider } from "./mail-provider/implamentations/EtherealMailProvider";
import { SESMailProvider } from "./mail-provider/implamentations/SESMailProvider";
import { LocalStorageProvider } from "./storage-provider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./storage-provider/implementations/S3StorageProvider";
import { IStorageProvider } from "./storage-provider/IStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.mail_provider]
);

const storage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storage[process.env.disk]
);
