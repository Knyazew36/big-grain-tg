import { useQuery } from '@tanstack/react-query'
import { IUser, Role } from '../model/user.type'
import { apiDomain } from '@/shared/api/model/constants'
import $api from '@/shared/api/model/request'

interface GetUserDto {
  role?: Role
  onlyEmployees?: boolean
}

export const useUsers = (dto: GetUserDto) => {
  return useQuery<IUser[]>({
    queryKey: ['user', dto],
    queryFn: async () => {
      const params = dto ? { ...dto } : undefined
      const res = await $api.get(`${apiDomain}/user`, { params })
      return res.data.data
    },
    retry: 3,
    retryDelay: 5000
  })
}
export const useUsersEmployees = () => {
  return useQuery<IUser[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await $api.get(`${apiDomain}/user/employees`)
      return res.data.data
    },
    retry: 3,
    retryDelay: 5000
  })
}
