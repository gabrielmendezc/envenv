import { QueryOperations } from '.';
import { ApolloError } from 'apollo-server-express';
import { User } from '../../generated';
import { createUserSchema } from '../../../validation/createUser';
import { reach } from 'yup';

const user: QueryOperations['user'] = async (_, args, { prisma }) => {
  try {
    if (args.username) {
      await reach(createUserSchema, 'username').validate(args.username);
    }

    if (args.email) {
      await reach(createUserSchema, 'email').validate(args.email);
    }

    const user = await prisma.user.findOne({
      where: {
        ...args,
        ...(args.username && {
          username: args.username.startsWith('@')
            ? args.username
            : `@${args.username}`,
        }),
      },
    });

    if (!user) {
      return {
        __typename: 'UserNotFound',
        message: "Couldn't find an user which matches the provided filter",
      };
    }

    return {
      __typename: 'User',
      email: user.email,
      id: user.id,
      name: user.name,
      username: user.username,
      provider: user.provider,
      password: user.password,
      role: user.role,
      lastPasswordChange: user.lastPasswordChange,
      picture: user.picture,
    } as User;
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        __typename: 'InvalidDataFormat',
        message: error.message,
      };
    }

    throw new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default user;