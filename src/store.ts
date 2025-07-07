import { create } from 'zustand';
import { getUserApi, getUserById} from './services/user-service';
import type { UsersType, UserType } from './types';
import { devtools } from 'zustand/middleware';


type UserStore = {
  users: UsersType
  user: UserType | null
  fetchUsers: () => Promise<void>
  fetchUserId: (id: string) => Promise<void>
}

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    users: [],
    user: null,
    fetchUsers: async () => {
      const users = await getUserApi()
      set({ users: users ?? [] })
    },
    fetchUserId: async (id: string) => {
      set({ user: null })
      const user = await getUserById(id)
      set({ user: user ?? null })
    }
  }))
)
