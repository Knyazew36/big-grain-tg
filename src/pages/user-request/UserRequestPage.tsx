import { Page } from '@/components/Page'
import { useAccessRequests, useApproveAccessRequest, useDeclineAccessRequest } from '@/entitites/auth/auth.api'
import { useAuthStore } from '@/entitites/auth/model/auth.store'
import UserCardRequest from '@/entitites/user/ui/user-card-request/UserCardRequest'
import PageHeader from '@/shared/ui/page-header/ui/PageHeader'
import { initDataUser } from '@telegram-apps/sdk-react'
import React from 'react'

const UserRequestPage = () => {
  const { role } = useAuthStore()
  const { data: accessRequests } = useAccessRequests(role)
  const user = initDataUser()

  return (
    <Page back>
      <PageHeader title='Запросы на доступ' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {accessRequests &&
          accessRequests.map(item => (
            <UserCardRequest
              adminTelegramId={user?.id?.toString() ?? ''}
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
