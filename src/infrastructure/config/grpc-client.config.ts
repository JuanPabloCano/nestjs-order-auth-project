import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Grpc_secrets } from './enums.config';

const protoDir = join(__dirname, Grpc_secrets.BASE_PATH, 'protos');

const packageDir = join(
  __dirname,
  Grpc_secrets.BASE_PATH,
  Grpc_secrets.PACKAGE,
);

const protoPathDir = join(
  __dirname,
  Grpc_secrets.BASE_PATH,
  Grpc_secrets.PROTO_PATH,
);

export const grpcClientConfig: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: packageDir,
    protoPath: protoPathDir,
    loader: {
      keepCase: true,
      longs: Number,
      enums: String,
      defaults: false,
      arrays: true,
      objects: true,
      includeDirs: [protoDir],
    },
  },
};
