import { Page } from '@/components/Page'
import { useUsersEmployees } from '@/entitites/user/api/user.api'
import UserCard from '@/entitites/user/ui/user-card/UserCard'
import UserTable from '@/entitites/user/ui/user-table/UserTable'
import Empty from '@/shared/empty/ui/Empty'
import Spinner from '@/shared/spinner/Spinner'
import React, { useMemo, useState } from 'react'

const StaffPage = () => {
  const { data: employees, isLoading } = useUsersEmployees()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return employees
    return employees?.filter(
      item =>
        item.data?.username?.toLowerCase().includes(term) ||
        item.data?.first_name?.toLowerCase().includes(term) ||
        item.data?.last_name?.toLowerCase().includes(term)
    )
  }, [employees, searchTerm])

  if (isLoading) return <Spinner />

  return (
    <Page back>
      <div className=' space-y-3 mb-8'>
        <input
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
          placeholder='Поиск сотрудника...'
        />
      </div>

      {filteredData && filteredData.length > 0 ? <UserTable data={filteredData} /> : <Empty title='Сотрудники не найдены' />}
      {filteredData && filteredData.length > 0 ? (
        filteredData.map(item => (
          <UserCard
            key={item.id}
            data={item}
          />
        ))
      ) : (
        <Empty title='Сотрудники не найдены' />
      )}
    </Page>
  )
}

export default StaffPage
