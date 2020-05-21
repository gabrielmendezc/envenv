import signup from './signup';
import {
  MutationSignupArgs,
  MutationResolvers,
  SignupResult,
  SignupWithExternalProviderResult,
  MutationSignupWithExternalProviderArgs,
  MutationLoginArgs,
  LoginResult,
  LoginWithExternalProviderResult,
  MutationResetPasswordArgs,
  ResetPasswordResult,
  DeleteAllUsersResult,
} from '../../generated';
import { ApolloContext } from '../../../typings';
import signupWithExternalProvider from './signupWithExternalProvider';
import login from './login';
import loginWithExternalProvider from './loginWithExternalProvider';
import resetPassword from './resetPassword';
import deleteAllUsers from './deleteAllUsers';

export interface MutationOperations {
  signup(
    root: any,
    args: MutationSignupArgs,
    ctx: ApolloContext
  ): Promise<SignupResult>;
  signupWithExternalProvider(
    root: any,
    args: MutationSignupWithExternalProviderArgs,
    ctx: ApolloContext
  ): Promise<SignupWithExternalProviderResult>;
  login(
    root: any,
    args: MutationLoginArgs,
    ctx: ApolloContext
  ): Promise<LoginResult>;
  loginWithExternalProvider(
    root: any,
    args: {},
    ctx: ApolloContext
  ): Promise<LoginWithExternalProviderResult>;
  resetPassword(
    root: any,
    args: MutationResetPasswordArgs,
    ctx: ApolloContext
  ): Promise<ResetPasswordResult>;
  deleteAllUsers(
    root: any,
    args: {},
    ctx: ApolloContext
  ): Promise<DeleteAllUsersResult>;
}

const MutationResolvers: {
  [T in keyof MutationResolvers]: MutationOperations[keyof MutationOperations];
} = {
  signup,
  signupWithExternalProvider,
  login,
  loginWithExternalProvider,
  resetPassword,
  deleteAllUsers,
};

export default MutationResolvers;
