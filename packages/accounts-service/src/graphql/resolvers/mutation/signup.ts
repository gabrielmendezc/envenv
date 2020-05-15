import { MutationResolvers, AuthResponse } from '../../generated';
import { ApolloContext } from '../../../typings';
import { ApolloError } from 'apollo-server-express';
import { createUserSchema } from '../../../validation/createUser';
import createSession from '../../../helpers/createSession';
import redisClient from '../../../helpers/redisClient';
import { hash } from 'bcryptjs';

const signup: MutationResolvers['signup'] = async (
  _,
  { data },
  { prisma, res }: ApolloContext
): Promise<AuthResponse> => {
  try {
    await createUserSchema.validate({ ...data });

    const isUsernameTaken = await prisma.user.findOne({
      where: { username: data.username },
      select: { id: true },
    });

    if (isUsernameTaken) {
      throw new ApolloError(
        'That username is taken, please choose a different one!',
        '400',
        {
          errorCode: 'username_taken',
        }
      );
    }

    const isEmailTaken = await prisma.user.findOne({
      where: { username: data.username },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new ApolloError(
        'That email is taken, please choose a different one!',
        '400',
        {
          errorCode: 'email_taken',
        }
      );
    }

    const password = await hash(data.password, 12);

    const newUser = await prisma.user.create({
      data: { ...data, password },
    });
    const newSession = await createSession(newUser.id, redisClient);

    res.cookie('SessionID', newSession.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
    });

    return {
      user: {
        email: newUser.email,
        id: newUser.id,
        name: newUser.name,
        password: newUser.password,
        provider: newUser.provider as any,
        role: newUser.role as any,
        username: newUser.username,
      },
      csrfToken: newSession.csrfToken,
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ApolloError(error.message, '400', {
        errorCode: 'validation_error',
      });
    }

    if (error instanceof ApolloError) {
      throw error;
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

export default signup;
