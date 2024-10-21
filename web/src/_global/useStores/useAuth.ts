import { UserStorage } from '@global/helpers/use-storage'
import { create } from 'zustand'

interface IUserStore {
  sessions: string | null
  getSessions: () => void
  signIn: (username: string) => void
  signOut: () => void
}

export const useAuthStore = create<IUserStore>((set) => ({
  sessions: null,
  getSessions: () => {
    const sessions = UserStorage.get('@sessions')
    set({ sessions })
  },
  signIn: (sessions: string) => {
    set({ sessions })
    UserStorage.set('@sessions', sessions)
  },
  signOut: () => {
    UserStorage.remove('@sessions')
    set({ sessions: null })
  },
}))
