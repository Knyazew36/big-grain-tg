import { Role } from '@/entitites/user/model/user.type'
import { create } from 'zustand'

type Store = {
  role: Role
  setRole: (role: Role) => void
}

const useAuthStore = create<Store>()(set => ({
  role: Role.GUEST,
  setRole: (role: Role) => set({ role })
}))

export { useAuthStore }
