import React from 'react'
import { IUser, Role } from '../../model/user.type'
import { AccessRequest } from '@/entitites/auth/model/auth.type'
import { getFullName } from '@/shared/utils/getFullName'

import LoaderSection from '@/shared/loader/ui/LoaderSection'
import { useApproveAccessRequest, useDeclineAccessRequest } from '@/entitites/auth/auth.api'

const UserCardRequest = ({
  user,
  processedBy,
  adminTelegramId
}: {
  user: IUser
  processedBy: AccessRequest
  adminTelegramId: string
}) => {
  const { mutate: approveAccessRequest, isPending: isApprovePending } = useApproveAccessRequest()
  const { mutate: declineAccessRequest, isPending: isDeclinePending } = useDeclineAccessRequest()

  const handleAccept = () => {
    approveAccessRequest({ requestId: user.id, adminTelegramId })
  }

  const handleReject = () => {
    declineAccessRequest({ requestId: user.id, adminTelegramId })
  }

  return (
    <div className='p-4 flex flex-col  border border-gray-200 rounded-xl overflow-hidden  dark:border-neutral-700 relative'>
      {isApprovePending || (isDeclinePending && <LoaderSection />)}
      <div className='relative sm:flex sm:justify-between sm:gap-x-4'>
        <div>
          {/* Media */}
          <div className='flex items-center gap-x-4'>
            <div className='relative shrink-0'>
              {/* <img
                className='shrink-0 size-9.5 sm:w-11.5 sm:h-11.5 mx-auto rounded-full'
                src='https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80'
                alt='Avatar'
              />
              <span className='absolute bottom-0 end-0 block md:hidden size-3 rounded-full bg-teal-600 border-2 border-white dark:bg-teal-500 dark:border-neutral-700' />
            */}
              {user.data?.photo_url ? (
                <img
                  className='shrink-0 size-9.5 md:w-15.5 md:h-15.5 rounded-full'
                  src={user.data?.photo_url}
                  alt='Avatar'
                />
              ) : (
                <span className='flex shrink-0 justify-center items-center size-9.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300'>
                  {
                    getFullName({
                      firstName: user.data?.first_name,
                      lastName: user.data?.last_name
                    }).initials
                  }
                </span>
              )}
            </div>
            {/* Content */}
            <div className='grow flex flex-col'>
              <div className='inline-flex items-center gap-x-2'>
                <h3 className='font-medium text-gray-800 dark:text-neutral-200'>
                  {
                    getFullName({
                      firstName: user.data?.first_name,
                      lastName: user.data?.last_name
                    }).fullName
                  }
                </h3>
              </div>
              <div className='inline-flex items-center gap-x-2'>
                <p className='text-xs sm:text-sm text-gray-500 dark:text-neutral-500'>никнейм: {user.data?.username}</p>
              </div>
            </div>
            {/* End Content */}
          </div>
          {/* End Media */}
        </div>
        {/* End Col */}
        <div className='mt-2 sm:mt-0'>
          <div className='flex justify-end items-center gap-x-4'>
            <div className='whitespace-nowrap'>
              <p className='text-xs sm:text-sm text-gray-500 dark:text-neutral-500'>
                {processedBy?.createdAt?.toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <div>
            {/* Button Group */}
            <div className='mt-5 flex flex-wrap justify-end items-center gap-3'>
              <button
                onClick={handleReject}
                type='button'
                className='py-2.5 px-3.5 w-32 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300'
              >
                <svg
                  className='shrink-0 size-4 text-red-500'
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
                Отклонить
              </button>
              <button
                type='button'
                onClick={handleAccept}
                className='py-2.5 px-3.5 w-32 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300'
              >
                <svg
                  className='shrink-0 size-4 text-teal-500'
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M20 6 9 17l-5-5' />
                </svg>
                Принять
              </button>
            </div>
          </div>
        </div>
        {/* End Col */}
      </div>
    </div>
  )
}

export default UserCardRequest
