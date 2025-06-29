import { z } from 'zod';

export const UserResponseSchema = z.object({
  cell: z.string(),
  email: z.string(),
  dob: z.object({
    age: z.number(),
  }),
  login: z.object({
    uuid: z.string(),
  }),
  location: z.object({
    city: z.string(),
    country: z.string(),
    street: z.object({
      name: z.string(),
      number: z.number(),
    })
  }),
  name: z.object({
    first: z.string(),
    last: z.string(),
  }),
  picture: z.object({
    large: z.string().url(),
  })
})

export const UsersResponseSchema = z.array(UserResponseSchema)