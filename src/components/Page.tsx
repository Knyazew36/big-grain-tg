import { useNavigate } from 'react-router-dom'
import { hapticFeedback, hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react'
import { type PropsWithChildren, useEffect } from 'react'

export function Page({
  children,
  back = true
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean
}>) {
  const navigate = useNavigate()

  useEffect(() => {
    if (back) {
      showBackButton()
      return onBackButtonClick(() => {
        hapticFeedback.impactOccurred('rigid')
        navigate(-1)
      })
    }
    hideBackButton()
  }, [back])

  return <div className=' h-full p-2 pb-8 '>{children}</div>
}
