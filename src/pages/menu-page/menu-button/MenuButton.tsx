import clsx from 'clsx'
import { hapticFeedback } from '@telegram-apps/sdk-react'
import { Link } from 'react-router-dom'
import Blocked from '@/shared/blocked/ui/Blocked'

export type IMenuButton = {
  to: string
  title: string
  icon: React.ReactNode
  color?: string

  isBlocked?: boolean
  isDevelop?: boolean
}

const MenuButton = ({ to, title, icon, color = 'blue', isBlocked = false, isDevelop = false }: IMenuButton) => {
  return (
    <Link
      to={to}
      className={clsx(
        'p-4 group relative overflow-hidden flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700',
        (isBlocked || isDevelop) && 'opacity-70 !pointer-events-none cursor-not-allowed'
      )}
      onClick={() => hapticFeedback.impactOccurred('rigid')}
    >
      {isBlocked && <Blocked />}
      {isDevelop && (
        <Blocked
          variant='process'
          title='В разработке'
        />
      )}
      {/* {!isAdmin && <Blocked />} */}
      <div className='mb-4 flex flex-col justify-center items-center h-full'>
        <span className={`flex justify-center items-center size-12 xl:size-16 mx-auto bg-${color}-50 text-white rounded-2xl dark:bg-${color}-800/30`}>
          <div className={`shrink-0 size-5 xl:w-6 xl:h-6 text-${color}-600 dark:text-${color}-500`}>{icon}</div>
        </span>
      </div>
      <div className='text-center mt-auto'>
        <p className='truncate text-xs xl:text-sm font-medium text-gray-800 group-hover:text-pink-600 group-focus:text-pink-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400'>
          {title}
        </p>
      </div>
    </Link>
  )
}

export default MenuButton
