import { Page } from '@/components/Page'
import { useAccessRequests } from '@/entitites/auth/auth.api'
import { useAuthStore } from '@/entitites/auth/model/auth.store'
import UserCardRequest from '@/entitites/user/ui/user-card-request/UserCardRequest'
import PageHeader from '@/shared/ui/page-header/ui/PageHeader'
import React from 'react'

const UserRequestPage = () => {
  const { role } = useAuthStore()
  const { data: accessRequests } = useAccessRequests(role)

  return (
    <Page back>
      <PageHeader title='Запросы на доступ' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {accessRequests &&
          accessRequests.map(item => (
            <UserCardRequest
              key={item.user.id}
              user={item.user}
              processedBy={item.processedBy}
            />
          ))}
      </div>
    </Page>
  )
}

export default UserRequestPage
