import axios from 'axios'
import { UsersResponseSchema } from '../schemas/user-schema'

export async function getUserApi() {
  const url = 'https://randomuser.me/api/?results=30&seed=usuarios-demo'
  try {
    const {data: {results}} = await axios(url)
    const result = UsersResponseSchema.safeParse(results)
    if(result.success) {
      return result.data
    }
    return []
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getUserById(uuid: string) {
  const users = await getUserApi()
  const user = users?.find(u => u.login.uuid === uuid)
  return user
}