import type { z } from 'zod';
import type { UserResponseSchema, UsersResponseSchema } from '../schemas/user-schema';

export type UserType = z.infer<typeof UserResponseSchema>
export type UsersType = z.infer<typeof UsersResponseSchema>