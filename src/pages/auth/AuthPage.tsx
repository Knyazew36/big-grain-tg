import { requestAccess } from '@/entitites/auth/login.api'
import { useSignal, initDataState as _initDataState } from '@telegram-apps/sdk-react'
import React from 'react'

const AuthPage = () => {
  const initDataState = useSignal(_initDataState)

  console.log('initDataState', initDataState)

  const handleRequestAccess = async () => {
    if (initDataState?.user?.id) {
      const response = await requestAccess(initDataState.user.id.toString())
      console.log('response', response)
    } else {
      console.error('User ID not available')
    }
  }

  return (
    <div>
      <h1>Auth Page</h1>

      <button onClick={handleRequestAccess}>Request Access</button>
    </div>
  )
}

export default AuthPage
