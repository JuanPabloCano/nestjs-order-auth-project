// @generated by protobuf-ts 2.8.3
// @generated from protobuf file "auth.proto" (package "users", syntax proto3)
// tslint:disable
import type { RpcTransport } from '@protobuf-ts/runtime-rpc';
import type { ServiceInfo } from '@protobuf-ts/runtime-rpc';
import { UserEntityService } from './auth';
import type { UserEntityList } from './auth';
import type { Empty } from './auth';
import type { UserEntityRequest } from './auth';
import type { AccessToken } from './auth';
import { stackIntercept } from '@protobuf-ts/runtime-rpc';
import type { UserEntity } from './auth';
import type { UserCredentials } from './auth';
import type { UnaryCall } from '@protobuf-ts/runtime-rpc';
import type { RpcOptions } from '@protobuf-ts/runtime-rpc';
/**
 * @generated from protobuf service users.UserEntityService
 */
export interface IUserEntityServiceClient {
  /**
   * @generated from protobuf rpc: validateUser(users.UserCredentials) returns (users.UserEntity);
   */
  validateUser(
    input: UserCredentials,
    options?: RpcOptions,
  ): UnaryCall<UserCredentials, UserEntity>;
  /**
   * @generated from protobuf rpc: login(users.UserEntity) returns (users.AccessToken);
   */
  login(
    input: UserEntity,
    options?: RpcOptions,
  ): UnaryCall<UserEntity, AccessToken>;
  /**
   * @generated from protobuf rpc: register(users.UserEntityRequest) returns (users.UserEntity);
   */
  register(
    input: UserEntityRequest,
    options?: RpcOptions,
  ): UnaryCall<UserEntityRequest, UserEntity>;
  /**
   * @generated from protobuf rpc: findAllUsers(users.Empty) returns (users.UserEntityList);
   */
  findAllUsers(
    input: Empty,
    options?: RpcOptions,
  ): UnaryCall<Empty, UserEntityList>;
}
/**
 * @generated from protobuf service users.UserEntityService
 */
export class UserEntityServiceClient
  implements IUserEntityServiceClient, ServiceInfo
{
  typeName = UserEntityService.typeName;
  methods = UserEntityService.methods;
  options = UserEntityService.options;
  constructor(private readonly _transport: RpcTransport) {}
  /**
   * @generated from protobuf rpc: validateUser(users.UserCredentials) returns (users.UserEntity);
   */
  validateUser(
    input: UserCredentials,
    options?: RpcOptions,
  ): UnaryCall<UserCredentials, UserEntity> {
    const method = this.methods[0],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<UserCredentials, UserEntity>(
      'unary',
      this._transport,
      method,
      opt,
      input,
    );
  }
  /**
   * @generated from protobuf rpc: login(users.UserEntity) returns (users.AccessToken);
   */
  login(
    input: UserEntity,
    options?: RpcOptions,
  ): UnaryCall<UserEntity, AccessToken> {
    const method = this.methods[1],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<UserEntity, AccessToken>(
      'unary',
      this._transport,
      method,
      opt,
      input,
    );
  }
  /**
   * @generated from protobuf rpc: register(users.UserEntityRequest) returns (users.UserEntity);
   */
  register(
    input: UserEntityRequest,
    options?: RpcOptions,
  ): UnaryCall<UserEntityRequest, UserEntity> {
    const method = this.methods[2],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<UserEntityRequest, UserEntity>(
      'unary',
      this._transport,
      method,
      opt,
      input,
    );
  }
  /**
   * @generated from protobuf rpc: findAllUsers(users.Empty) returns (users.UserEntityList);
   */
  findAllUsers(
    input: Empty,
    options?: RpcOptions,
  ): UnaryCall<Empty, UserEntityList> {
    const method = this.methods[3],
      opt = this._transport.mergeOptions(options);
    return stackIntercept<Empty, UserEntityList>(
      'unary',
      this._transport,
      method,
      opt,
      input,
    );
  }
}
